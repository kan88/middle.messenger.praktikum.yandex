import Inputs from '/src/templates/components/inputs/inputs';
import Links from '/src/templates/components/links/links';
import Auth from './auth';
// import renderDom from '../../../utils/renderDom';
import { validationHandler, submitHandler, goHandler } from '../../../utils/Controller';
import Router from '../../../utils/Router';
import ChatPage from '../chat/index.ts';
import RegPage from '../reg/index.ts';
import SetPage from '../set/index.ts';

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
    url: '*/chat',
    title: 'Sign In',
    class: 'btn btn--sign',
  }, {
    url: '*/reg',
    title: 'Registration',
    class: 'btn btn__link btn__link--reg',
  }],
  attr: {
    class: 'auth__btn-wrapper',
  },
  events: {
    click: goHandler,
  },
});

class Form extends Auth {
  constructor() {
    super('form', {
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
  }
}

// renderDom('.app', form);

const router = new Router('.app');

router
  .use('/', Form)
  .use('/chat', ChatPage)
  .use('/reg', RegPage)
  .use('/set', SetPage)
  .start();

export default router;
