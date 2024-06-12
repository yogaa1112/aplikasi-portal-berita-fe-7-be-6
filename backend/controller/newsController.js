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
        conn.query(
          `SELECT n.*, u.user_name, c.category_name, s.sub_cat_name FROM news n
        JOIN users u ON n.user_id = u.user_id
        JOIN categories c ON n.category_id = c.category_id
        JOIN sub_categories s ON n.sub_cat_id = s.sub_cat_id`,
          (error, rows) => {
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
          }
        );
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },

  getNewsById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT n.* FROM news n 
          JOIN users u ON n.user_id = u.user_id
          JOIN categories c ON n.category_id = c.category_id
          JOIN sub_categories s ON n.sub_cat_id = s.sub_cat_id
          WHERE 
          n.news_id = ${search}`,
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

  addNews(req, res) {
    let data = {
      news_title: req.body.news_title,
      news_content: req.body.news_content,
      image_url: req.body.image_url,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      sub_cat_id: req.body.sub_cat_id,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO news (news_title, news_content, image_url, user_id, category_id, sub_cat_id) VALUES ?`,
          data,
          (error, results) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Input News failed`,
              });
            } else {
              res.json({
                data: results,
              });
            }
          }
        );
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },

  updateNews(req, res) {
    let data = {
      news_title: req.body.news_title,
      news_content: req.body.news_content,
      image_url: req.body.image_url,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      sub_cat_id: req.body.sub_cat_id,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `UPDATE news SET ? WHERE news_id = ${req.params.id}`,
          data,
          (error, results) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Update News failed`,
              });
            } else {
              res.json({
                data: results,
              });
            }
          }
        );
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },

  deleteNews(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM news WHERE news_id = ${req.params.id}`,
          (error, results) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete News failed`,
              });
            } else {
              res.json({
                data: results,
              });
            }
          }
        );
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },
};
