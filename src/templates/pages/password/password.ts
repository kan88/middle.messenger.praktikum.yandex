import template from './password.tmpl';
import Block from '../../../utils/Block';

export default class Password extends Block {
  render() {
    return this.compile(template);
  }
}
