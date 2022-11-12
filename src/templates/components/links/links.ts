import template from './links.tmpl';
import Block from '../../../utils/Block';

export default class Links extends Block {
  render() {
    return this.compile(template);
  }
}
