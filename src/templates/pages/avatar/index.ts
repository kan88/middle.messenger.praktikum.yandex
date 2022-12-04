import Avatar from './avatar';
// import renderDom from '../../../utils/renderDom';
import Buttons from '../../components/buttons/buttons';
import Inputs from '../../components/inputs/inputs';
import { validationHandler, submitHandler } from '../../../utils/Controller';
import store from '../../../utils/Store';
import controller from '../../../utils/api/UserController';

const inputs = new Inputs('div', {
  items: [{
    title: 'Avatar',
    classInput: 'input set__input set__input--avatar',
    classLabel: 'label set__label',
    name: 'avatar',
    type: 'file',
    id: 'avatar',
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
export default class AvatarPage extends Avatar {
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
          // data.forEach((value, key) => object[key] = value);
          // let json = JSON.stringify(object);
          if (submitHandler) {
            console.log(data)
            controller.avatar(data)
          }
        }
      },
    });
  }
}
// renderDom('.app', set);
