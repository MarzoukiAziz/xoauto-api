const { getUserAdsCount } = require("../../communicator");
const User = require("../models/User");
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

// Configure the Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// Get All Users
const getAllUsers = async (req, res, next) => {
  try {
    const { keywords, size, page, sort } = req.query;

    let query = {};

    if (keywords) {
      query = {
        $or: [
          { name: { $regex: keywords, $options: "i" } },
          { email: { $regex: keywords, $options: "i" } },
        ],
      };
    }

    // Fetching the filtered users with pagination and sorting
    const users = await User.find(query)
      .sort({ createdAt: sort === "asc" ? 1 : -1 }) // Sorting by createdAt, ascending or descending
      .skip(size * (page - 1))
      .limit(size);

    // Counting the total number of users
    const count = await User.countDocuments(query);

    // Prepare the response with users and the total count
    res.status(200).json({
      users: users,
      count: count,
    });
  } catch (error) {
    next(error);
  }
};

// Get User By Id
const getUserByUid = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      const params = {
        UserPoolId: process.env.AWS_USER_POOL_ID,
        Username: user.id,
      };
      const userCognitoInfo = await cognitoClient.send(
        new AdminGetUserCommand(params)
      );
      const userAttributes = userCognitoInfo.UserAttributes.reduce(
        (acc, attribute) => {
          acc[attribute.Name] = attribute.Value;
          return acc;
        },
        {}
      );
      const userGroupsResponse = await cognitoClient.send(
        new AdminListGroupsForUserCommand(params)
      );
      const userGroups = userGroupsResponse.Groups.map(
        (group) => group.GroupName
      );

      res.status(200).json({
        ...user.toObject(),
        enable: userCognitoInfo.Enabled,
        email_verified: userAttributes.email_verified === "true",
        phone_number: userAttributes.phone_number,
        phone_number_verified: userAttributes.phone_number_verified === "true",
        roles: userGroups,
      });
    }
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      res.status(404).json({ error: "User not found" });
    } else {
      next(error);
    }
  }
};

// Get User By Cognito Id
const getUserIdByCognitoId = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const user = await User.findOne({ id: cid });

    if (!user) {
      // Redirect case
      const params = {
        UserPoolId: process.env.AWS_USER_POOL_ID,
        Username: cid,
      };
      const userCognitoInfo = await cognitoClient.send(
        new AdminGetUserCommand(params)
      );
      const userAttributes = userCognitoInfo.UserAttributes.reduce(
        (acc, attribute) => {
          acc[attribute.Name] = attribute.Value;
          return acc;
        },
        {}
      );
      res.status(302).json({
        redirectTo: "/complete-profile",
        data: {
          email: userAttributes.email,
          id: userAttributes.sub,
        },
      });
    } else {
      res.status(200).json({ id: user._id });
    }
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      res.status(302).json({ redirectTo: "/complete-profile" });
    } else {
      next(error);
    }
  }
};

// Move to user service

const getUserSavedAds = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.saved_ads);
  } catch (error) {
    next(error);
  }
};

const getUserSavedAdsCount = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.saved_ads.length);
  } catch (error) {
    next(error);
  }
};
const getStartOfLast30Days = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - 30));
};

const getUserStats = async (req, res, next) => {
  try {
    const startOfLast30Days = getStartOfLast30Days();
    // New users
    const newUsers = await User.countDocuments({
      createdAt: { $gte: startOfLast30Days },
    });

    // Active users in the last 30 days
    const activeUsersLast30Days = await User.countDocuments({
      lastLogin: { $gte: startOfLast30Days },
    });

    res.status(200).json({ newUsers, activeUsersLast30Days });
  } catch (error) {
    next(error);
  }
};

const updateSavedAds = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const savedAds = req.body;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.saved_ads = savedAds;
    const updatedUser = await User.findByIdAndUpdate(uid, user, { new: true });

    res.status(200).json(updatedUser.saved_ads);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByUid,
  getUserIdByCognitoId,
  getUserSavedAds,
  getUserSavedAdsCount,
  getUserStats,
  updateSavedAds,
};
