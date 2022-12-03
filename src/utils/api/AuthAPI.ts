import { addUserToStore } from '../../templates/pages/set';
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
  async user(): void {
    const response = await this.http.get('/auth/user')
    await addUserToStore(response)
    return response
  }

  create(data: TRegData): void {
    return this.http.post('/auth/signin', data)
  }
}

export { AuthAPI }
