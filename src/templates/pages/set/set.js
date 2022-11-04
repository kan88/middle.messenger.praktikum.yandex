import Handlebars from 'handlebars';
import template from './set.tmpl';
import title from '../../components/title/title';
import input from '../../components/input/input';
import link from '../../components/link/link';
import button from '../../components/button/button';

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('.app');
  const compiled = Handlebars.compile(template);
  app.innerHTML = compiled({
    title,
    input,
    link,
    button,
  });
});
