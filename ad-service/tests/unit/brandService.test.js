const Brand = require("../../models/settings/Brand");
const brandService = require("../../services/brandService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Brand");

describe("Brand Service", () => {
  // Test for getAllBrands
  describe("getAllBrands", () => {
    it("should return all brands sorted by name", async () => {
      const mockBrands = [{ name: "BrandA" }, { name: "BrandB" }];

      // Mocking Brand.find().sort()
      Brand.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockBrands),
      });

      const brands = await brandService.getAllBrands();
      expect(brands).toEqual(mockBrands);
      expect(Brand.find).toHaveBeenCalled();
      expect(Brand.find().sort).toHaveBeenCalledWith({ name: 1 });
    });
  });

  // Test for getBrandByName
  describe("getBrandByName", () => {
    it("should return a brand by its name", async () => {
      const mockBrand = { name: "BrandA" };

      // Mocking Brand.findOne()
      Brand.findOne.mockResolvedValue(mockBrand);

      const brand = await brandService.getBrandByName("BrandA");
      expect(brand).toEqual(mockBrand);
      expect(Brand.findOne).toHaveBeenCalledWith({ name: "BrandA" });
    });

    it("should return null if brand is not found", async () => {
      // Mocking Brand.findOne() to return null
      Brand.findOne.mockResolvedValue(null);

      const brand = await brandService.getBrandByName("NonExistingBrand");
      expect(brand).toBeNull();
      expect(Brand.findOne).toHaveBeenCalledWith({ name: "NonExistingBrand" });
    });
  });

  // Test for createNewBrand
  describe("createNewBrand", () => {
    it("should create and return a new brand", async () => {
      const brandData = { name: "BrandA" };
      const mockBrand = {
        _id: "123",
        name: "BrandA",
        save: jest.fn().mockResolvedValue(brandData),
      };

      // Mocking Brand constructor and save()
      Brand.mockImplementation(() => mockBrand);

      const newBrand = await brandService.createNewBrand(brandData);
      expect(newBrand).toEqual(brandData);
      expect(mockBrand.save).toHaveBeenCalled();
    });
  });

  // Test for deleteBrandById
  describe("deleteBrandById", () => {
    it("should delete a brand by ID", async () => {
      const mockBrand = { _id: "123", name: "BrandA" };

      // Mocking Brand.findByIdAndRemove()
      Brand.findByIdAndRemove.mockResolvedValue(mockBrand);

      const deletedBrand = await brandService.deleteBrandById("123");
      expect(deletedBrand).toEqual(mockBrand);
      expect(Brand.findByIdAndRemove).toHaveBeenCalledWith("123");
    });

    it("should return null if brand not found", async () => {
      // Mocking Brand.findByIdAndRemove() to return null
      Brand.findByIdAndRemove.mockResolvedValue(null);

      const deletedBrand = await brandService.deleteBrandById("nonExistingId");
      expect(deletedBrand).toBeNull();
      expect(Brand.findByIdAndRemove).toHaveBeenCalledWith("nonExistingId");
    });
  });
});
