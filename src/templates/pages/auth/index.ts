import Inputs from '/src/templates/components/inputs/inputs';
import Links from '/src/templates/components/links/links';
import Auth from './auth';
import renderDom from '../../../utils/renderDom';
import { validationHandler, submitHandler } from '../../../utils/Controller';

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
  events: {
    focusin: validationHandler,
    focusout: validationHandler,
  },
});

const links = new Links('div', {
  items: [{
    url: './templates/pages/chat/chat.html',
    title: 'Sign In',
    class: 'btn btn--sign',
  }, {
    url: './templates/pages/reg/reg.html',
    title: 'Registration',
    class: 'btn btn__link btn__link--reg',
  }],
  attr: {
    class: 'auth__btn-wrapper',
  },
});

const form = new Auth('form', {
  title: 'Authorization',
  inputs,
  links,
  attr: {
    class: 'form auth',
  },
  events: {
    submit: submitHandler,
  },
});

renderDom('.app', form);
