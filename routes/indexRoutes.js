const express = require("express");
const router = express.Router();

//User Route
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");


router.use("/v1/user", userRoutes);
router.use("/v1/article", articleRoutes);
router.use("/v1/comment", commentRoutes);


module.exports = router;
