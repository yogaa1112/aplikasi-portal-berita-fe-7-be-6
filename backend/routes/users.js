var express = require("express");
var router = express.Router();
let user = require("../controller/userController");

/* GET users listing. */
router.get("/", user.getAllUser);
router.get("/:id", user.getUserById);
router.post("/add", user.addUser);
router.put("/update:id", user.updateUser);
router.delete("/delete/:id", user.deleteUser);

module.exports = router;
