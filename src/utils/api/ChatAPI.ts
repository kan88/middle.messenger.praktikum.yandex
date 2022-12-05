import HTTPTransport from '../http';

type TRegData = {
  login: string;
  password: string;
};

const route = new HTTPTransport();

class ChatAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  create(data: TRegData): void {
    return this.http.post('/chats', data)
  }

  addUser(data: TRegData): void {
    return this.http.put('/chats/users', data)
  }

  getToken(data: TRegData): void {
    return this.http.post(`/chats/token/${data}`)
  }

  removeUser(data: TRegData): void {
    return this.http.delete('/chats/users', data)
  }

  logout(): void {
    return this.http.post('/auth/logout')
  }

  getchats(): void {
    return this.http.get('/chats')
  }
}

export { ChatAPI }
