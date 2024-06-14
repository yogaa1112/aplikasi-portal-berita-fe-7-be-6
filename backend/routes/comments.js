var express = require("express");
var router = express.Router();
let comment = require("../controller/commentController");

/* GET home page. */
router.get("/", comment.getAllComment);
router.get("/:id", comment.getCommentById);
router.post("/add", comment.addComment);
router.put("/update/:id", comment.updateComment);
router.delete("/delete/:id", comment.deleteComment);

module.exports = router;
