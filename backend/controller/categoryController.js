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
          "SELECT c.*, u.user_name FROM categories c JOIN users u ON c.user_id = u.user_id",
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
          `SELECT c.* FROM categories c 
          JOIN users u ON c.user_id = u.user_id
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
    let data = {
      categories_name: req.body.categories_name,
      categories_code: req.body.categories_code,
      categories_description: req.body.categories_description,
      user_id: req.body.user_id,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          "INSERT INTO categories (category_name, category_code, description, user_id) VALUES ?",
          data,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Input Category failed`,
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
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },

  updateCategory(req, res) {
    let data = {
      categories_name: req.body.categories_name,
      categories_code: req.body.categories_code,
      categories_description: req.body.categories_description,
      user_id: req.body.user_id,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `UPDATE categories SET ? WHERE category_id = ${req.params.id}`,
          data,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Update Category failed`,
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
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },

  deleteCategory(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM categories WHERE category_id = ${req.params.id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Category failed`,
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
        .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
    }
  },
};
