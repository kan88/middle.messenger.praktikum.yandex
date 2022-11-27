import Inputs from '/src/templates/components/inputs/inputs';
import Links from '/src/templates/components/links/links';
import Auth from './auth';
// import renderDom from '../../../utils/renderDom';
import { validationHandler, submitHandler, goHandler } from '../../../utils/Controller';
import Router from '../../../utils/Router';
import ChatPage from '../chat/index.ts';
import RegPage from '../reg/index.ts';
import SetPage from '../set/index.ts';
import controller from '../../../utils/api/AuthController';
import Buttons from '../../components/buttons/buttons';


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

const buttons = new Buttons('div', {
  items: [{
    type: 'submit',
    class: 'btn btn__link btn__link--submit',
    title: 'Sign In',
  }],
  attr: {
    class: 'auth__btn-wrapper',
  },

});

const links = new Links('div', {
  items: [{
    url: '*/sign-up',
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
      buttons,
      links,
      attr: {
        class: 'form auth',
      },
      events: {
        submit: (evt) => {
          evt.preventDefault()
          // console.log(document.querySelector('form'))
          const data = new FormData(document.querySelector('form'))
          let object = {};
          data.forEach((value, key) => object[key] = value);
          // let json = JSON.stringify(object);
          if (submitHandler) {
            controller.create(object)
          }
        }
      },
    });
  }
}

// renderDom('.app', form);

const router = new Router('.app');

router
  .use('/', Form)
  .use('/messenger', ChatPage)
  .use('/sign-up', RegPage)
  .use('/settings', SetPage)
  .start();

export default router;
window.addEventListener('DOMContentLoaded', () => {
  router
    .use('/', Form)
    .use('/messenger', ChatPage)
    .use('/sign-up', RegPage)
    .use('/settings', SetPage)
    .start();
});
