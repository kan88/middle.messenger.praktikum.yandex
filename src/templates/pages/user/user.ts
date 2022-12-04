import template from './user.tmpl';
import Block from '../../../utils/Block';

export default class User extends Block {
  render() {
    return this.compile(template);
  }
}
