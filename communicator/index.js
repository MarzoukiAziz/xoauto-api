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
  async getUsersStats() {
    const response = await this.userServiceClient.get("/user/stats");
    return response.data;
  }
  async getBlogStats() {
    const response = await this.blogServiceClient.get("/article/stats");
    return response.data;
  }
  async getAdStats() {
    const response = await this.adServiceClient.get("/ads/stats");
    return response.data;
  }
  async getUserAdsCount(uid) {
    const response = await this.adServiceClient.get(
      "/ads/user-ads-count/" + uid
    );
    return response.data;
  }
  async getBrands() {
    const response = await this.adServiceClient.get("/settings/brands");
    return response.data;
  }

  async getCategories() {
    const response = await this.adServiceClient.get("/settings/categories");
    return response.data;
  }
  async getEnergies() {
    const response = await this.adServiceClient.get("/settings/energies");
    return response.data;
  }
}
module.exports = new Communicator();
