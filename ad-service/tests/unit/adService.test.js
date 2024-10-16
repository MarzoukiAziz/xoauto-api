const mongoose = require("mongoose");
const {
  getAllViewsByAd,
  createAdView,
} = require("../../services/adViewService");
const communicator = require("../../../communicator");
const Ad = require("../../models/Ad");
const AdView = require("../../models/AdView");

const {
  getAds,
  getAdById,
  getAdsByIds,
  getSimilars,
  getStats,
  getUserAdsCount,
  createAd,
  updateAd,
  deleteAd,
  updateAdStatus,
  deleteAdByUser,
} = require("../../services/adService");
const { generateMockAds, generateMockAd } = require("../utils/generateMockAd");

jest.mock("../../models/Ad");
jest.mock("../../models/AdView");
jest.mock("../../../communicator");
jest.mock("../../services/adViewService");

describe("Ad Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAds", () => {
    it("should build a query and return ads with views", async () => {
      const ads = generateMockAds(3);
      const viewCounts = [
        { _id: ads[0]._id, viewCount: 5 },
        { _id: ads[1]._id, viewCount: 23 },
      ];
      Ad.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(ads),
      });
      getAllViewsByAd.mockResolvedValue(viewCounts);
      Ad.countDocuments.mockResolvedValue(5);

      const result = await getAds({
        size: 3,
        page: 1,
        includeViews: "true",
        sort: "price-desc",
      });

      expect(result.ads[0].views).toBe(5);
      expect(result.ads[1].views).toBe(23);
      expect(result.count).toBe(5);
    });
  });

  describe("getAdById", () => {
    it("should return an ad by ID and include views", async () => {
      const ad = generateMockAd();
      const viewCount = [{ _id: ad._id, viewCount: 10 }];
      Ad.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(ad),
      });

      getAllViewsByAd.mockResolvedValue(viewCount);

      const result = await getAdById(
        ad._id,
        "true",
        "false",
        "user-agent",
        "user1"
      );

      expect(result.views).toBe(10);
      expect(createAdView).not.toHaveBeenCalled();
    });

    it("should track ad view when view is true", async () => {
      const ad = generateMockAd();
      Ad.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(ad),
      });
      await getAdById(ad._id, "false", "true", "user-agent", "user1");

      expect(createAdView).toHaveBeenCalledWith({
        adId: ad._id,
        uid: "user1",
        viewerAgent: "user-agent",
      });
    });
  });

  describe("getAdsByIds", () => {
    it("should return ads by multiple IDs", async () => {
      const ads = generateMockAds(2);
      Ad.find.mockReturnValue(ads);
      const result = await getAdsByIds([ads[0]._id, ads[1]._id].join(","));

      expect(result).toEqual(ads);
      expect(Ad.find).toHaveBeenCalledWith({
        _id: {
          $in: [
            mongoose.Types.ObjectId(ads[0]._id),
            mongoose.Types.ObjectId(ads[1]._id),
          ],
        },
      });
    });
  });

  describe("getSimilars", () => {
    it("should return similar ads by category and price", async () => {
      const ads = generateMockAds(3);

      Ad.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        filter: jest.fn().mockResolvedValue(ads),
      });

      const result = await getSimilars("SUV", "ad1", 10000);

      expect(result).toEqual(ads);
      expect(Ad.find).toHaveBeenCalledWith({
        price: { $gte: 7000, $lte: 13000 },
        category: "SUV",
        active: true,
        sold: false,
      });
    });
  });

  describe("getStats", () => {
    it("should return new ads and views in the last 30 days", async () => {
      const newAdsCount = 10;
      const adViewsCount = [{ _id: null, totalViews: 50 }];
      Ad.countDocuments.mockResolvedValue(newAdsCount);
      AdView.aggregate.mockResolvedValue(adViewsCount);

      const result = await getStats();

      expect(result.newAdsLast30Days).toBe(10);
      expect(result.adViewsLast30Days).toBe(50);
    });
  });

  describe("getUserAdsCount", () => {
    it("should return the count of ads for a user", async () => {
      Ad.countDocuments.mockResolvedValue(5);

      const result = await getUserAdsCount("user1");

      expect(result).toBe(5);
      expect(Ad.countDocuments).toHaveBeenCalledWith({ uid: { $eq: "user1" } });
    });
  });

  describe("createAd", () => {
    it("should create and save an ad", async () => {
      const adData = { title: "Ad Title" };
      const ad = { _id: "ad1", ...adData };
      Ad.mockImplementation(() => ad);
      ad.save = jest.fn().mockResolvedValue(ad);

      const result = await createAd(adData);

      expect(result).toEqual(ad);
      expect(ad.save).toHaveBeenCalled();
    });
  });

  describe("updateAd", () => {
    it("should update an ad and return the updated ad", async () => {
      const updatedAd = { _id: "ad1", title: "Updated Title" };
      Ad.findByIdAndUpdate.mockResolvedValue(updatedAd);
      Ad.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(updatedAd),
      });
      const result = await updateAd("ad1", { title: "Updated Title" });

      expect(result).toEqual(updatedAd);
      expect(Ad.findByIdAndUpdate).toHaveBeenCalledWith(
        "ad1",
        { title: "Updated Title" },
        { new: true }
      );
    });
  });

  describe("deleteAd", () => {
    it("should delete an ad by ID", async () => {
      Ad.findByIdAndDelete.mockResolvedValue(true);

      const result = await deleteAd("ad1");

      expect(result).toBe(true);
      expect(Ad.findByIdAndDelete).toHaveBeenCalledWith("ad1");
    });
  });

  describe("updateAdStatus", () => {
    it("should update the ad status if the user is the owner", async () => {
      const ad = generateMockAd();
      Ad.findById.mockReturnValue(ad);
      Ad.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(ad),
      });

      const result = await updateAdStatus(ad._id, ad.uid, true);
      expect(result.sold).toBe(true);
    });

    it("should not update the ad status if the user is not the owner", async () => {
      const ad = generateMockAd();
      Ad.findById.mockReturnValue(ad);
      Ad.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(ad),
      });
      const result = await updateAdStatus(ad._id, "another user", true);
      expect(result).toBe(null);
      expect(Ad.findByIdAndUpdate).toHaveBeenCalledTimes(0);
    });
  });

  describe("deleteAdByUser", () => {
    it("should delete an ad if the user is the owner", async () => {
      const ad = generateMockAd();
      Ad.findById.mockResolvedValue(ad);
      Ad.findByIdAndDelete.mockResolvedValue(true);

      const result = await deleteAdByUser(ad._id, ad.uid);

      expect(result).toBe(true);
      expect(Ad.findByIdAndDelete).toHaveBeenCalledWith(ad._id);
    });

    it("should not delete an ad if the user is not the owner", async () => {
      const ad = generateMockAd();
      Ad.findById.mockResolvedValue(ad);
      Ad.findByIdAndDelete.mockResolvedValue(false);

      const result = await deleteAdByUser(ad._id, "another_user");

      expect(result).toBe(null);
      expect(Ad.findByIdAndDelete).toHaveBeenCalledTimes(0);
    });
  });
});
