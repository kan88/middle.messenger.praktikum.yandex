import { TypeDict } from './types';

export default class EventBus {
  _listeners: TypeDict<Array<Function>> = {};

  on(event: string, callback: Function): void {
    if (!this._listeners[event]) this._listeners[event] = [];

    this._listeners[event].push(callback);
  }

  emit(event: string, ...args: ({} | undefined)[]): void {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event].forEach((callback) => {
      callback(...args);
    });
  }

  off(event: string, callback: Function): void {
    if (!this._listeners[event]) {
      return;
    }

    this._listeners[event] = this._listeners[event].filter(((item) => item !== callback));
  }
}
