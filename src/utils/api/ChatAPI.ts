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

  logout(): void {
    return this.http.post('/chats')
  }

  getchats(): void {
    return this.http.get('/chats')
  }

}

export { ChatAPI }
