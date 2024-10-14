const express = require("express");
const router = express.Router();

const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const articleCategoryRoutes = require("./articleCategoryRoutes");

router.use("/v1/article", articleRoutes);
router.use("/v1/comment", commentRoutes);
router.use("/v1/settings/article-categories", articleCategoryRoutes);

module.exports = router;
