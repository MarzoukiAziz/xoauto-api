const {
  getDashboardHighlightsData,
  getUserHighlightsData,
} = require("../../services/insightsService");
const communicator = require("../../../communicator");

jest.mock("../../../communicator");

describe("Dashboard Service", () => {
  describe("getDashboardHighlightsData", () => {
    it("should return dashboard highlights data", async () => {
      // Mock the communicator methods
      const mockUsersStats = { newUsers: 10, activeUsersLast30Days: 20 };
      const mockBlogStats = {
        newArticlesLast30Days: 5,
        articleViewsLast30Days: 100,
      };
      const mockAdStats = { newAdsLast30Days: 7, adViewsLast30Days: 50 };

      communicator.getUsersStats.mockResolvedValueOnce(mockUsersStats);
      communicator.getBlogStats.mockResolvedValueOnce(mockBlogStats);
      communicator.getAdStats.mockResolvedValueOnce(mockAdStats);

      // Call the service function
      const result = await getDashboardHighlightsData();

      // Assert the expected result
      expect(result).toEqual({
        newUsers: 10,
        activeUsersLast30Days: 20,
        newArticlesLast30Days: 5,
        articleViewsLast30Days: 100,
        newAdsLast30Days: 7,
        adViewsLast30Days: 50,
      });

      // Ensure that the communicator methods were called
      expect(communicator.getUsersStats).toHaveBeenCalled();
      expect(communicator.getBlogStats).toHaveBeenCalled();
      expect(communicator.getAdStats).toHaveBeenCalled();
    });

    it("should throw an error if communicator fails", async () => {
      // Mock the communicator to throw an error
      communicator.getUsersStats.mockRejectedValueOnce(
        new Error("Error fetching user stats")
      );

      await expect(getDashboardHighlightsData()).rejects.toThrow(
        "Error fetching user stats"
      );

      expect(communicator.getUsersStats).toHaveBeenCalled();
    });
  });

  describe("getUserHighlightsData", () => {
    it("should return user highlights data", async () => {
      const mockSavedAdsCount = 3;
      const mockUserAdsCount = 2;

      // Mock the communicator methods
      communicator.getSavedAdsCount.mockResolvedValueOnce(mockSavedAdsCount);
      communicator.getUserAdsCount.mockResolvedValueOnce(mockUserAdsCount);

      // Call the service function
      const result = await getUserHighlightsData("user123");

      // Assert the expected result
      expect(result).toEqual({
        savedCount: 3,
        adsCount: 2,
      });

      // Ensure that the communicator methods were called with correct UID
      expect(communicator.getSavedAdsCount).toHaveBeenCalledWith("user123");
      expect(communicator.getUserAdsCount).toHaveBeenCalledWith("user123");
    });

    it("should throw an error if communicator fails", async () => {
      // Mock the communicator to throw an error
      communicator.getSavedAdsCount.mockRejectedValueOnce(
        new Error("Error fetching saved ads count")
      );

      await expect(getUserHighlightsData("user123")).rejects.toThrow(
        "Error fetching saved ads count"
      );

      expect(communicator.getSavedAdsCount).toHaveBeenCalledWith("user123");
    });
  });
});
