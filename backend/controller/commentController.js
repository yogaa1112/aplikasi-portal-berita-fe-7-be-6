const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllComment(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.*, u.user_name, n.news_title FROM comments c 
        JOIN users u ON c.user_id = u.user_id
        JOIN news n ON c.news_id = n.news_id`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `Comment was not found`,
              });
            } else {
              res.json({
                data: rows,
              });
            }
          }
        );
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },

  getCommentById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.* FROM comments c 
          JOIN users u ON c.user_id = u.user_id
          JOIN news n ON c.news_id = n.news_id
          WHERE 
          c.comment_id = ${search}`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "COMMENT_NOT_FOUND",
                  message: `Comment was not found`,
                });
              } else {
                res.json({
                  data: rows,
                });
              }
            }
          }
        );
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },
};
