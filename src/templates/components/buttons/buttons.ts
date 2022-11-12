import template from './buttons.tmpl';
import Block from '../../../utils/Block';

export default class Buttons extends Block {
  render() {
    return this.compile(template);
  }
}
