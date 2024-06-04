const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllNews(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query("SELECT n.* FROM news n", (error, rows) => {
          if (error) {
            res.status(404).json({
              error: "ITEM_NOT_FOUND",
              message: `News was not found`,
            });
          } else {
            res.json({
              data: rows,
            });
          }
        });
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },
  getNewsByQuery(req, res) {
    let search = req.params.query;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT n.* FROM news n 
          JOIN users u ON n.user_id = u.user_id
          JOIN categories c ON n.category_id = c.category_id
          JOIN sub_categories s ON n.sub_cat_id = s.sub_cat_id
          WHERE 
          n.news_id = ${search} OR
          n.news_title = ${search} OR
          n.news_content = ${search} OR
          u.user_name = ${search} OR
          c.category_name = ${search} OR
          s.sub_cat_name = ${search}`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "NEWS_NOT_FOUND",
                  message: `News was not found`,
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
        .json({ error: "INTERNA:_SERVER_ERROR", message: error.message });
    }
  },
};
