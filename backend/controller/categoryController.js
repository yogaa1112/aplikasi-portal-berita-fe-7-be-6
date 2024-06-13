const { check } = require("express-validator");
const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllCategory(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.*, u.user_name
          FROM categories c JOIN users u ON c.user_id = u.user_id`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `Category was not found`,
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

  getCategoryById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.*, u.user_name
          FROM categories c JOIN users u ON c.user_id = u.user_id
          WHERE 
          c.category_id = ${search}`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "CATEGORY_NOT_FOUND",
                  message: `Category was not found`,
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

  addCategory(req, res) {
    let categories_name = req.body.categories_name;
    let categories_code = req.body.categories_code;
    let categories_desc = req.body.categories_desc;
    let user_id = req.body.user_id;

    if (!categories_name || !categories_code || !categories_desc || !user_id)
      return res.status(400).json({
        error: "BAD_REQUEST",
        message:
          "Category Name, Category Code, Description and User ID is required",
      });

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO categories (category_name, category_code, description, user_id)
          VALUES ('${categories_name}', '${categories_code}', '${categories_desc}', '${user_id}')`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Input Category Failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Input Category Success",
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

  updateCategory(req, res) {
    let category_id = req.params.id;

    let category_name = req.body.category_name;
    let category_code = req.body.category_code;
    let description = req.body.description;
    let archived = req.body.archived;
    let user_id = req.body.user_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT c.* FROM categories c WHERE c.category_id = ${category_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Category was not found`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "CATEGORY_NOT_FOUND",
                  message: `Category was not found`,
                });
                return;
              }

              if (
                typeof category_name === "undefined" ||
                category_name === ""
              ) {
                category_name = rows[0].category_name;
              }

              if (
                typeof category_code === "undefined" ||
                category_code === ""
              ) {
                category_code = rows[0].category_code;
              }

              if (typeof description === "undefined" || description === "") {
                description = rows[0].description;
              }

              if (typeof archived === "undefined" || archived === "") {
                archived = rows[0].archived;
              }

              if (typeof user_id === "undefined" || user_id === "") {
                user_id = rows[0].user_id;
              }

              conn.query(
                `UPDATE categories c 
              SET c.category_name = '${category_name}', c.category_code = '${category_code}', c.description = '${description}', c.update_time = NOW(), c.user_id = '${user_id}'  
              WHERE c.category_id = ${category_id}`,
                (error, rows) => {
                  if (error) {
                    res.status(404).json({
                      error: "ERROR",
                      message: `Update Category failed`,
                    });
                  } else {
                    res.json({
                      data: rows,
                      message: "Update Category Success",
                    });
                  }
                }
              );
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

  deleteCategory(req, res) {
    let category_id = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `
          DELETE FROM news WHERE category_id = ${category_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete News failed`,
              });
            }
          }
        );

        conn.query(
          `
          DELETE FROM sub_categories WHERE category_id = ${category_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Sub Category failed`,
              });
            }
          }
        );

        conn.query(
          `DELETE FROM categories WHERE category_id = ${category_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Category failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Delete Category Success",
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
