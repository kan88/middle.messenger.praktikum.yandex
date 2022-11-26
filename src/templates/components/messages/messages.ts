import template from './messages.tmpl';
import Block from '../../../utils/Block';
import connect from '../../../utils/connect';
import store from '../../../utils/Store';
class Messages extends Block {
  render() {
    return this.compile(template);
  }
}

const messagesWithStore = connect((state) => ({
  messages: state.messages,
}))

export default messagesWithStore(Messages)
