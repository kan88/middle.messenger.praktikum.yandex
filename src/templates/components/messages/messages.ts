import template from './messages.tmpl';
import Block from '../../../utils/Block';

export default class Messages extends Block {
  render() {
    return this.compile(template);
  }
}
