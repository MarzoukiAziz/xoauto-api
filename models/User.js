const mongoose = require("mongoose");
const crypto = require("crypto");
const softDeleteMiddleware = require("../middlewares/softDeleteMiddleware");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email",
      ],
    },
    phone: { type: String, required: false },
    avatar: { type: String, required: false },
    pro: { type: Boolean, required: false },
    favoris: [{ type: String }],
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

// Apply the softDeleteMiddleware to the schema
userSchema.plugin(softDeleteMiddleware);

const tokenExpirationMinutes = parseInt(
  process.env.PASSWORD_RESET_TOKEN_EXPIRATION,
  10
);

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + tokenExpirationMinutes * 60 * 1000; // Token expires in 30 minutes
  return resetToken;
};

module.exports = new mongoose.model("User", userSchema);
