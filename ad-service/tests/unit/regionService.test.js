const Region = require("../../models/settings/Region");
const regionService = require("../../services/regionService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Region");

describe("Region Service", () => {
  // Test for getAllRegions
  describe("getAllRegions", () => {
    it("should return all regions", async () => {
      const mockRegions = [{ name_fr: "Region A" }, { name_fr: "Region B" }];

      // Mocking Region.find()
      Region.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockRegions),
      });

      const regions = await regionService.getAllRegions();
      expect(regions).toEqual(mockRegions);
      expect(Region.find).toHaveBeenCalled();
    });
  });

  // Test for createNewRegion
  describe("createNewRegion", () => {
    it("should create a new region", async () => {
      const regionData = { name_fr: "New Region" };
      const mockRegion = { name_fr: "New Region" };

      // Mocking Region.save()
      Region.prototype.save = jest.fn().mockResolvedValue(mockRegion);

      const region = await regionService.createNewRegion(regionData);
      expect(region).toEqual(mockRegion);
      expect(Region.prototype.save).toHaveBeenCalled();
    });
  });

  // Test for deleteRegionById
  describe("deleteRegionById", () => {
    it("should delete a region by ID", async () => {
      const regionId = "region1";
      const mockRegion = { name_fr: "Region A" };

      // Mocking Region.findByIdAndRemove()
      Region.findByIdAndRemove.mockResolvedValue(mockRegion);

      const deletedRegion = await regionService.deleteRegionById(regionId);
      expect(deletedRegion).toEqual(mockRegion);
      expect(Region.findByIdAndRemove).toHaveBeenCalledWith(regionId);
    });
  });
});
