var express = require("express");
var router = express.Router();
var auth = require("../controller/authController");

router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);
router.get("/logout", auth.logoutUser);

module.exports = router;
