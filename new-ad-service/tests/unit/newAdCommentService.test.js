const NewAdComment = require("../../models/NewAdComment");
const {
  createNewAdComment,
  updateNewAdComment,
  deleteNewAdComment,
  getNewAdCommentsByVersions,
} = require("../../services/newAdCommentService");
const {
  generateNewAdComment,
  generateNewAdComments,
} = require("../utils/generateNewAdComment");

jest.mock("../../models/NewAdComment");

describe("NewAdComment Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewAdComment", () => {
    const mockComment = generateNewAdComment();

    test("should create a new comment", async () => {
      NewAdComment.prototype.save = jest.fn().mockResolvedValue(mockComment);

      const req = { body: mockComment };
      const result = await createNewAdComment(req);

      expect(NewAdComment.prototype.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockComment);
    });
  });

  describe("getNewAdCommentsByVersions", () => {
    const mockComments = generateNewAdComments(3);

    test("should return comments for given ad IDs", async () => {
      const adIds = mockComments.map((comment) => comment._id);

      NewAdComment.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockComments),
        }),
      });

      const result = await getNewAdCommentsByVersions(adIds);

      expect(NewAdComment.find).toHaveBeenCalledWith({ adId: { $in: adIds } });
      expect(result).toEqual(mockComments);
    });

    test("should return an empty array when no comments are found", async () => {
      NewAdComment.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue([]),
        }),
      });
      const result = await getNewAdCommentsByVersions(["nonexistent_id"]);

      expect(NewAdComment.find).toHaveBeenCalledWith({
        adId: { $in: ["nonexistent_id"] },
      });
      expect(result).toEqual([]);
    });
  });

  describe("updateNewAdComment", () => {
    const mockComment = generateNewAdComment();

    test("should update a comment by ID", async () => {
      NewAdComment.findByIdAndUpdate.mockResolvedValue({
        ...mockComment,
        content: "Updated content!",
      });

      const req = {
        params: { id: mockComment.uid },
        body: { content: "Updated content!" },
      };
      const result = await updateNewAdComment(req);

      expect(result).toEqual({
        ...mockComment,
        content: "Updated content!",
      });
    });
  });

  describe("deleteNewAdComment", () => {
    const mockComment = generateNewAdComment();

    test("should delete a comment by ID", async () => {
      NewAdComment.findByIdAndRemove.mockResolvedValue(mockComment);

      const result = await deleteNewAdComment(mockComment._id);

      expect(NewAdComment.findByIdAndRemove).toHaveBeenCalledWith(
        mockComment._id
      );
      expect(result).toEqual(mockComment);
    });
  });
});
