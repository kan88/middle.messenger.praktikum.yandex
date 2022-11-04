import Handlebars from 'handlebars';
import template from './index.tmpl';
import title from './templates/components/title/title';
import input from './templates/components/input/input';
import link from './templates/components/link/link';
import chatItem from './templates/components/chat-item/chat-item';
import messageItem from './templates/components/message-item/message-item';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('.app');
  const compiled = Handlebars.compile(template);
  app.innerHTML = compiled({
    title,
    input,
    link,
    chatItem,
    messageItem,
  });
});
