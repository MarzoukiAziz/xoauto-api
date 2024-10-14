const axios = require("axios");

class Communicator {
  constructor() {
    this.userServiceClient = axios.create({
      baseURL: "http://localhost:5001/api",
    });
    this.adServiceClient = axios.create({
      baseURL: "http://localhost:5002/api",
    });
    this.newAdServiceClient = axios.create({
      baseURL: "http://localhost:5003/api",
    });
    this.blogServiceClient = axios.create({
      baseURL: "http://localhost:5004/api",
    });
  }
  async getUsers() {
    const response = await this.userServiceClient.get("/users");
    return response.data;
  }
}
module.exports = new Communicator();
