import template from './form.tmpl';
import Block from '../../../utils/Block';

export default class Form extends Block {
  render() {
    return this.compile(template);
  }
}
