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
});
