const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dnm4rbqoc",
  api_key: "618589385993451",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const createSignture = (req, res) => {
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

const createSigntureGallerie = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "adPics",
    },
    cloudinary.config().api_secret
  );

  res.json({
    signature,
    timestamp,
  });
};

const createSigntureVideo = (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "adVids",
    },
    cloudinary.config().api_secret
  );

  res.json({
    signature,
    timestamp,
  });
};

module.exports = {
  createSignture,
  createSigntureGallerie,
  createSigntureVideo,
};
