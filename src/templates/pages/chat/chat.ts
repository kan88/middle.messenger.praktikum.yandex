import template from './chat.tmpl';
import Block from '../../../utils/Block';

class Chat extends Block {
  render() {
    return this.compile(template);
  }
}

export default Chat
