import Set from './set';
import renderDom from '../../../utils/renderDom';
import Buttons from '../../components/buttons/buttons';
import Inputs from '../../components/inputs/inputs';
import Controller from '../../../utils/Controller';

const inputs = new Inputs('div', {
  items: [{
    title: 'Avatar',
    classInput: 'input set__input set__input--avatar',
    classLabel: 'label set__label',
    name: 'avatar',
    type: 'file',
    id: 'avatar',
  }, {
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
  },
  {
    title: 'New password',
    classInput: 'input set__input set__input--password-new',
    classLabel: 'label set__label',
    name: 'password_new',
    type: 'password',
    id: 'password_new',
  }, {
    title: 'Password',
    classInput: 'input set__input set__input--password',
    classLabel: 'label set__label',
    name: 'password',
    type: 'password',
    id: 'password',
  }],
  attr: {
    class: 'set__input-wrapper',
  },
  events: {
    focusin: (evt) => Controller.onValidate(evt),
    focusout: (evt) => Controller.onValidate(evt),
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

const set = new Set('form', {
  title: 'Settings',
  inputs,
  buttons,
  attr: {
    class: 'form set',
  },
  events: {
    submit: (evt) => Controller.onSubmit(evt),
  },
});

renderDom('.app', set);
