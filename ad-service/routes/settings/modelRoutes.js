const express = require("express");
const {
  getModels,
  getModelsByBrandIds,
  getModelsWithBrand,
  createModel,
  deleteModel,
} = require("../../controllers/settings/modelController");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const verifyUserRoles = require("../../middlewares/verifyUserRoles");
const ROLES_LIST = require("../../utils/rolesList");

const router = express.Router();

router.get("/", getModels);
router.get("/brands", getModelsWithBrand);
router.get("/selected-brands", getModelsByBrandIds);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  createModel
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteModel
);

module.exports = router;
