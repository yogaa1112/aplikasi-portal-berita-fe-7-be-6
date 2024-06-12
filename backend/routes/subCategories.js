var express = require("express");
var router = express.Router();
let subCategory = require("../controller/subCategoryController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Sub Category" });
});
router.get("/:id", subCategory.getSubCategoryById);
router.post("/insert", subCategory.insertSubCategory);
router.put("/update", subCategory.updateSubCategory);
router.delete("/delete", subCategory.deleteSubCategory);

module.exports = router;
