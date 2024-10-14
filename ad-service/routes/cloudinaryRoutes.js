const express = require("express");

const {
  createSigntureGallerie,
  createSigntureVideo,
} = require("../controllers/cloudinary.js");

const router = express.Router();

router.get("/adpics", createSigntureGallerie);
router.get("/adVids", createSigntureVideo);

module.exports = router;
