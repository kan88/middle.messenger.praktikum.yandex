import template from './chats.tmpl';
import Block from '../../../utils/Block';
import connect from '../../../utils/connect';
import store from '../../../utils/Store';
import Chat from '../../pages/chat/chat';
export default class Chats extends Block {

  render() {
    return this.compile(template);
  }
}

const chatsWithStore = connect((state) => ({
  chats: state.messages,
}))

export default chatsWithStore(Chats)
// export default Chats
