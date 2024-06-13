var express = require("express");
var router = express.Router();
let category = require("../controller/categoryController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Category" });
});
router.get("/:id", category.getCategoryById);
router.post("/insert", category.addCategory);
router.put("/update", category.updateCategory);
router.delete("/delete", category.deleteCategory);

module.exports = router;
