import HTTPTransport from '../http';
type TRegData = {
  login: string;
  password: string;
};

const route = new HTTPTransport();

class UserAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }
  user(data: TRegData): void {
    return this.http.put('/user/profile')
  }
  avatar(data: TRegData): void {
    return this.http.put('/user/profile/avatar')
  }
  password(data: TRegData): void {
    return this.http.put('/user/password')
  }
}

export { UserAPI }
