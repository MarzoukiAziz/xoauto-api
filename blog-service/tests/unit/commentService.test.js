const Comment = require("../../models/Comment");
const {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByArticleId,
} = require("../../services/commentService");
const {
  generateMockComments,
  generateMockComment,
} = require("../utils/generateMockComment");

jest.mock("../../models/Comment");

describe("Comment Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createComment should create a new comment and return comments for the article", async () => {
    const commentData = generateMockComment("3");
    delete commentData._id;

    const mockComment = { _id: "333", ...commentData };
    const mockComments = generateMockComments("3", 5);
    mockComments.push(mockComment);

    Comment.prototype.save = jest.fn().mockResolvedValue(mockComment);

    const populatedComments = mockComments.map((comment, index) => ({
      ...comment,
      uid: { name: `User ${index + 1}`, avatar: `avatar${index + 1}.png` },
    }));

    Comment.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(populatedComments),
      }),
    });

    const comments = await createComment(commentData);

    expect(comments).toEqual(populatedComments);
    expect(Comment.prototype.save).toHaveBeenCalledTimes(1);
    expect(Comment.find).toHaveBeenCalledTimes(1);
  });

  test("updateComment should update a comment by ID", async () => {
    const updatedContent = "Updated content";
    const mockComment = generateMockComment();
    mockComment.content = updatedContent;

    Comment.findByIdAndUpdate.mockResolvedValue(mockComment); // Mock implementation

    const result = await updateComment("1", updatedContent);

    expect(result).toEqual(mockComment);
    expect(Comment.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { $set: { content: updatedContent } },
      { new: true }
    );
  });

  test("deleteComment should remove a comment by ID", async () => {
    const mockComment = generateMockComment();
    Comment.findByIdAndRemove.mockResolvedValue(mockComment);

    const deletedComment = await deleteComment("1");

    expect(deletedComment).toEqual(mockComment);
    expect(Comment.findByIdAndRemove).toHaveBeenCalledWith("1");
  });

  test("getCommentsByArticleId should return comments for a specific article ID", async () => {
    const mockComments = generateMockComments("1", 5);
    const populatedComments = mockComments.map((comment, index) => ({
      ...comment,
      uid: { name: `User ${index + 1}`, avatar: `avatar${index + 1}.png` },
    }));

    Comment.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(populatedComments),
      }),
    });

    const comments = await getCommentsByArticleId("1");

    expect(comments).toEqual(populatedComments);
    expect(Comment.find).toHaveBeenCalledWith({ articleId: "1" });
  });
});
