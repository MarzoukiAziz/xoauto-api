const NewAd = require("../../models/NewAd");
const {
  getNewAds,
  getNewAdById,
  getNewAdsByIds,
  getSimilars,
  createNewAd,
  updateNewAd,
  deleteNewAd,
  getAdsByBrand,
  groupAdsByModel,
} = require("../../services/newAdService");

const { generateNewAd, generateNewAds } = require("../utils/generateNewAd");

jest.mock("../../models/NewAd");

describe("NewAd Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getNewAds", () => {
    const mockAds = generateNewAds(10);
    const mockGroupedAds = groupAdsByModel(mockAds);

    test("should return paginated and sorted ads", async () => {
      NewAd.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockAds),
      });

      const queryParams = { size: 5, page: 1, sort: "price-asc" };

      const result = await getNewAds(queryParams);

      expect(NewAd.find).toHaveBeenCalledWith({});
      expect(NewAd.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        models: mockGroupedAds.slice(0, 5),
        count: mockGroupedAds.length,
      });
    });
    it("should handle pagination correctly", async () => {
      NewAd.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockAds),
      });

      const queryParams = { size: 5, page: 2, sort: "price-asc" };

      const result = await getNewAds(queryParams);
      expect(NewAd.find).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual({
        models: mockGroupedAds.slice(5, 10),
        count: mockGroupedAds.length,
      });
    });

    test("should handle empty results", async () => {
      NewAd.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      const result = await getNewAds({ size: 5, page: 1 });

      expect(result).toEqual({
        models: [],
        count: 0,
      });
    });
  });

  describe("getNewAdById", () => {
    const mockAd = generateNewAd();

    test("should return an ad by ID", async () => {
      NewAd.findById.mockResolvedValue(mockAd);

      const result = await getNewAdById(mockAd._id);

      expect(NewAd.findById).toHaveBeenCalledWith(mockAd._id);
      expect(result).toEqual(mockAd);
    });

    test("should return null if ad not found", async () => {
      NewAd.findById.mockResolvedValue(null);

      const result = await getNewAdById("nonexistent_id");

      expect(result).toBeNull();
    });
  });

  describe("getNewAdsByIds", () => {
    const mockAds = generateNewAds(3);

    test("should return ads by their IDs", async () => {
      const ids = mockAds.map((ad) => ad._id).join(",");
      NewAd.find.mockResolvedValue(mockAds);

      const result = await getNewAdsByIds(ids);

      expect(NewAd.find).toHaveBeenCalledWith({
        _id: { $in: expect.any(Array) },
      });
      expect(result).toEqual(mockAds);
    });
  });

  describe("getSimilars", () => {
    const mockAds = generateNewAds(8);

    test("should return similar ads", async () => {
      NewAd.find.mockResolvedValue(mockAds);

      const result = await getSimilars({
        category: "SUV",
        modele: "Model X",
        price: 50000,
      });

      expect(NewAd.find).toHaveBeenCalledWith({
        price: { $gte: 35000, $lte: 65000 },
        category: "SUV",
        modele: { $ne: "Model X" },
      });
      expect(result.length).toBeLessThanOrEqual(8);
    });
  });

  describe("createNewAd", () => {
    const mockAd = generateNewAd();

    test("should create a new ad", async () => {
      NewAd.prototype.save = jest.fn().mockResolvedValue(mockAd);

      const result = await createNewAd(mockAd);

      expect(NewAd.prototype.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockAd);
    });
  });

  describe("updateNewAd", () => {
    const mockAd = generateNewAd();

    test("should update an ad by ID", async () => {
      NewAd.findByIdAndUpdate.mockResolvedValue(mockAd);

      const result = await updateNewAd(mockAd._id, mockAd);

      expect(NewAd.findByIdAndUpdate).toHaveBeenCalledWith(mockAd._id, mockAd, {
        new: true,
      });
      expect(result).toEqual(mockAd);
    });
  });

  describe("deleteNewAd", () => {
    const mockAd = generateNewAd();

    test("should delete an ad by ID", async () => {
      NewAd.findByIdAndDelete.mockResolvedValue(mockAd);

      const result = await deleteNewAd(mockAd._id);

      expect(NewAd.findByIdAndDelete).toHaveBeenCalledWith(mockAd._id);
      expect(result).toEqual(mockAd);
    });
  });

  describe("getAdsByBrand", () => {
    it("should return grouped ads by model based on query parameters", async () => {
      const mockAd = generateNewAd();

      NewAd.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([mockAd]),
      });
      const queryParams = { brand: mockAd.brand, sort: "price-asc" };
      const result = await getAdsByBrand(queryParams);

      expect(NewAd.find).toHaveBeenCalledWith({
        brand: {
          $in: mockAd.brand,
        },
      });
      expect(NewAd.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(groupAdsByModel([mockAd]));
    });

    it("should return an empty array when no ads are found", async () => {
      NewAd.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      const queryParams = { brand: "Brand A", sort: "price-asc" };
      const result = await getAdsByBrand(queryParams);

      expect(NewAd.find).toHaveBeenCalledWith({
        brand: {
          $in: "Brand A",
        },
      });
      expect(result).toEqual([]);
    });
  });
});
