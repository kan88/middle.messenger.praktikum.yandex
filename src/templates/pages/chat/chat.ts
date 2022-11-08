import template from './chat.tmpl';
import Block from '../../../utils/Block';

export default class Chat extends Block {
  render() {
    return this.compile(template);
  }
}
