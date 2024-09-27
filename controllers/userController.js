const User = require("../models/User");

// Get All Users
const getAllUsers = async (req, res, next) => {
  try {
    const { role, keywords, size, page, sort } = req.query;

    let query = {};

    if (role && keywords) {
      query = {
        roles: { $in: [role] },
        $or: [
          { name: { $regex: keywords, $options: "i" } },
          { email: { $regex: keywords, $options: "i" } },
        ],
      };
    } else if (role) {
      query = { roles: { $in: [role] } };
    } else if (keywords) {
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
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByUid,
};
