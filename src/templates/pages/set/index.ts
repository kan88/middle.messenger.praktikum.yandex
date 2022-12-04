import Set from './set';
import { goHandler } from '../../../utils/Controller';
import Links from '../../components/links/links';
import store from '../../../utils/Store';

console.log('set')

export const addUserToStore = async (data) => {
  store.set('user', data)
}

const links = new Links('div', {
  items: [{
    url: '*/avatar',
    title: 'Avatar change',
    class: 'btn btn__link btn__link--reg',
  }, {
    url: '*/user',
    title: 'Info change',
    class: 'btn btn__link btn__link--reg',
  }, {
    url: '*/password',
    title: 'Pass change',
    class: 'btn btn__link btn__link--reg',
  }],
  attr: {
    class: 'set__btn-wrapper',
  },
  events: {
    click: goHandler,
  },
});

export default class SetPage extends Set {
  constructor() {
    super('div', {
      title: 'Settings',
      avatar: store.getState().user.avatar ? store.getState().user.avatar : 'https://trikky.ru/wp-content/blogs.dir/1/files/2021/12/30/chat-avatar-136.jpg',
      nick: store.getState().user.display_name ? store.getState().user.display_name : 'no login',
      first: store.getState().user.first_name,
      second: store.getState().user.second_name,
      id: store.getState().user.id,
      email: store.getState().user.email,
      phone: store.getState().user.phone,
      login: store.getState().user.avatar,
      links,
      attr: {
        class: 'set',
      },
    });
  }
}
// renderDom('.app', set);
