const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dnm4rbqoc",
  api_key: "618589385993451",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const createSigntureAvatar = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "avatars",
    },
    cloudinary.config().api_secret
  );

  res.json({
    signature,
    timestamp,
  });
};

module.exports = {
  createSigntureAvatar,
};
