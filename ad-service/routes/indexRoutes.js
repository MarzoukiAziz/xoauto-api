const express = require("express");
const router = express.Router();

const adRoutes = require("./adRoutes");
const adViewRoutes = require("./adViewRoutes");
const BrandRoutes = require("./settings/brandRoutes");
const ModelRoutes = require("./settings/modelRoutes");
const EnergyRoutes = require("./settings/energyRoutes");
const CategoryRoutes = require("./settings/categoryRoutes");
const RegionRoutes = require("./settings/regionRoutes");
const ColorRoutes = require("./settings/colorRoutes");
const EquipmentRoutes = require("./settings/equipmentsRoutes");
const SettingRoutes = require("./settings/settingRoutes");
const cloudinaryRoute = require("./cloudinaryRoutes.js");

router.use("/v1/ads", adRoutes);
router.use("/v1/ad-views", adViewRoutes);
router.use("/v1/settings/", SettingRoutes);
router.use("/v1/settings/brands", BrandRoutes);
router.use("/v1/settings/models", ModelRoutes);
router.use("/v1/settings/energies", EnergyRoutes);
router.use("/v1/settings/categories", CategoryRoutes);
router.use("/v1/settings/regions", RegionRoutes);
router.use("/v1/settings/colors", ColorRoutes);
router.use("/v1/settings/equipments", EquipmentRoutes);
router.use("/v1/cloudinary", cloudinaryRoute);

module.exports = router;
