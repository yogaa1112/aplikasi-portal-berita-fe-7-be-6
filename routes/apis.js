var express = require("express");
var router = express.Router();
let news = require("../controller/newsController");
let category = require("../controller/categoryController");
let subCategory = require("../controller/subCategoryController");
let role = require("../controller/roleController");

const { check, validationResult } = require("express-validator");
const passwordHash = require("password-hash");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "HI" });
});

router.get("/news", news.getAllNews);
router.get("/news/:id", news.getNewsById);
router.get("/category", category.getAllCategory);
router.get("/category/:id", category.getCategoryById);
router.get("/sub-category", subCategory.getAllSubCategory);
router.get("/sub-category/:id", subCategory.getSubCategoryById);
router.get("/role", role.getAllRole);
router.get("/role/:id", role.getRoleById);

module.exports = router;
