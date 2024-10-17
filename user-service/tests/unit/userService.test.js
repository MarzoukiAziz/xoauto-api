const User = require("../../models/User");
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const {
  getAllUsers,
  getUserByUid,
  getUserIdByCognitoId,
  getUserSavedAds,
  getUserSavedAdsCount,
  getUserStats,
  updateSavedAds,
} = require("../../services/userService");

jest.mock("../../models/User");
jest.mock("@aws-sdk/client-cognito-identity-provider");

const cognitoClientMock = new CognitoIdentityProviderClient();
jest.mocked(cognitoClientMock.send).mockResolvedValueOnce({
  UserAttributes: [
    { Name: "email_verified", Value: "true" },
    { Name: "phone_number", Value: "+123456789" },
    { Name: "phone_number_verified", Value: "true" },
  ],
});

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users with count", async () => {
      const mockUsers = [
        { name: "John Doe", email: "john@example.com", createdAt: new Date() },
      ];
      User.find.mockResolvedValue(mockUsers);

      User.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockUsers),
      });
      User.countDocuments.mockResolvedValue(mockUsers.length);

      const result = await getAllUsers("John", 10, 1, "asc");
      expect(result).toEqual({ users: mockUsers, count: 1 });
      expect(User.find).toHaveBeenCalledWith({
        $or: [
          { name: { $regex: "John", $options: "i" } },
          { email: { $regex: "John", $options: "i" } },
        ],
      });
    });
  });

  describe("getUserByUid", () => {
    it("should return user details if found", async () => {
      const mockUser = { id: "123", name: "John Doe", saved_ads: [] };
      User.findOne.mockResolvedValue({ ...mockUser, toObject: () => mockUser });

      jest.mocked(cognitoClientMock.send).mockResolvedValueOnce({
        Enabled: true,
        UserAttributes: [
          { Name: "email_verified", Value: "true" },
          { Name: "phone_number", Value: "+123456789" },
          { Name: "phone_number_verified", Value: "true" },
        ],
        Groups: [{ GroupName: "admin" }],
      });

      const result = await getUserByUid("123");
      expect(result).toEqual({
        ...mockUser,
        email_verified: true,
        phone_number: "+123456789",
        phone_number_verified: true,
        roles: ["admin"],
      });
    });

    it("should return null if user not found", async () => {
      User.findOne.mockResolvedValue(null);
      const result = await getUserByUid("non-existent-id");
      expect(result).toBeNull();
    });
  });

  describe("getUserIdByCognitoId", () => {
    it("should return user id if found", async () => {
      const mockUser = { _id: "123", id: "cognito-id" };
      User.findOne.mockResolvedValue(mockUser);

      const result = await getUserIdByCognitoId("cognito-id");
      expect(result).toEqual({ id: "123" });
    });

    it("should return redirect info if user not found", async () => {
      User.findOne.mockResolvedValue(null);
      jest.mocked(cognitoClientMock.send).mockResolvedValueOnce({
        Enabled: true,
        UserAttributes: [
          { Name: "sub", Value: "xo" },

          { Name: "email", Value: "email@xo.com" },
          { Name: "email_verified", Value: "true" },
          { Name: "phone_number", Value: "+123456789" },
          { Name: "phone_number_verified", Value: "true" },
        ],
        Groups: [{ GroupName: "admin" }],
      });

      const result = await getUserIdByCognitoId("cognito-id");
      expect(result).toEqual({
        redirectTo: "/complete-profile",
        data: {
          email: "email@xo.com",
          id: "xo",
        },
      });
    });
  });

  describe("getUserSavedAds", () => {
    it("should return saved ads if user found", async () => {
      const mockUser = { saved_ads: ["ad1", "ad2"] };
      User.findById.mockResolvedValue(mockUser);

      const result = await getUserSavedAds("123");
      expect(result).toEqual(["ad1", "ad2"]);
    });

    it("should return null if user not found", async () => {
      User.findById.mockResolvedValue(null);
      const result = await getUserSavedAds("non-existent-id");
      expect(result).toBeNull();
    });
  });

  describe("getUserSavedAdsCount", () => {
    it("should return the count of saved ads if user found", async () => {
      const mockUser = { saved_ads: ["ad1", "ad2"] };
      User.findById.mockResolvedValue(mockUser);

      const result = await getUserSavedAdsCount("123");
      expect(result).toBe(2);
    });

    it("should return null if user not found", async () => {
      User.findById.mockResolvedValue(null);
      const result = await getUserSavedAdsCount("non-existent-id");
      expect(result).toBeNull();
    });
  });

  describe("getUserStats", () => {
    it("should return user statistics", async () => {
      const mockNewUsers = 5;
      const mockActiveUsers = 10;
      User.countDocuments
        .mockImplementationOnce(() => Promise.resolve(mockNewUsers))
        .mockImplementationOnce(() => Promise.resolve(mockActiveUsers));

      const result = await getUserStats();
      expect(result).toEqual({
        newUsers: mockNewUsers,
        activeUsersLast30Days: mockActiveUsers,
      });
    });
  });

  describe("updateSavedAds", () => {
    it("should update saved ads if user found", async () => {
      const mockUser = { saved_ads: [] };
      User.findById.mockResolvedValue(mockUser);
      User.findByIdAndUpdate.mockResolvedValue({ saved_ads: ["ad1", "ad2"] });

      const result = await updateSavedAds("123", ["ad1", "ad2"]);
      expect(result).toEqual(["ad1", "ad2"]);
    });

    it("should return null if user not found", async () => {
      User.findById.mockResolvedValue(null);
      const result = await updateSavedAds("non-existent-id", []);
      expect(result).toBeNull();
    });
  });
});
