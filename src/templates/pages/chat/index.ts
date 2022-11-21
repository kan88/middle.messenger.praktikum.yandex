import Chats from '../../components/chats/chats';
import Links from '/src/templates/components/links/links';
import Messages from '../../components/messages/messages';
import Chat from './chat';
import renderDom from '../../../utils/renderDom';
import { goHandler } from '../../../utils/Controller';

const chats = new Chats('div', {
  items: [{
    class: 'chat__item--actual',
    name: 'Harry',
    date: '12.10.22 08:30',
    message: 'Hi there',
  }, {
    class: 'chat__item--actual',
    name: 'Harry',
    date: '12.10.22 08:30',
    message: 'Hi there',
  }, {
    class: 'chat__item--actual',
    name: 'Harry',
    date: '12.10.22 08:30',
    message: 'Hi there',
  }],
  attr: {
    class: 'chat',
  },
});

const messages = new Messages('div', {
  items: [{
    date: '12.10.22 08:30',
    text: 'Hi there',
    class: 'messages__item--user',
  }, {
    date: '12.10.22 08:30',
    text: 'Hi',
    class: 'messages__item--opponent',
  }, {
    date: '12.10.22 08:30',
    text: 'How are you',
    class: 'messages__item--user',
  },
  ],
  attr: {
    class: 'messages',
  },
});

const link = new Links('div', {
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
// const chat = new Chat('div', {
//   chats,
//   messages,
//   attr: {
//     class: 'main__chat',
//   },
// });

export default class ChatPage extends Chat {
  constructor() {
    super('div', {
      link,
      chats,
      messages,
      attr: {
        class: 'main__chat',
      },
    });
  }
}
