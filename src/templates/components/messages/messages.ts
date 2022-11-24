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

console.log(Messages)
console.log(messagesWithStore(Messages))
console.log(typeof Messages)
console.log(typeof messagesWithStore(Messages))
export default messagesWithStore(Messages)
