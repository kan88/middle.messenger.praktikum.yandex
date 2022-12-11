import HTTPTransport from '../http';

type TRegData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export default class RegAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  create(data: TRegData): void {
    return this.http.post('/auth/signup', data);
  }
}
