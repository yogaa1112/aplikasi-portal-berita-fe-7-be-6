var express = require("express");
var router = express.Router();
let comment = require("../controller/commentController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Comments" });
});
router.get("/:id", comment.getCommentById);
// router.post("/insert", comment.insertComment);
// router.put("/update", comment.updateComment);
// router.delete("/delete", comment.deleteComment);

module.exports = router;
