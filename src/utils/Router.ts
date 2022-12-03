import Route from "./Route";

export default class Router {
  constructor(rootQuery) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.pathes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname, block, state) {
    if (!state) {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery });
      // console.log(rootQuery)
      this.routes.push(route);
      this.routes.push(route);
      return this;
    }
  }

  start() {
    window.onpopstate = (event => {

      console.log(11111)
      this._onRoute(event.currentTarget.location.pathname)
    }).bind(this);

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute != route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);

    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}
