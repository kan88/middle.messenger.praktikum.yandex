import Chats from '../../components/chats/chats';
import Links from '/src/templates/components/links/links';
import Messages from '../../components/messages/messages';
import Chat from './chat';
import { goHandler } from '../../../utils/Controller';
import Buttons from '../../components/buttons/buttons';
import controller from '../../../utils/api/ChatController';
import store from '../../../utils/Store';
import Form from '../../components/form/form';
import Modal from '../../components/modal/modal';
import router from '../auth';
let socket;
let count = 0;
//записываем в стор список чатов
export const addChatsToStore = async () => {
  store.set('chats', {
    items: await controller.getchats(),
    attr: {
      class: 'chat',
    },
    events: {
      click: async (evt) => {
        if (evt.target.classList.contains('plus')) {
          document.querySelector('.modal').classList.remove('modal--nodisplay')
          document.querySelector('.modal__input--chatid').value = evt.target.parentElement.dataset.id
          document.querySelector('.modal__reset').addEventListener('click', (evt) => {
            evt.preventDefault();
            document.querySelector('.modal').classList.add('modal--nodisplay')
            document.querySelector('.modal').classList.remove('modal--display')
          })
          document.querySelector('.modal__remove').addEventListener('click', (evt) => {
            evt.preventDefault();
            const user = document.querySelector('.modal__input--userid').value
            const chat = document.querySelector('.modal__input--chatid').value
            const object = {
              "users": [user],
              "chatId": chat
            };
            // let json = JSON.stringify(object);
            controller.removeUser(object);
          })
        }
        if (evt.target.classList.contains('chat__message') || evt.target.classList.contains('chat__item') || evt.target.classList.contains('chat__date') || evt.target.classList.contains('chat__name') || evt.target.classList.contains('chat__wrapper')) {
          const messages = document.querySelectorAll('.messages__item')
          if (messages.length > 0) {
            messages.forEach((item) => item.remove());
          }
          let parent;
          if (evt.target.tagName === 'SPAN' || evt.target.tagName === 'H3') {
            parent = evt.target.parentElement.parentElement
          }
          if (evt.target.tagName === 'DIV' || evt.target.tagName === 'P') {
            parent = evt.target.parentElement
          }
          if (evt.target.tagName === 'LI') {
            parent = evt.target
          }
          const token = await controller.getToken(parent.dataset.id)
          const chatId = parent.dataset.id
          const userId = await store.getState().user.id
          const tokenId = token.token
          const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenId}`
          socket = new WebSocket(url);
          socket.addEventListener('open', async () => {
            socket.send(JSON.stringify({
              content: '0',
              type: 'get old',
            }));
          });

          socket.addEventListener('close', event => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });

          socket.addEventListener('message', async (event) => {
            const response = await event.data
            const object = JSON.parse(response)
            store.set('messages', {
              items: object,
              attr: {
                class: 'messages',
              },
            });
            count += 1
            if (count && (count % 2 !== 0)) {
              socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
              }));
            }
          });

          socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
          });
        }
      }
    }
  });
}

const chats = new Chats();
const messages = new Messages();

const settings = new Links('div', {
  items: [{
    url: '*/settings',
    title: 'Settings',
    class: 'set__link',
  }],
  attr: {
    class: 'set',
  },
  events: {
    click: goHandler,
  },
});

const logout = new Buttons('div', {
  items: [{
    type: 'button',
    class: 'set__link',
    title: 'logout',
  }],
  attr: {
    class: 'logout',
  },
  events: {
    click: (evt) => {
      evt.preventDefault();
      // console.log(document.querySelector('form'))
      // let json = JSON.stringify(object);
      controller.logout()
        .then(() => router.go('/'))

    },
  },
});

const form = new Form('form', {
  classinput: 'main__chat-input',
  title: 'title',
  placeholder: 'new chat',
  titleSubmit: 'newchat',
  classSubmit: 'set__link',
  attr: {
    class: 'main__chat-form',
    method: 'post',
  },
  events: {
    submit: (evt) => {
      evt.preventDefault();
      console.log(evt)
      const data = new FormData(document.querySelector('.main__chat-form'));
      const object = {};
      data.forEach((value, key) => object[key] = value);
      // let json = JSON.stringify(object);
      controller.create(object);
    },
  },
});

const formMessages = new Form('form', {
  classinput: 'main__message-input',
  title: 'content',
  placeholder: 'new message',
  titleSubmit: 'new message',
  classSubmit: 'set__link set__link--message',
  attr: {
    class: 'main__message-form',
    method: 'post',
  },
  events: {
    submit: async (evt) => {
      evt.preventDefault();
      // const socket = await store.getState()
      socket.send(JSON.stringify({
        content: document.querySelector('.main__message-input').value,
        type: 'message',
      }));
    },
  },
});

const modalAdd = new Modal('form', {
  attr: {
    class: 'modal',
    method: 'post'
  },
  events: {
    submit: (evt) => {
      evt.preventDefault();
      // const data = new FormData(evt.target);
      const user = document.querySelector('.modal__input--userid').value
      const chat = document.querySelector('.modal__input--chatid').value
      const object = {
        "users": [user],
        "chatId": chat
      };
      controller.addUser(object);
    }
  },
})

export default class ChatPage extends Chat {
  constructor() {
    super('div', {
      logout,
      settings,
      form,
      chats,
      messages,
      formMessages,
      attr: {
        class: 'main__chat',
      },
      modalAdd
    });
  }
}
