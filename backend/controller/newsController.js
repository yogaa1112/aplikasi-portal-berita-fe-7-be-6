const { check } = require("express-validator");
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
          `SELECT n.*, u.user_name, c.category_name, s.sub_cat_name, r.role_name
          FROM news n
          JOIN users u ON n.user_id = u.user_id
          JOIN categories c ON n.category_id = c.category_id
          JOIN sub_categories s ON n.sub_cat_id = s.sub_cat_id
          JOIN roles r ON u.role_id = r.role_id
          ORDER BY n.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `News was not found`,
              });
            } else {
              res.status(200).json({
                data: rows,
                message: "News fetched successfully",
              });
            }
          }
        );
        conn.release();
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
          `SELECT n.*, u.user_name, c.category_name, s.sub_cat_name, r.role_name
          FROM news n
          JOIN users u ON n.user_id = u.user_id
          JOIN categories c ON n.category_id = c.category_id
          JOIN sub_categories s ON n.sub_cat_id = s.sub_cat_id
          JOIN roles r ON u.role_id = r.role_id
          WHERE n.news_id = ${search}
          ORDER BY n.creation_time DESC`,
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
                res.status(200).json({
                  data: rows,
                  message: "News By Id fetched successfully",
                });
              }
            }
          }
        );
        conn.release();
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNA:_SERVER_ERROR", message: error.message });
    }
  },

  getNewsByQuery(req, res) {
    let query =
      typeof req.body.search === "undefined" || req.body.search === ""
        ? ""
        : req.body.search;
    console.log(query);
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT n.*, u.user_name, c.category_name, s.sub_cat_name, r.role_name
          FROM news n
          JOIN users u ON n.user_id = u.user_id
          JOIN categories c ON n.category_id = c.category_id
          JOIN sub_categories s ON n.sub_cat_id = s.sub_cat_id
          JOIN roles r ON u.role_id = r.role_id
          WHERE
          n.news_title LIKE '%${query}%'
          OR n.news_content LIKE '%${query}%'
          OR u.user_name LIKE '%${query}%'
          OR c.category_name LIKE '%${query}%'
          OR s.sub_cat_name LIKE '%${query}%'
          OR r.role_name LIKE '%${query}%'
          ORDER BY n.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
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
                res.status(200).json({
                  data: rows,
                  message: "News By Query fetched successfully",
                });
              }
            }
          }
        );
        conn.release();
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNA:_SERVER_ERROR", message: error.message });
    }
  },

  addNews(req, res) {
    let news_title = req.body.news_title;
    let news_content = req.body.news_content;
    let image_url =
      typeof req.body.image_url === "undefined" || req.body.image_url === ""
        ? "nophoto.jpg"
        : req.body.image_url;
    let user_id =
      typeof req.body.user_id === "undefined" || req.body.user_id === ""
        ? 2
        : req.body.user_id;
    let category_id =
      typeof req.body.category_id === "undefined" || req.body.category_id === ""
        ? 1
        : req.body.category_id;
    let sub_cat_id =
      typeof req.body.sub_cat_id === "undefined" || req.body.sub_cat_id === ""
        ? 1
        : req.body.sub_cat_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO news (news_title, news_content, image_url, user_id, category_id, sub_cat_id)
          VALUES ('${news_title}', '${news_content}', '${image_url}', '${user_id}', '${category_id}', '${sub_cat_id}')`,
          (error, results) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Input News failed`,
              });
            } else {
              res.json({
                data: results,
                message: "Input News Success",
              });
            }
          }
        );
        conn.release();
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },

  updateNews(req, res) {
    let news_id = parseInt(req.params.id);
    let news_title = req.body.news_title;
    let news_content = req.body.news_content;
    let image_url = req.body.image_url;
    let archived = req.body.archived;
    let user_id = req.body.user_id;
    let category_id = req.body.category_id;
    let sub_cat_id = req.body.sub_cat_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT n.* FROM news n WHERE n.news_id = ${news_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `News was not found`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "NEWS_NOT_FOUND",
                  message: `News was not found`,
                });
                return;
              }

              if (typeof news_title === "undefined" || news_title === "") {
                news_title = rows[0].news_title;
              }

              if (typeof news_content === "undefined" || news_content === "") {
                news_content = rows[0].news_content;
              }

              if (typeof image_url === "undefined" || image_url === "") {
                image_url = rows[0].image_url;
              }

              if (typeof archived === "undefined" || archived === "") {
                archived = rows[0].archived;
              }

              if (typeof user_id === "undefined" || user_id === "") {
                user_id = rows[0].user_id;
              }

              if (typeof category_id === "undefined" || category_id === "") {
                category_id = rows[0].category_id;
              }

              if (typeof sub_cat_id === "undefined" || sub_cat_id === "") {
                sub_cat_id = rows[0].sub_cat_id;
              }

              conn.query(
                `UPDATE news n 
                SET n.news_title = '${news_title}', n.news_content = '${news_content}', n.image_url = '${image_url}', n.archived = '${archived}', n.user_id = '${user_id}', n.category_id = '${category_id}', n.sub_cat_id = '${sub_cat_id}', n.update_time = NOW()
                WHERE news_id = ${news_id}`,
                (error, results) => {
                  if (error) {
                    res.status(404).json({
                      error: "ERROR",
                      message: `Update News failed`,
                    });
                  } else {
                    res.json({
                      data: results,
                      message: "Update News Success",
                    });
                  }
                }
              );
            }
          }
        );
        conn.release();
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },

  deleteNews(req, res) {
    let news_id = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM comments WHERE news_id = ${news_id}`,
          (error, results) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Comments failed`,
              });
            }
          }
        );

        conn.query(
          `DELETE FROM news WHERE news_id = ${news_id}`,
          (error, results) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete News failed`,
              });
            } else {
              res.json({
                data: results,
                message: "Delete News Success",
              });
            }
          }
        );
        conn.release();
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },
};
