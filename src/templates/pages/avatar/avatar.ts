import template from './avatar.tmpl';
import Block from '../../../utils/Block';

export default class Avatar extends Block {
  render() {
    return this.compile(template);
  }
}
