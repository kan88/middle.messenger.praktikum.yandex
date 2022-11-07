import Inputs from './templates/components/inputs';
import Links from './templates/components/links';
import Auth from './templates/pages/auth';
import {
  render,
} from './utils/render';

const inputs = new Inputs('div', {
  items: [{
    title: 'Login',
    classInput: 'input auth__input auth__input--login',
    classLabel: 'label auth__label',
    name: 'login',
    type: 'text',
    id: 'auth_login',
  }, {
    title: 'Password',
    classInput: 'input auth__input auth__input--pass',
    classLabel: 'label auth__label',
    name: 'password',
    type: 'password',
    id: 'auth_pass',
  }],
  attr: {
    class: 'auth__input-wrapper',
  },
});

const links = new Links('div', {
  items: [{
    url: './templates/pages/chats/chats.html',
    title: 'Sign In',
    class: 'btn btn--sign',
  }, {
    url: './templates/pages/reg/reg.html',
    title: 'Registration',
    class: 'btn btn__link btn__link--reg',
  }],
  attr: {
    class: 'auth__input-wrapper',
  },
});

const form = new Auth('form', {
  title: 'Authorization',
  inputs,
  links,
  attr: {
    class: 'auth__btn-wrapper',
  },
});

render('.app', form);
