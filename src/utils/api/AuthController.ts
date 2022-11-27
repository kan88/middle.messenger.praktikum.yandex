import { AuthAPI } from "./AuthAPI";

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  // regPost(evt: any): void {
  //   const formData = new FormData(evt)
  //   const Registration = new RegAPI(formData)
  // }

  async create(data: any) {
    await this.api.create(data);
  }


}

export default new AuthController();
