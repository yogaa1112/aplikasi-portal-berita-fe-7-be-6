var express = require("express");
var router = express.Router();
let roles = require("../controller/roleController");

/* GET home page. */
router.get("/", roles.getAllRole);
router.get("/:id", roles.getRoleById);

module.exports = router;
