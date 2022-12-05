import { ChatAPI } from "./ChatAPI";

class ChatController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  // regPost(evt: any): void {
  //   const formData = new FormData(evt)
  //   const Registration = new RegAPI(formData)
  // }

  async create(data: any) {
    await this.api.create(data);
  }

  async addUser(data: any) {
    await this.api.addUser(data);
  }

  async removeUser(data: any) {
    await this.api.removeUser(data);
  }

  async logout() {
    await this.api.logout();
  }

  async getToken(data: any) {
    const response = await this.api.getToken(data);
    return response
  }

  async getchats() {
    const response = await this.api.getchats()
    return response
  }
}

export default new ChatController();
