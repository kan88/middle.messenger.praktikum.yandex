import template from './reg.tmpl';
import Block from '../../../utils/Block';

export default class Reg extends Block {
  render() {
    return this.compile(template);
  }
}
