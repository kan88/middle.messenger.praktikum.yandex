import HTTPTransport from '../http';
import { BaseAPI } from './BaseAPI';

type TRegData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

const route = new HTTPTransport();

class RegAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  create(data: TRegData): void {
    return this.http.post('/auth/signup', data)
  }
}

export { RegAPI }
