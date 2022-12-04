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
        if (evt.target.classList.contains('chat__item')) {
          console.log(evt.target.dataset.id)
          const token = await controller.getToken(evt.target.dataset.id)
          const chatId = evt.target.dataset.id
          const userId = await store.getState().user.id
          const tokenId = token.token
          const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenId}`
          const socket = new WebSocket(url);
          console.log(chatId, userId, tokenId, url, socket)
          socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
              content: 'Моё первое сообщение миру!',
              type: 'message',
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

          socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
          });

          socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
          });
        }
      }
    }
  });
}

const chats = new Chats({});
const messages = new Messages({});

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
      attr: {
        class: 'main__chat',
      },
      modalAdd
    });
  }
}
