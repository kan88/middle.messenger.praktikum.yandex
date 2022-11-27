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

  async logout() {
    await this.api.logout();
  }

  async getchats() {
    await this.api.getchats()
  }


}

export default new ChatController();
