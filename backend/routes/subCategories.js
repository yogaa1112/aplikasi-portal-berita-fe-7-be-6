var express = require("express");
var router = express.Router();
let subCategory = require("../controller/subCategoryController");

/* GET home page. */
router.get("/", subCategory.getAllSubCategory);
router.get("/:id", subCategory.getSubCategoryById);
router.post("/", subCategory.getSubCategoryByQuery);
router.post("/add", subCategory.addSubCategory);
router.put("/update/:id", subCategory.updateSubCategory);
router.delete("/delete/:id", subCategory.deleteSubCategory);

module.exports = router;
