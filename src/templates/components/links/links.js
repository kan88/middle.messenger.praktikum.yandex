import template from './links.tmpl';
import {
  Component,
} from '../../../utils/Components';

export default class Links extends Component {
  render() {
    return this.compile(template);
  }
}
