import { addUserToStore } from '../../templates/pages/set';
import HTTPTransport from '../http';

type TRegData = {
  login: string;
  password: string;
};

class AuthAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  async user(): void {
    const response = await this.http.get('/auth/user');
    await addUserToStore(response);
    return response;
  }

  create(data: TRegData): void {
    return this.http.post('/auth/signin', data);
  }
}

export { AuthAPI };
