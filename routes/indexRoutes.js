const express = require("express");
const router = express.Router();

//User Route
const cognitoRoutes = require("./cognitoRoutes");
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const adRoutes = require("./adRoutes");
const adViewRoutes = require("./adViewRoutes");
const inshightsRoutes = require("./inshightsRoutes");
const articleCategoryRoutes = require("./settings/articleCategoryRoutes");
const BrandRoutes = require("./settings/brandRoutes");
const ModelRoutes = require("./settings/modelRoutes");
const EnergyRoutes = require("./settings/energyRoutes");
const CategoryRoutes = require("./settings/categoryRoutes");
const RegionRoutes = require("./settings/regionRoutes");
const ColorRoutes = require("./settings/colorRoutes");
const EquipmentRoutes = require("./settings/equipmentsRoutes");
const SettingRoutes = require("./settings/settingRoutes");

router.use("/v1/cognito", cognitoRoutes);
router.use("/v1/user", userRoutes);
router.use("/v1/article", articleRoutes);
router.use("/v1/comment", commentRoutes);
router.use("/v1/ads", adRoutes);
router.use("/v1/ad-views", adViewRoutes);
router.use("/v1/insights", inshightsRoutes);
router.use("/v1/settings/", SettingRoutes);
router.use("/v1/settings/article-categories", articleCategoryRoutes);
router.use("/v1/settings/brands", BrandRoutes);
router.use("/v1/settings/models", ModelRoutes);
router.use("/v1/settings/energies", EnergyRoutes);
router.use("/v1/settings/categories", CategoryRoutes);
router.use("/v1/settings/regions", RegionRoutes);
router.use("/v1/settings/colors", ColorRoutes);
router.use("/v1/settings/equipments", EquipmentRoutes);

module.exports = router;
