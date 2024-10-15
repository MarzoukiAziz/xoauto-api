const Color = require("../../models/settings/Color");
const colorService = require("../../services/colorService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Color");

describe("Color Service", () => {
  // Test for getAllColors
  describe("getAllColors", () => {
    it("should return all colors sorted by name_fr", async () => {
      const mockColors = [{ name_fr: "Blue" }, { name_fr: "Red" }];

      // Mocking Color.find().sort()
      Color.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockColors),
      });

      const colors = await colorService.getAllColors();
      expect(colors).toEqual(mockColors);
      expect(Color.find).toHaveBeenCalled();
      expect(Color.find().sort).toHaveBeenCalledWith({ name_fr: 1 });
    });
  });

  // Test for createNewColor
  describe("createNewColor", () => {
    it("should create and return a new color", async () => {
      const colorData = { name_fr: "Blue" };
      const mockColor = {
        _id: "123",
        name_fr: "Blue",
        save: jest.fn().mockResolvedValue(colorData),
      };

      // Mocking Color constructor and save()
      Color.mockImplementation(() => mockColor);

      const newColor = await colorService.createNewColor(colorData);
      expect(newColor).toEqual(colorData);
      expect(mockColor.save).toHaveBeenCalled();
    });
  });

  // Test for deleteColorById
  describe("deleteColorById", () => {
    it("should delete a color by ID", async () => {
      const mockColor = { _id: "123", name_fr: "Blue" };

      // Mocking Color.findByIdAndRemove()
      Color.findByIdAndRemove.mockResolvedValue(mockColor);

      const deletedColor = await colorService.deleteColorById("123");
      expect(deletedColor).toEqual(mockColor);
      expect(Color.findByIdAndRemove).toHaveBeenCalledWith("123");
    });

    it("should return null if color not found", async () => {
      // Mocking Color.findByIdAndRemove() to return null
      Color.findByIdAndRemove.mockResolvedValue(null);

      const deletedColor = await colorService.deleteColorById("nonExistingId");
      expect(deletedColor).toBeNull();
      expect(Color.findByIdAndRemove).toHaveBeenCalledWith("nonExistingId");
    });
  });
});
