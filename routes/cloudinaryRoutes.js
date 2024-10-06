const express = require("express");

const {
  createSignture,
  createSigntureGallerie,
  createSigntureVideo,
} = require("../controllers/cloudinary.js");

const router = express.Router();

router.get("/adpics", createSigntureGallerie);
router.get("/adVids", createSigntureVideo);

router.get("/:id", createSignture);

module.exports = router;
