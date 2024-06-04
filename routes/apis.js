var express = require("express");
var router = express.Router();
let news = require("../controller/newsController");
let user = require("../controller/userController");

const { check, validationResult } = require("express-validator");
const passwordHash = require("password-hash");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "HI" });
});

router.get("/news", news.getAllNews);
router.get("/news/:query", news.getNewsByQuery);

module.exports = router;
