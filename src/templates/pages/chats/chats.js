import Handlebars from 'handlebars';
import template from './chats.tmpl';
import chatItem from '../../components/chat-item/chat-item';
import link from '../../components/link/link';
import input from '../../components/input/input';
import messagesItem from '../../components/message-item/message-item';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('.app');
  const compiled = Handlebars.compile(template);
  app.innerHTML = compiled({
    chatItem,
    messagesItem,
    link,
    input,
  });
});
