import Chats from '../../components/chats/chats';
import Links from '/src/templates/components/links/links';
import Messages from '../../components/messages/messages';
import Chat from './chat';
import renderDom from '../../../utils/renderDom';
import { goHandler } from '../../../utils/Controller';
import Buttons from '../../components/buttons/buttons';
import controller from '../../../utils/api/ChatController';
import store from '../../../utils/Store';

console.log()

const chats = new Chats(store.getState().chat);
const messages = new Messages(store.getState().messages);

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
      controller.logout();
    },
  },
});

const getChats = new Buttons('div', {
  items: [{
    type: 'button',
    class: 'set__link',
    title: 'getchats',
  }],
  attr: {
    class: 'getchats',
  },
  events: {
    click: (evt) => {
      evt.preventDefault();
      // console.log(document.querySelector('form'))
      // let json = JSON.stringify(object);
      controller.getchats().then((response) => response.json()).then((data) => console.log(data));
    },
  },
});

const newChat = new Buttons('div', {
  items: [{
    type: 'submit',
    class: 'set__link',
    title: 'newchat',
  }],
  attr: {
    class: 'newchat',
  },
  events: {
    submit: (evt) => {
      evt.preventDefault();
      // console.log(document.querySelector('form'))
      const data = new FormData(document.querySelector('.main__chat-form'));
      const object = {};
      data.forEach((value, key) => object[key] = value);
      // let json = JSON.stringify(object);
      controller.create(object).then((response) => response.json()).then((data) => console.log(data));
    },
  },
});

export default class ChatPage extends Chat {
  constructor() {
    super('div', {
      logout,
      settings,
      newChat,
      chats,
      getChats,
      messages,
      attr: {
        class: 'main__chat',
      },
    });
  }
}
