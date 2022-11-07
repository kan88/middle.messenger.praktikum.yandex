import template from './index.tmpl';
import {
  Component,
} from '../../../utils/Components';

export default class Auth extends Component {
  render() {
    return this.compile(template);
  }
}
