const { check } = require("express-validator");
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
          `SELECT c.*, u.user_name, n.news_title, r.role_name
          FROM comments c 
          JOIN users u ON c.user_id = u.user_id
          JOIN news n ON c.news_id = n.news_id
          JOIN roles r ON u.role_id = r.role_id
          ORDER BY c.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `Comment was not found`,
              });
            } else {
              res.status(200).json({
                data: rows,
                message: "Comments fetched successfully",
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

  getCommentById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.*, u.user_name, n.news_title, r.role_name
          FROM comments c 
          JOIN users u ON c.user_id = u.user_id
          JOIN news n ON c.news_id = n.news_id
          JOIN roles r ON u.role_id = r.role_id
          WHERE 
          c.comment_id = ${search}
          ORDER BY c.creation_time DESC`,
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
                res.status(200).json({
                  data: rows,
                  message: "Comment fetched successfully",
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
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },

  getCommentByQuery(req, res) {
    let query = typeof req.body.search === "undefined" ? "" : req.body.search;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.*, u.user_name, n.news_title, r.role_name
          FROM comments c 
          JOIN users u ON c.user_id = u.user_id
          JOIN news n ON c.news_id = n.news_id
          JOIN roles r ON u.role_id = r.role_id
          WHERE 
          c.content LIKE '%${query}%' OR
          u.user_name LIKE '%${query}%' OR
          n.news_title LIKE '%${query}%'
          ORDER BY c.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `Comment was not found`,
              });
            } else {
              res.status(200).json({
                data: rows,
                message: "Comments fetched successfully",
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

  addComment(req, res) {
    let content = req.body.content;
    let user_id =
      typeof req.body.user_id === "undefined" || req.body.user_id === ""
        ? 2
        : req.body.user_id;
    let news_id =
      typeof req.body.news_id === "undefined" || req.body.news_id === ""
        ? 1
        : req.body.news_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO comments (content, user_id, news_id)
          VALUES ('${content}', '${user_id}', '${news_id}')`,
          (error, rows) => {
            if (error) {
              res.status(400).json({
                error: "ERROR",
                message: `Input Comment Failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Input Comment Success",
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

  updateComment(req, res) {
    let comment_id = parseInt(req.params.id);
    let content = req.body.content;
    let archived = req.body.archived;
    let user_id = req.body.user_id;
    let news_id = req.body.news_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.* FROM comments c WHERE comment_id = ${comment_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Comment was not found`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "COMMENT_NOT_FOUND",
                  message: `Comment was not found`,
                });
                return;
              }

              if (typeof content === "undefined" || content === "") {
                content = rows[0].content;
              }

              if (typeof archived === "undefined" || archived === "") {
                archived = rows[0].archived;
              }

              if (typeof user_id === "undefined" || user_id === "") {
                user_id = rows[0].user_id;
              }

              if (typeof news_id === "undefined" || news_id === "") {
                news_id = rows[0].news_id;
              }

              conn.query(
                `UPDATE comments c
                SET c.content = '${content}', c.archived = '${archived}',c.update_time = NOW() , c.user_id = '${user_id}', c.news_id = '${news_id}'
                WHERE c.comment_id = ${comment_id}`,
                (error, rows) => {
                  if (error) {
                    res.status(404).json({
                      error: "ERROR",
                      message: `Update Comment Failed`,
                    });
                  } else {
                    res.json({
                      data: rows,
                      message: "Update Comment Success",
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
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },

  deleteComment(req, res) {
    let comment_id = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM comments WHERE comment_id = ${comment_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Comment Failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Delete Comment Success",
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
};
