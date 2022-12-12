import { AuthAPI } from './AuthAPI';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async user() {
    await this.api.user();
  }

  async create(data: any) {
    await this.api.create(data);
  }
}

export default new AuthController();
