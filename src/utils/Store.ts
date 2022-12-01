import EventBus from './Eventbus';
import set from './set';

export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
export default class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const storeResult = set(this.state, path, value);
    this.emit(StoreEvents.Updated);
    return storeResult;
  }
}

const store = new Store();



store.set('messages', {
  items: [{
    date: '12.10.22 08:30',
    text: 'Hi there',
    class: 'messages__item--user',
  }, {
    date: '12.10.22 08:30',
    text: 'Hi',
    class: 'messages__item--opponent',
  }, {
    date: '12.10.22 08:30',
    text: 'How are you',
    class: 'messages__item--user',
  },
  ],
  attr: {
    class: 'messages',
  },
});

export default store;
// set(state, 'user.name', 'John');
// console.log(state); // { user: { name: 'John' } }
