const adViewService = require("../../services/adViewService");
const AdView = require("../../models/AdView");
const { mockAdViewData, mockAdViews } = require("../utils/generateMockAdView");
const mongoose = require("mongoose");

jest.mock("../../models/AdView");

describe("AdView Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createAdView should save and return new ad view", async () => {
    AdView.prototype.save = jest.fn().mockResolvedValue(mockAdViewData);

    const result = await adViewService.createAdView(mockAdViewData);

    expect(result).toEqual(mockAdViewData);
    expect(AdView.prototype.save).toHaveBeenCalled();
  });

  test("getViewsByAdId should return ad views for a given ad ID", async () => {
    AdView.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockAdViews),
    });

    const result = await adViewService.getViewsByAdId(
      mongoose.Types.ObjectId()
    );

    expect(result).toEqual(mockAdViews);
    expect(AdView.find).toHaveBeenCalled();
  });

  test("getAllAdViews should return ad views filtered by query", async () => {
    AdView.find.mockResolvedValue(mockAdViews);

    const filters = { startDate: "2024-01-01", viewerAgent: "Chrome" };
    const result = await adViewService.getAllAdViews(filters);

    expect(result).toEqual(mockAdViews);
    expect(AdView.find).toHaveBeenCalledWith(expect.any(Object));
  });

  test("deleteAdView should delete and return the deleted ad view", async () => {
    AdView.findByIdAndDelete.mockResolvedValue(mockAdViewData);

    const result = await adViewService.deleteAdView(mongoose.Types.ObjectId());

    expect(result).toEqual(mockAdViewData);
    expect(AdView.findByIdAndDelete).toHaveBeenCalled();
  });

  test("getAllViewsByAd should return the correct view count for each adId", async () => {
    const adIds = ["ad1", "ad2", "ad3"];

    // Mocked return value from AdView.aggregate
    const mockAggregateResult = [
      { _id: "ad1", viewCount: 5 },
      { _id: "ad2", viewCount: 3 },
    ];

    // Mock the aggregate function
    AdView.aggregate.mockResolvedValue(mockAggregateResult);

    // Call the function
    const result = await adViewService.getAllViewsByAd(adIds);

    // Assertions
    expect(AdView.aggregate).toHaveBeenCalledWith([
      { $match: { adId: { $in: adIds } } },
      { $group: { _id: "$adId", viewCount: { $sum: 1 } } },
    ]);

    expect(result).toEqual(mockAggregateResult);
  });

  test("getAllViewsByAd should handle no matching ads gracefully", async () => {
    const adIds = ["ad4", "ad5"];

    // Mock no matching ads
    AdView.aggregate.mockResolvedValue([]);

    const result = await adViewService.getAllViewsByAd(adIds);

    // Assertions
    expect(AdView.aggregate).toHaveBeenCalledWith([
      { $match: { adId: { $in: adIds } } },
      { $group: { _id: "$adId", viewCount: { $sum: 1 } } },
    ]);

    expect(result).toEqual([]);
  });
});
