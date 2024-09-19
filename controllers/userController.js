const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { sendPasswordResetEmail } = require("../utils/mail");
const {
  userRegistrationSuccessfulMessage,
  userAlreadyExistsMessage,
  userNotFoundMessage,
  incorrectPasswordMessage,
  loginSuccessfulMessage,
  invalidRefreshTokenMessage,
  accessTokenGeneratedSuccesfully,
  passwordUpdatedMessage,
  passwordResetEmailSentMessage,
  invalidTokenMessage,
  passwordResetSuccessMessage
} = require("../utils/messages.json");
const baseUrl = require("../constants/baseUrl");
const ROLES_LIST = require("../utils/rolesList")

const { generateTokens, generateAccessTokenFromRefreshToken } = require("../utils/generateTokens");

// Controller for user registration
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password } = req.body;  // Extract user registration data from the request body
  let user = await User.findOne({ email });  // Check if a user with the provided email already exists
  if (user) return next(new ErrorResponse(userAlreadyExistsMessage, 409));
  const passwordHash = await bcrypt.hash(password, 10);  // Hash the password and generate a verification token
  // Create a new user object
  const newUser = new User({
    name,
    email,
    password: passwordHash,
    roles: [ROLES_LIST.USER],
    phone,
    pro: false,
    email_verified: false,
    phone_number_verified: false,
    favorsi: []
  });
  user = await newUser.save();  // Save the user to the database
  res.status(201).json({
    success: true,
    data: {
      message: userRegistrationSuccessfulMessage
    }
  });
});

// Controller for user login
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;  // Extract user login data from the request body
  try {
    const user = await User.findOne({ email });  // Check if a user with the provided email exists
    if (!user) {
      return next(new ErrorResponse(userNotFoundMessage, 404));
    }
    // Check if the provided password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse(incorrectPasswordMessage, 401));
    }

    user.lastLogin = Date.now();
    await user.save();

    const tokens = generateTokens(user);  // Generate access and refresh tokens with customizable expiration times
    res.status(200).json({
      success: true,
      data: {
        accessToken: tokens.accessToken,
        user
      }
    });
  } catch (err) {
    next(err);
  }
});


// Controller to generate a new access token using a refresh token
const generateAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refreshToken || req.headers["refresh-token"];  // Extract refresh token from the request body or headers
  if (!refreshToken) {
    return next(new ErrorResponse(invalidRefreshTokenMessage, 401));
  }
  try {
    const newAccessToken = generateAccessTokenFromRefreshToken(refreshToken);
    if (!newAccessToken) {
      return next(new ErrorResponse(invalidRefreshTokenMessage, 401));
    }
    res.status(200).json({
      success: true,
      data: {
        message: accessTokenGeneratedSuccesfully,
        accessToken: newAccessToken
      }
    });
  } catch (err) {
    next(err);
  }
});

// Controller to change user password using old password
const changePassword = asyncHandler(async (req, res, next) => {
  const { userId, currentPassword, newPassword } = req.body;  // Extract user information from the request
  try {
    const user = await User.findById(userId);  // Find the user by userId
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    // Check if the provided current password matches the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(new ErrorResponse(incorrectPasswordMessage, 401));
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);  // Hash the new password
    user.password = newPasswordHash;  // Update the user's password
    await user.save();
    res.status(200).json({
      success: true,
      data: {
        message: passwordUpdatedMessage
      }
    });
  } catch (err) {
    next(err);
  }
});

// Controller to generate a link to generate new password
const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;  // Extract user information from the request
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse(userNotFoundMessage, 404));
    }
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${baseUrl}/user/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);
    res.status(200).json({
      success: true,
      data: {
        message: passwordResetEmailSentMessage
      }
    });
  } catch (err) {
    next(err);
  }
});

// Controller to generate new password using password reset token
const resetPassword = asyncHandler(async (req, res, next) => {
  const resetToken = req.params.token;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
      return next(new ErrorResponse(invalidTokenMessage, 400));
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      data: {
        message: passwordResetSuccessMessage
      }
    });
  } catch (err) {
    next(err);
  }
});

// Controller to soft delete a user
const softDeleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse(userNotFoundMessage, 404));
    }
    await user.softDelete(); // Call the softDelete() method
    res.status(200).json({
      success: true,
      data: {
        message: "User soft deleted successfully.",
      },
    });
  } catch (err) {
    next(err);
  }
});

// Controller to soft delete a user
const activateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse(userNotFoundMessage, 404));
    }
    await user.cancelDelete(); // Call the cancelDelete() method
    res.status(200).json({
      success: true,
      data: {
        message: "User activated successfully.",
      },
    });
  } catch (err) {
    next(err);
  }
});

// Get All Users
const getAllUsers = async (req, res, next) => {
  try {
    const {
      role,
      keywords,
      size,
      page,
      sort
    } = req.query;

    let query = {};

    if (role && keywords) {
      query = {
        roles: { $in: [role] },
        $or: [
          { name: { $regex: keywords, $options: 'i' } },
          { email: { $regex: keywords, $options: 'i' } },
        ],
      };
    } else if (role) {
      query = { roles: { $in: [role] }, };
    } else if (keywords) {
      query = {
        $or: [
          { name: { $regex: keywords, $options: 'i' } },
          { email: { $regex: keywords, $options: 'i' } },
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
      count: count
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
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

// get the current user's account details
const getMyAccount = asyncHandler(async (req, res, next) => {
  try {
    // Assuming the user ID is stored in the JWT and available in `req.user`
    const userId = req.userId;
    // Find the user by their ID
    const user = await User.findById(userId).select('-password'); // Exclude the password field

    if (!user) {
      return next(new ErrorResponse(userNotFoundMessage, 404));
    }

    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
});



module.exports = { registerUser, loginUser, generateAccessToken, changePassword, forgetPassword, resetPassword, softDeleteUser, getAllUsers, getUserByUid, getMyAccount, activateUser }