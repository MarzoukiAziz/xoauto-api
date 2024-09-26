const express = require("express");
const router = express.Router();
const {
  verifyregistrationCode,
  signUp,
  logIn,
  verifyToken,
} = require("../controllers/cognitoController");

router.post("/signup", signUp);
router.post("/code", verifyregistrationCode);
router.post("/login", logIn);
router.get("/verify", verifyToken);

module.exports = router;
