const express = require("express");
const {
  getBrands,
  getBrandByName,
  createBrand,
  deleteBrand,
} = require("../../controllers/settings/brandController");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const verifyUserRoles = require("../../middlewares/verifyUserRoles");
const ROLES_LIST = require("../../utils/rolesList");

const router = express.Router();

router.get("/", getBrands);
router.get("/:name", getBrandByName);

router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  createBrand
);

router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteBrand
);

module.exports = router;
