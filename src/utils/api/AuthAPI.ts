import HTTPTransport from '../http';
import { BaseAPI } from './BaseAPI';

type TRegData = {
  login: string;
  password: string;
};

const route = new HTTPTransport();

class AuthAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  create(data: TRegData): void {
    return this.http.post('/auth/signin', data)
  }
}

export { AuthAPI }
