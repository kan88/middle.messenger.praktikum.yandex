export default function isValid(evt: any): string {
  let value: any;
  let target: any;
  if (evt instanceof Element) {
    value = evt.value;
    target = evt;
  } else {
    value = evt.target.value;
    target = evt.target;
  }
  let message = '';
  if (target.id === 'first_name' || target.id === 'second_name') {
    if (!value.match(/^[A-ZА-Я]/g)) {
      message = 'С заглавной';
    } else if (value.length < 3) {
      message = 'от 3 символов';
    } else if (value.match(/\d+/g)) {
      message = 'без цифр';
    } else if (value.match(/\s/g)) {
      message = 'без пробела';
    } else if (!value.match(/^[a-zA-ZА-Яа-я0-9-]{0,}$/g)) {
      message = 'специальные символы не допускаются';
    }
  }
  if (target.id === 'login' || target.id === 'auth_login') {
    if (value.length === 0) {
      message = 'Не может быть пустым';
    } else if (value.length < 3) {
      message = 'от 3 символов';
    } else if (!value.match(/^[a-zA-Z0-9-_]/g)) { // пример регулярного выражения
      message = 'только латинские';
    } else if (value.length > 20) {
      message = 'не больше 20 символов';
    } else if (!value.match(/[a-zA-Zа-я]+/g)) {
      message = 'мимимум 1 символ';
    } else if (value.match(/\s/g)) {
      message = 'без пробела';
    } else if (!value.match(/^[a-zA-Z0-9-_]{3,20}$/g)) {
      message = 'специальные символы не допускаются';
    }
  }
  if (target.id === 'email') { // исключение лишних точек и лишних @ в разработке
    if (value.length < 3) {
      message = 'от 3 символов';
    } else if (value.match(/\s/g)) {
      message = 'без пробела';
    } else if (!value.match(/^[a-zA-Z0-9-_]/g)) { // пример регулярного выражения
      message = 'только латинские';
    } else if (!value.match(/^[a-zA-Z0-9-_@.]{0,}$/g)) {
      message = 'специальные символы не допускаются';
    } else if (!value.match(/[@]/g)) {
      message = 'не забудьте @';
    } else if (!value.match(/[.]/g)) {
      message = 'нет точки в почте';
    } else if (value.match(/[.]/g) && !value.match(/\w+[.]\w+/g)) {
      message = 'это не почта';
    }
  }

  if (target.id === 'password' || target.id === 'auth_pass' || target.id === 'password_new') {
    if (!value.match(/^[a-zA-Z0-9-_]/g)) { // пример регулярного выражения
      message = 'только латинские';
    } else if (value.length > 40) {
      message = 'не больше 40 символов';
    } else if (!value.match(/\d+/g)) {
      message = 'хотя бы одну цифра';
    } else if (!value.match(/[A-ZА-Я]+/g)) {
      message = 'хотя бы заглавную букву';
    } else if (value.length < 8) {
      message = 'от 8 символов';
    }
  }

  if (target.id === 'phone') {
    if (!value.match(/^[0-9+]/g)) {
      message = 'начинается с плюса или цифры';
    } else if (!value.match(/\d+/g)) {
      message = 'хотя бы одну цифра';
    } else if (value.length < 10) {
      message = 'Номер телефона должен содержать от 10 символов';
    } else if (value.match(/\s/g)) {
      message = 'Номер телефона не может содержать пробелы';
    } else if (value.match(/[A-Za-zА-Яа-я]+/g)) {
      message = 'Номер телефона не может содержать буквы';
    } else if (value.length > 15) {
      message = 'Номер телефона должен содержать до 15 символов';
    }
  }
  return message;
}
