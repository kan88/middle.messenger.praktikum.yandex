import Handlebars from 'handlebars';
import template from './reg.tmpl';
import title from '../../components/title/title';
import input from '../../components/input/input';
import button from '../../components/button/button';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('.app');
  const compiled = Handlebars.compile(template);
  app.innerHTML = compiled({
    title,
    input,
    button,
  });
});
