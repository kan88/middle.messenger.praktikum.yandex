import template from './modal.tmpl';
import Block from '../../../utils/Block';

export default class Modal extends Block {
  render() {
    return this.compile(template);
  }
}
