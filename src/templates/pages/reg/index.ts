import Reg from './reg';
import Buttons from '../../components/buttons/buttons';
import Inputs from '../../components/inputs/inputs';
import { validationHandler, submitHandler } from '../../../utils/Controller';
import controller from '../../../utils/api/RegController';

const inputs = new Inputs('div', {
  items: [{
    title: 'First name',
    classInput: 'input reg__input reg__input--first-name',
    classLabel: 'label reg__label',
    name: 'first_name',
    type: 'text',
    id: 'first_name',
  }, {
    title: 'Second name',
    classInput: 'input reg__input reg__input--second-name',
    classLabel: 'label reg__label',
    name: 'second_name',
    type: 'text',
    id: 'second_name',
  }, {
    title: 'Login',
    classInput: 'input reg__input reg__input--login',
    classLabel: 'label reg__label',
    name: 'login',
    type: 'text',
    id: 'login',
  }, {
    title: 'Email',
    classInput: 'input reg__input reg__input--email',
    classLabel: 'label reg__label',
    name: 'email',
    type: 'text',
    id: 'email',
  }, {
    title: 'Phone',
    classInput: 'input reg__input reg__input--phone',
    classLabel: 'label reg__label',
    name: 'phone',
    type: 'text',
    id: 'phone',
  }, {
    title: 'Password',
    classInput: 'input reg__input reg__input--password',
    classLabel: 'label reg__label',
    name: 'password',
    type: 'password',
    id: 'password',
  }],
  attr: {
    class: 'reg__input-wrapper',
  },
  events: {
    focusin: validationHandler,
    focusout: validationHandler,
  },
});

const buttons = new Buttons('div', {
  items: [{
    type: 'submit',
    class: 'btn btn--sub',
    title: 'Create profile',
  }],
  attr: {
    class: 'reg__btn-wrapper',
  },

});

export default class RegPage extends Reg {
  constructor() {
    super('form', {
      inputs,
      buttons,
      attr: {
        class: 'form reg',
      },
      events: {
        submit: (evt) => {
          evt.preventDefault()
          const data = new FormData(document.querySelector('form'))
          let object = {};
          data.forEach((value, key) => object[key] = value);
          if (submitHandler) {
            controller.create(object)
          }
        }
      },
    });
  }
}

