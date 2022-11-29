import template from './chat.tmpl';
import Block from '../../../utils/Block';
import connect from '../../../utils/connect';
import { store } from '../../../utils/Store';

class Chat extends Block {
  render() {
    return this.compile(template);
  }
}

export default Chat
