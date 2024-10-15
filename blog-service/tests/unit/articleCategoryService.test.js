const ArticleCategory = require("../../models/ArticleCategory");
const {
  fetchAllCategories,
  fetchCategoryNames,
  addCategory,
  removeCategoryById,
} = require("../../services/articleCategoryService");
const {
  generateMockArticleCategories,
} = require("../utils/generateMockArticleCategories");

jest.mock("../../models/ArticleCategory");

describe("ArticleCategory Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Tests for fetchAllCategories
  describe("fetchAllCategories", () => {
    it("should return all categories", async () => {
      const mockCategories = generateMockArticleCategories(4);

      ArticleCategory.find.mockResolvedValue(mockCategories);

      const result = await fetchAllCategories();

      expect(result).toEqual(mockCategories);
      expect(ArticleCategory.find).toHaveBeenCalled();
    });

    it("should throw an error if there is a problem", async () => {
      const error = new Error("Database error");

      ArticleCategory.find.mockRejectedValue(error);

      await expect(fetchAllCategories()).rejects.toThrow("Database error");
    });
  });

  // Tests for fetchCategoryNames
  describe("fetchCategoryNames", () => {
    it("should return only category names", async () => {
      const mockCategories = generateMockArticleCategories(4);
      const mockCategoryNames = mockCategories.map((category) => category.name);

      ArticleCategory.find.mockResolvedValue(mockCategories);

      const result = await fetchCategoryNames();

      expect(result).toEqual(mockCategoryNames);
      expect(ArticleCategory.find).toHaveBeenCalled();
    });

    it("should throw an error if there is a problem", async () => {
      const error = new Error("Database error");

      ArticleCategory.find.mockRejectedValue(error);

      await expect(fetchCategoryNames()).rejects.toThrow("Database error");
    });
  });

  // Tests for addCategory
  describe("addCategory", () => {
    it("should create and save a new category", async () => {
      const mockCategory = { name: "Tech" };
      const savedCategory = { _id: "123", name: "Tech" };

      ArticleCategory.prototype.save = jest
        .fn()
        .mockResolvedValue(savedCategory);

      const result = await addCategory(mockCategory);

      expect(result).toEqual(savedCategory);
      expect(ArticleCategory.prototype.save).toHaveBeenCalled();
    });

    it("should throw an error if save fails", async () => {
      const error = new Error("Save failed");

      ArticleCategory.prototype.save = jest.fn().mockRejectedValue(error);

      await expect(addCategory({ name: "Tech" })).rejects.toThrow(
        "Save failed"
      );
    });
  });

  // Tests for removeCategoryById
  describe("removeCategoryById", () => {
    it("should remove a category by ID", async () => {
      const mockCategory = { _id: "123", name: "Tech" };

      ArticleCategory.findByIdAndRemove.mockResolvedValue(mockCategory);

      const result = await removeCategoryById("123");

      expect(result).toEqual(mockCategory);
      expect(ArticleCategory.findByIdAndRemove).toHaveBeenCalledWith("123");
    });

    it("should throw an error if category not found", async () => {
      ArticleCategory.findByIdAndRemove.mockResolvedValue(null);

      await expect(removeCategoryById("123")).rejects.toThrow(
        "Category not found"
      );
    });

    it("should throw an error if there is a problem", async () => {
      const error = new Error("Delete failed");

      ArticleCategory.findByIdAndRemove.mockRejectedValue(error);

      await expect(removeCategoryById("123")).rejects.toThrow("Delete failed");
    });
  });
});
