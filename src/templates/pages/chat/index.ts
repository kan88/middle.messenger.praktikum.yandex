import Chats from '../../components/chats/chats';
import Messages from '../../components/messages/messages';
import Chat from './chat';
import renderDom from '../../../utils/renderDom';

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

const chat = new Chat('div', {
  chats,
  messages,
  attr: {
    class: 'main__chat',
  },
});

// renderDom('.app', chat);

export default { chat };
