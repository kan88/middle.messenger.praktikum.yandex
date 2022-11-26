import { RegAPI } from "./RegAPI";

class RegController {
  private api: RegAPI;

  constructor() {
    this.api = new RegAPI();
  }

  // regPost(evt: any): void {
  //   const formData = new FormData(evt)
  //   const Registration = new RegAPI(formData)
  // }

  async create(data: any) {
    await this.api.create(data);
  }


}

export default new RegController();
