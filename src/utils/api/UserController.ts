import { UserAPI } from './UserAPI';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async user(data: any) {
    await this.api.user(data);
  }

  async avatar(data: any) {
    await this.api.avatar(data);
  }

  async password(data: any) {
    await this.api.password(data);
  }
}

export default new UserController();
