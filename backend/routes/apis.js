var express = require("express");
var router = express.Router();
let news = require("../controller/newsController");
let category = require("../controller/categoryController");
let subCategory = require("../controller/subCategoryController");
let role = require("../controller/roleController");
let user = require("../controller/userController");

const { check, validationResult } = require("express-validator");
const passwordHash = require("password-hash");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "API" });
});

router.get("/news", news.getAllNews);
router.get("/news/:id", news.getNewsById);
router.get("/category", category.getAllCategory);
router.get("/category/:id", category.getCategoryById);
router.get("/sub-category", subCategory.getAllSubCategory);
router.get("/sub-category/:id", subCategory.getSubCategoryById);
router.get("/role", role.getAllRole);
router.get("/role/:id", role.getRoleById);
router.get("/user", user.getAllUser);
router.get("/user/:id", user.getUserById);

module.exports = router;
