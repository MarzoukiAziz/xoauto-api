const NewSettings = require("../../models/NewSettings");
const communicator = require("../../../communicator");
const newSettingsService = require("../../services/newSettingsService");

jest.mock("../../models/NewSettings");
jest.mock("../../../communicator");

describe("NewSettingsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getNewSettings", () => {
    it("should return new settings if found", async () => {
      const mockSettings = { brands: [] };
      NewSettings.findOne.mockResolvedValue(mockSettings);

      const result = await newSettingsService.getNewSettings();

      expect(result).toEqual(mockSettings);
      expect(NewSettings.findOne).toHaveBeenCalledTimes(1);
    });

    it("should return null if no settings found", async () => {
      NewSettings.findOne.mockResolvedValue(null);

      const result = await newSettingsService.getNewSettings();

      expect(result).toBeNull();
      expect(NewSettings.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("getNewSettingsWithBrands", () => {
    it("should return available brands, categories, and energies", async () => {
      const mockSettings = { brands: ["brand1", "brand2"] };
      const mockCategories = ["category1", "category2"];
      const mockEnergies = ["energy1", "energy2"];
      const mockBrands = [
        { _id: "brand1", name: "Brand 1" },
        { _id: "brand2", name: "Brand 2" },
        { _id: "brand3", name: "Brand 3" },
      ];

      NewSettings.findOne.mockResolvedValue(mockSettings);
      communicator.getCategories.mockResolvedValue(mockCategories);
      communicator.getEnergies.mockResolvedValue(mockEnergies);
      communicator.getBrands.mockResolvedValue(mockBrands);

      const result = await newSettingsService.getNewSettingsWithBrands();

      expect(result).toEqual({
        availableBrands: [
          { _id: "brand1", name: "Brand 1" },
          { _id: "brand2", name: "Brand 2" },
        ],
        categories: mockCategories,
        energies: mockEnergies,
      });
      expect(NewSettings.findOne).toHaveBeenCalledTimes(1);
      expect(communicator.getCategories).toHaveBeenCalledTimes(1);
      expect(communicator.getEnergies).toHaveBeenCalledTimes(1);
      expect(communicator.getBrands).toHaveBeenCalledTimes(1);
    });

    it("should return null if no new settings found", async () => {
      NewSettings.findOne.mockResolvedValue(null);

      const result = await newSettingsService.getNewSettingsWithBrands();

      expect(result).toBeNull();
      expect(NewSettings.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateNewSettings", () => {
    it("should return updated settings if found", async () => {
      const updateData = { brands: ["newBrand"] };
      const mockUpdatedSettings = { brands: ["newBrand"] };

      NewSettings.findOneAndUpdate.mockResolvedValue(mockUpdatedSettings);

      const result = await newSettingsService.updateNewSettings(updateData);

      expect(result).toEqual(mockUpdatedSettings);
      expect(NewSettings.findOneAndUpdate).toHaveBeenCalledWith(
        {},
        updateData,
        { new: true }
      );
    });

    it("should return null if no settings found to update", async () => {
      const updateData = { brands: ["newBrand"] };
      NewSettings.findOneAndUpdate.mockResolvedValue(null);

      const result = await newSettingsService.updateNewSettings(updateData);

      expect(result).toBeNull();
      expect(NewSettings.findOneAndUpdate).toHaveBeenCalledWith(
        {},
        updateData,
        { new: true }
      );
    });
  });
});
