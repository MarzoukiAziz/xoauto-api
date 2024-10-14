const axios = require("axios");

class Communicator {
  constructor() {
    this.userServiceClient = axios.create({
      baseURL: "http://localhost:5001/api/v1",
    });
    this.adServiceClient = axios.create({
      baseURL: "http://localhost:5002/api/v1",
    });
    this.newAdServiceClient = axios.create({
      baseURL: "http://localhost:5003/api/v1",
    });
    this.blogServiceClient = axios.create({
      baseURL: "http://localhost:5004/api/v1",
    });
  }
  async getSavedAds(uid) {
    const response = await this.userServiceClient.get("/user/saved/" + uid);
    return response.data;
  }
}
module.exports = new Communicator();
