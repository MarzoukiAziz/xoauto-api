const express = require("express");
const router = express.Router();

//User Route
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");

router.use("/v1/user", userRoutes);
router.use("/v1/article", articleRoutes);


module.exports = router;
