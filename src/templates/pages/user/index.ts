import User from './user';
// import renderDom from '../../../utils/renderDom';
import Buttons from '../../components/buttons/buttons';
import Inputs from '../../components/inputs/inputs';
import { validationHandler, submitHandler } from '../../../utils/Controller';
import store from '../../../utils/Store';
import controller from '../../../utils/api/UserController';

const inputs = new Inputs('div', {
  items: [{
    title: 'First name',
    classInput: 'input set__input set__input--first-name',
    classLabel: 'label set__label',
    name: 'first_name',
    type: 'text',
    id: 'first_name',
  }, {
    title: 'Second name',
    classInput: 'input set__input set__input--second-name',
    classLabel: 'label set__label',
    name: 'second_name',
    type: 'text',
    id: 'second_name',
  }, {
    title: 'Nick name',
    classInput: 'input set__input set__input--nick-name',
    classLabel: 'label set__label',
    name: 'display_name',
    type: 'text',
    id: 'display_name',
  }, {
    title: 'Login',
    classInput: 'input set__input set__input--login',
    classLabel: 'label set__label',
    name: 'login',
    type: 'text',
    id: 'login',
  }, {
    title: 'Email',
    classInput: 'input set__input set__input--email',
    classLabel: 'label set__label',
    name: 'email',
    type: 'text',
    id: 'email',
  }, {
    title: 'Phone',
    classInput: 'input set__input set__input--phone',
    classLabel: 'label set__label',
    name: 'phone',
    type: 'text',
    id: 'phone',
  }],
  attr: {
    class: 'set__input-wrapper',
  },
  events: {
    focusin: validationHandler,
    focusout: validationHandler,
  },
});

const buttons = new Buttons('div', {
  items: [{
    type: 'submit',
    class: 'btn btn--save',
    title: 'Save information',
  }],
  attr: {
    class: 'set__btn-wrapper',
  },
});

// const set = new Set('form', {
//   title: 'Settings',
//   inputs,
//   buttons,
//   attr: {
//     class: 'form set',
//   },
//   events: {
//     submit: submitHandler,
//   },
// });
export default class UserPage extends User {
  constructor() {
    super('form', {
      title: 'Settings',
      inputs,
      buttons,
      attr: {
        class: 'form set',
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
            controller.user(object)
          }
        }
      },
    });
  }
}
// renderDom('.app', set);
