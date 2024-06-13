var express = require("express");
var router = express.Router();
let user = require("../controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/:id", user.getUserById);
router.post("/insert", user.addUser);
router.put("/update", user.updateUser);
router.delete("/delete", user.deleteUser);

module.exports = router;
