import template from './chats.tmpl';
import Block from '../../../utils/Block';
import connect from '../../../utils/connect';
import store from '../../../utils/Store';
import Chat from '../../pages/chat/chat';
class Chats extends Block {

  render() {
    return this.compile(template);
  }
}

const chatsWithStore = connect((state) => (state.chat))

export default chatsWithStore(Chats)
// export default Chats
