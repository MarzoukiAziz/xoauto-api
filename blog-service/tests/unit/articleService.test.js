const Article = require("../../models/Article");
const Comment = require("../../models/Comment");
const {
  fetchAllArticles,
  fetchStats,
  fetchArticleById,
  addArticle,
  editArticle,
  removeArticle,
  getStartOfLast30Days,
} = require("../../services/articleService");

const {
  generateMockArticle,
  generateMockArticles,
} = require("../utils//generateMockArticle");

jest.mock("../../models/Article");
jest.mock("../../models/Comment");

describe("Article Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchAllArticles", () => {
    const mockArticles = generateMockArticles(8);
    const mockArticlesWithCommentss = mockArticles.map((article) => {
      return { ...article, commentCount: 5 };
    });

    const mockCommentsCount = 5;
    const mockCountDocuments = 10;

    test("should return articles with comments and count when category and keywords are provided", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockArticles),
      });

      Article.countDocuments.mockResolvedValue(mockCountDocuments);
      Comment.countDocuments.mockResolvedValue(mockCommentsCount);

      const category = "Tech";
      const keywords = "Latest";
      const size = 8;
      const page = 1;
      const sort = "asc";

      const result = await fetchAllArticles(
        category,
        keywords,
        size,
        page,
        sort
      );

      expect(Article.find).toHaveBeenCalledWith({
        category,
        $or: [
          { title: { $regex: keywords, $options: "i" } },
          { content: { $regex: keywords, $options: "i" } },
        ],
      });

      expect(Article.countDocuments).toHaveBeenCalledWith({
        category,
        $or: [
          { title: { $regex: keywords, $options: "i" } },
          { content: { $regex: keywords, $options: "i" } },
        ],
      });

      expect(Comment.countDocuments).toHaveBeenCalledTimes(mockArticles.length);
      expect(result).toEqual({
        articles: mockArticlesWithCommentss,
        count: mockCountDocuments,
      });
    });

    test("should return articles with comments and count when only category is provided", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockArticles),
      });

      Article.countDocuments.mockResolvedValue(mockCountDocuments);
      Comment.countDocuments.mockResolvedValue(mockCommentsCount);

      const category = "Science";
      const size = 8;
      const page = 1;
      const sort = "desc";

      const result = await fetchAllArticles(category, null, size, page, sort);

      expect(Article.find).toHaveBeenCalledWith({ category });
      expect(Article.countDocuments).toHaveBeenCalledWith({ category });
      expect(Comment.countDocuments).toHaveBeenCalledTimes(mockArticles.length);

      expect(result).toEqual({
        articles: mockArticlesWithCommentss,
        count: mockCountDocuments,
      });
    });

    test("should return articles with comments and count when only keywords are provided", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockArticles),
      });

      Article.countDocuments.mockResolvedValue(mockCountDocuments);
      Comment.countDocuments.mockResolvedValue(mockCommentsCount);

      const keywords = "Breaking";
      const size = 8;
      const page = 1;
      const sort = "asc";

      const result = await fetchAllArticles(null, keywords, size, page, sort);

      expect(Article.find).toHaveBeenCalledWith({
        $or: [
          { title: { $regex: keywords, $options: "i" } },
          { content: { $regex: keywords, $options: "i" } },
        ],
      });

      expect(Article.countDocuments).toHaveBeenCalledWith({
        $or: [
          { title: { $regex: keywords, $options: "i" } },
          { content: { $regex: keywords, $options: "i" } },
        ],
      });

      expect(Comment.countDocuments).toHaveBeenCalledTimes(mockArticles.length);

      expect(result).toEqual({
        articles: mockArticlesWithCommentss,
        count: mockCountDocuments,
      });
    });

    test("should handle no articles being found", async () => {
      Article.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });

      Article.countDocuments.mockResolvedValue(0);

      const result = await fetchAllArticles("Tech", "News", 2, 1, "asc");

      expect(result).toEqual({
        articles: [],
        count: 0,
      });
    });
  });

  describe("addArticle", () => {
    it("should add a new article", async () => {
      const mockArticleData = generateMockArticle();
      delete mockArticleData._id;

      const mockArticle = { _id: "1", ...mockArticleData };

      Article.prototype.save = jest.fn().mockResolvedValue(mockArticle);

      const result = await addArticle(mockArticleData);

      expect(result).toEqual(mockArticle);
      expect(Article.prototype.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("editArticle", () => {
    it("should update an existing article", async () => {
      const mockArticleData = generateMockArticle();
      const mockArticle = { _id: "1", ...mockArticleData };
      Article.findByIdAndUpdate.mockResolvedValue(mockArticle);

      const result = await editArticle("1", mockArticleData);

      expect(result).toEqual(mockArticle);
      expect(Article.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        mockArticleData,
        { new: true }
      );
    });
  });

  describe("removeArticle", () => {
    it("should remove an article by ID", async () => {
      const mockArticle = generateMockArticle();
      Article.findByIdAndDelete.mockResolvedValue(mockArticle);

      const result = await removeArticle(mockArticle._id);

      expect(result).toEqual(mockArticle);
      expect(Article.findByIdAndDelete).toHaveBeenCalledWith(mockArticle._id);
    });
  });

  describe("fetchStats", () => {
    const mockDate = new Date();
    const mockArticlesViews = [{ _id: null, totalViews: 50 }];

    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    });

    test("should return stats with article count and views in the last 30 days", async () => {
      const mockNewArticlesLast30Days = 10;

      Article.countDocuments.mockResolvedValue(mockNewArticlesLast30Days);
      Article.aggregate.mockResolvedValue(mockArticlesViews);

      const result = await fetchStats();

      expect(result).toEqual({
        newArticlesLast30Days: mockNewArticlesLast30Days,
        articleViewsLast30Days: 50,
      });

      expect(Article.countDocuments).toHaveBeenCalledWith({
        createdAt: { $gte: getStartOfLast30Days() },
      });

      expect(Article.aggregate).toHaveBeenCalledWith([
        { $match: { createdAt: { $gte: getStartOfLast30Days() } } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
      ]);
    });

    test("should return 0 views if no articles match in the last 30 days", async () => {
      const mockNewArticlesLast30Days = 5;

      Article.countDocuments.mockResolvedValue(mockNewArticlesLast30Days); // Mock countDocuments to return 5 articles
      Article.aggregate.mockResolvedValue([]); // Mock aggregate to return an empty array (no views)

      const result = await fetchStats();

      expect(result).toEqual({
        newArticlesLast30Days: mockNewArticlesLast30Days,
        articleViewsLast30Days: 0,
      });

      expect(Article.countDocuments).toHaveBeenCalledWith({
        createdAt: { $gte: getStartOfLast30Days() },
      });

      expect(Article.aggregate).toHaveBeenCalledWith([
        { $match: { createdAt: { $gte: getStartOfLast30Days() } } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } },
      ]);
    });
  });

  describe("fetchArticleById", () => {
    const mockArticle = { ...generateMockArticle(), save: jest.fn() };

    test("should return an article without incrementing views when view is false", async () => {
      Article.findById.mockResolvedValue(mockArticle);

      const result = await fetchArticleById(mockArticle._id, "false");
      expect(result).toEqual(mockArticle);
      expect(mockArticle.views).toBe(10);
      expect(mockArticle.save).not.toHaveBeenCalled();
    });
    test("should return an article and increment views when view is true", async () => {
      Article.findById.mockResolvedValue(mockArticle);

      const result = await fetchArticleById(mockArticle._id, "true");

      expect(result).toEqual(mockArticle);
      expect(mockArticle.views).toBe(11);
      expect(mockArticle.save).toHaveBeenCalled();
    });

    test("should return null if the article is not found", async () => {
      Article.findById.mockResolvedValue(null);

      const result = await fetchArticleById("nonexistent_id", "true");

      expect(result).toBeNull();
      expect(mockArticle.save).not.toHaveBeenCalled();
    });
  });
});
