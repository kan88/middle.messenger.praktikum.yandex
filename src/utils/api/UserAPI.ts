import HTTPTransport from '../http';

type TRegData = {
  login: string;
  password: string;
};

class UserAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  user(data: TRegData): void {
    return this.http.put('/user/profile', data);
  }

  avatar(data: TRegData): void {
    return this.http.put('/user/profile/avatar', data);
  }

  password(data: TRegData): void {
    return this.http.put('/user/password', data);
  }
}

export { UserAPI };
