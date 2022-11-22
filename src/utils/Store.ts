import EventBus from "./Eventbus";
import set from "./set"

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

export default store


// set(state, 'user.name', 'John');
// console.log(state); // { user: { name: 'John' } }
