import template from './inputs.tmpl';
import {
  Component,
} from '../../../utils/Components';

export default class Inputs extends Component {
  render() {
    return this.compile(template);
  }
}
