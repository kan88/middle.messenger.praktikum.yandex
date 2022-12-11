import Password from './password';
import Buttons from '../../components/buttons/buttons';
import Inputs from '../../components/inputs/inputs';
import { validationHandler, submitHandler } from '../../../utils/Controller';
import controller from '../../../utils/api/UserController';


const inputs = new Inputs('div', {
  items: [{
    title: 'Old password',
    classInput: 'input set__input set__input--password',
    classLabel: 'label set__label',
    name: 'oldPassword',
    type: 'password',
    id: 'password',
  }, {
    title: 'New password',
    classInput: 'input set__input set__input--password-new',
    classLabel: 'label set__label',
    name: 'newPassword',
    type: 'password',
    id: 'password_new',
  }, {
    title: 'Repeat New password',
    classInput: 'input set__input set__input--password-new',
    classLabel: 'label set__label',
    name: 'newPassword',
    type: 'password',
    id: 'password_new--repeat',
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
export default class PasswordPage extends Password {
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
          const formData = new FormData(document.querySelector('form'))
          // const passwords = Object.fromEntries(formData.entries());
          let object = {};
          formData.forEach((value, key) => object[key] = value);
          // let json = JSON.stringify(passwords);
          if (submitHandler) {
            console.log(object)
            controller.password(object)
          }
        }
      },
    });
  }
}
// renderDom('.app', set);
