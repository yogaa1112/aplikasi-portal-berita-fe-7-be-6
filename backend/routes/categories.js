var express = require("express");
var router = express.Router();
let category = require("../controller/categoryController");

/* GET home page. */
router.get("/", category.getAllCategory);
router.get("/:id", category.getCategoryById);
router.post("/add", category.addCategory);
router.put("/update/:id", category.updateCategory);
router.delete("/delete/:id", category.deleteCategory);

module.exports = router;
