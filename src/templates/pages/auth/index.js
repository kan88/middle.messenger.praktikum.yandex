import template from './index.tmpl';
import Block from '../../../utils/Block';

export default class Auth extends Block {
  render() {
    return this.compile(template);
  }
}
