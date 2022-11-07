import Handlebars from 'handlebars';
import {
  v4 as makeUUID,
} from 'uuid';
import EventBus from './EventBus';

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;
  _props;
  _children;
  _id;
  _eventBus;
  _setUpdate = false;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsAndChilds = {}) {
    const eventBus = new EventBus();
    const {
      children,
      props
    } = this.getChildren(propsAndChilds);
    this._meta = {
      tagName,
      props,
    };
    this._children = children;
    this._children = this._makePropsProxy(children);
    this.props = this._makePropsProxy({
      ...props,
      __id: this._id
    });

    this.eventBus = () => eventBus;
    this._id = makeUUID();
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const {
      tagName,
    } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  createDocumentElement(tag) {
    const element = document.createElement(tag);
    if (this._props.settings ? .withInternalID) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  getelement() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addEvents();
    this.addAttribute();
  }

  removeEvents() {
    const {
      events = {}
    } = this._props;

    Object.leys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName])
    })
  }

  addEvents() {
    const {
      events = {}
    } = this._props;

    Object.leys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName])
    })
  }

  addAttribute() {
    const {
      attr = {}
    } = this._props;
    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  getChildren(propsAndChilds) {
    const children = {};
    const props = {};
    Object.keys(propsAndChilds).forEach(key => {
      if (propsAndChilds[key] instanceof Component) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    })
  }

  compile(template, props) {
    if (typeof (props) == 'undefined')
      props = this._props;
    const propsAndStubs = {
      ...props
    };
    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this.createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replace(child.getContent());
      }
    })
    return fragment.content;
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {
          ...target,
        }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
