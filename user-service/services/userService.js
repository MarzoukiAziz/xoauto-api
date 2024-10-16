const User = require("../models/User");
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// Helper functions
const getCognitoUserInfo = async (username) => {
  const params = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    Username: username,
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

  return { userCognitoInfo, userAttributes };
};

const getUserGroups = async (username) => {
  const params = {
    UserPoolId: process.env.AWS_USER_POOL_ID,
    Username: username,
  };

  const userGroupsResponse = await cognitoClient.send(
    new AdminListGroupsForUserCommand(params)
  );
  return userGroupsResponse.Groups.map((group) => group.GroupName);
};

// Service functions
const getAllUsers = async (keywords, size, page, sort) => {
  let query = {};
  if (keywords) {
    query = {
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { email: { $regex: keywords, $options: "i" } },
      ],
    };
  }

  const users = await User.find(query)
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip(size * (page - 1))
    .limit(size);

  const count = await User.countDocuments(query);
  return { users, count };
};

const getUserByUid = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) return null;

  const { userCognitoInfo, userAttributes } = await getCognitoUserInfo(user.id);
  const userGroups = await getUserGroups(user.id);

  return {
    ...user.toObject(),
    enable: userCognitoInfo.Enabled,
    email_verified: userAttributes.email_verified === "true",
    phone_number: userAttributes.phone_number,
    phone_number_verified: userAttributes.phone_number_verified === "true",
    roles: userGroups,
  };
};

const getUserIdByCognitoId = async (cid) => {
  const user = await User.findOne({ id: cid });
  if (!user) {
    const { userAttributes } = await getCognitoUserInfo(cid);
    return {
      redirectTo: "/complete-profile",
      data: {
        email: userAttributes.email,
        id: userAttributes.sub,
      },
    };
  }
  return { id: user._id };
};

const getUserSavedAds = async (uid) => {
  const user = await User.findById(uid);
  if (!user) return null;
  return user.saved_ads;
};

const getUserSavedAdsCount = async (uid) => {
  const user = await User.findById(uid);
  if (!user) return null;
  return user.saved_ads.length;
};

const getUserStats = async () => {
  const startOfLast30Days = new Date();
  startOfLast30Days.setDate(startOfLast30Days.getDate() - 30);

  const newUsers = await User.countDocuments({
    createdAt: { $gte: startOfLast30Days },
  });

  const activeUsersLast30Days = await User.countDocuments({
    lastLogin: { $gte: startOfLast30Days },
  });

  return { newUsers, activeUsersLast30Days };
};

const updateSavedAds = async (uid, savedAds) => {
  const user = await User.findById(uid);
  if (!user) return null;

  user.saved_ads = savedAds;
  const updatedUser = await User.findByIdAndUpdate(uid, user, { new: true });
  return updatedUser.saved_ads;
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
