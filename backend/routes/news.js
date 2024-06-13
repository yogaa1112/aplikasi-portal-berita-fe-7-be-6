var express = require("express");
var router = express.Router();
let news = require("../controller/newsController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/:id", news.getNewsById);
router.post("/insert", news.addNews);
router.put("/update", news.updateNews);
router.delete("/delete", news.deleteNews);

module.exports = router;
