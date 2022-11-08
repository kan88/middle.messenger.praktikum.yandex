import template from './inputs.tmpl';
import Block from '../../../utils/Block';

export default class Inputs extends Block {
  render() {
    return this.compile(template);
  }
}
