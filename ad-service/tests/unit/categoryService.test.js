const Category = require("../../models/settings/Category");
const categoryService = require("../../services/categoryService");

// Mock Mongoose model methods
jest.mock("../../models/settings/Category");

describe("Category Service", () => {
  // Test for getAllCategories
  describe("getAllCategories", () => {
    it("should return all categories sorted by name_fr", async () => {
      const mockCategories = [{ name_fr: "CatA" }, { name_fr: "CatB" }];

      // Mocking Category.find().sort()
      Category.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockCategories),
      });

      const categories = await categoryService.getAllCategories();
      expect(categories).toEqual(mockCategories);
      expect(Category.find).toHaveBeenCalled();
      expect(Category.find().sort).toHaveBeenCalledWith({ name_fr: 1 });
    });
  });

  // Test for createNewCategory
  describe("createNewCategory", () => {
    it("should create and return a new category", async () => {
      const categoryData = { name_fr: "CatA" };
      const mockCategory = {
        _id: "123",
        name_fr: "CatA",
        save: jest.fn().mockResolvedValue(categoryData),
      };

      // Mocking Category constructor and save()
      Category.mockImplementation(() => mockCategory);

      const newCategory = await categoryService.createNewCategory(categoryData);
      expect(newCategory).toEqual(categoryData);
      expect(mockCategory.save).toHaveBeenCalled();
    });
  });

  // Test for deleteCategoryById
  describe("deleteCategoryById", () => {
    it("should delete a category by ID", async () => {
      const mockCategory = { _id: "123", name_fr: "CatA" };

      // Mocking Category.findByIdAndRemove()
      Category.findByIdAndRemove.mockResolvedValue(mockCategory);

      const deletedCategory = await categoryService.deleteCategoryById("123");
      expect(deletedCategory).toEqual(mockCategory);
      expect(Category.findByIdAndRemove).toHaveBeenCalledWith("123");
    });

    it("should return null if category not found", async () => {
      // Mocking Category.findByIdAndRemove() to return null
      Category.findByIdAndRemove.mockResolvedValue(null);

      const deletedCategory = await categoryService.deleteCategoryById(
        "nonExistingId"
      );
      expect(deletedCategory).toBeNull();
      expect(Category.findByIdAndRemove).toHaveBeenCalledWith("nonExistingId");
    });
  });
});
