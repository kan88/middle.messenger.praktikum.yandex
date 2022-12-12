import Inputs from '/src/templates/components/inputs/inputs';
import Links from '/src/templates/components/links/links';
import Auth from './auth';
// import renderDom from '../../../utils/renderDom';
import { validationHandler, submitHandler, goHandler } from '../../../utils/Controller';
import Router from '../../../utils/Router';
import store from '../../../utils/Store';
import ChatPage from '../chat/index.ts';
import RegPage from '../reg/index.ts';
import SetPage from '../set/index.ts';
import controller from '../../../utils/api/AuthController';
import Buttons from '../../components/buttons/buttons';
import { addChatsToStore } from '../chat';
import { addUserToStore } from '../set';
import AvatarPage from '../avatar';
import UserPage from '../user';
import PasswordPage from '../password';
import "../../../sass/style.scss";


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
        submit: async (evt) => {
          evt.preventDefault()
          console.log(evt)
          const data = new FormData(document.querySelector('form'))
          let object = {};
          data.forEach((value, key) => object[key] = value);
          if (submitHandler) {
            controller.create(object)
              .then(() => window.location.reload())

          }
        }
      },
    });
  }
}

const router = new Router('.app');

document.addEventListener("DOMContentLoaded", async () => {

  router
    .use('/', Form)
    .use('/messenger', ChatPage)
    .use('/sign-up', RegPage)
    .use('/settings', SetPage)
    .use('/avatar', AvatarPage)
    .use('/user', UserPage)
    .use('/password', PasswordPage)
    .start();


  const isLogined = async () => {
    const user = await controller.user();
    return user;
  };

  console.log(await isLogined())
  if ((await isLogined) == undefined) {
    router.go('/');
  } else {
    await addChatsToStore()
    await router.go('/messenger')

    console.log(store)
  }
});

export default router;
