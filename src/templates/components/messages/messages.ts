import template from './messages.tmpl';
import Block from '../../../utils/Block';
import connect from '../../../utils/connect';
import { store } from '../../../utils/Store';
class Messages extends Block {
  render() {
    return this.compile(template);
  }
}

function mapUserToProps() {
  return null
}
const MessagesWithStore = connect(mapUserToProps)
//store.getState()


// export default MessagesWithStore(Messages)
export default Messages
