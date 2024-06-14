var express = require("express");
var router = express.Router();
let news = require("../controller/newsController");

/* GET home page. */
router.get("/", news.getAllNews);
router.get("/:id", news.getNewsById);
router.post("/add", news.addNews);
router.put("/update/:id", news.updateNews);
router.delete("/delete/:id", news.deleteNews);

module.exports = router;
