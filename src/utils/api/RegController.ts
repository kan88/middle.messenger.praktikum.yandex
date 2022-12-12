import { RegAPI } from './RegAPI';

class RegController {
  private api: RegAPI;

  constructor() {
    this.api = new RegAPI();
  }

  async create(data: any) {
    await this.api.create(data);
  }
}

export default new RegController();
