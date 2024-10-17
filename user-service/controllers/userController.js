const userService = require("../services/userService");

const getAllUsers = async (req, res, next) => {
  try {
    const { keywords, size, page, sort } = req.query;
    const { users, count } = await userService.getAllUsers(
      keywords,
      size,
      page,
      sort
    );
    res.status(200).json({ users, count });
  } catch (error) {
    next(error);
  }
};

const getUserByUid = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserByUid(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      res.status(404).json({ error: "User not found" });
    } else {
      next(error);
    }
  }
};

const getUserIdByCognitoId = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const response = await userService.getUserIdByCognitoId(cid);
    if (response.redirectTo) {
      res.status(302).json(response);
    } else {
      res.status(200).json({ id: response.id });
    }
  } catch (error) {
    if (error.name === "UserNotFoundException") {
      res.status(302).json({ redirectTo: "/complete-profile" });
    } else {
      next(error);
    }
  }
};

const getUserSavedAds = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const savedAds = await userService.getUserSavedAds(uid);
    if (!savedAds) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(savedAds);
  } catch (error) {
    next(error);
  }
};

const getUserSavedAdsCount = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const count = await userService.getUserSavedAdsCount(uid);
    if (count === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

const getUserStats = async (req, res, next) => {
  try {
    const stats = await userService.getUserStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

const updateSavedAds = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const savedAds = req.body;
    const updatedSavedAds = await userService.updateSavedAds(uid, savedAds);
    if (!updatedSavedAds) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedSavedAds);
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
