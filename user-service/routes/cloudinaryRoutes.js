const express = require("express");
const { createSigntureAvatar } = require("../controllers/cloudinary.js");
const router = express.Router();

router.get("/avatar", createSigntureAvatar);

module.exports = router;
