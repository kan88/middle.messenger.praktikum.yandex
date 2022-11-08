import template from './chats.tmpl';
import Block from '../../../utils/Block';

export default class Chats extends Block {
  render() {
    return this.compile(template);
  }
}
