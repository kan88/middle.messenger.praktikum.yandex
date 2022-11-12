import template from './set.tmpl';
import Block from '../../../utils/Block';

export default class Reg extends Block {
  render() {
    return this.compile(template);
  }
}
