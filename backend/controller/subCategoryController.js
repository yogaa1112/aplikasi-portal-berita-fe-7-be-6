const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllSubCategory(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query("SELECT s.* FROM sub_categories s", (error, rows) => {
          if (error) {
            res.status(404).json({
              error: "ITEM_NOT_FOUND",
              message: `Sub Category was not found`,
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

  getSubCategoryById(req, res) {
    let search = req.params.query;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT s.* FROM sub_categories s 
          JOIN users u ON s.user_id = u.user_id
          JOIN categories c ON s.category_id = c.category_id
          WHERE 
          s.categories_id = ${search}`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "SUB_CATEGORY_NOT_FOUND",
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

  addSubCategory(req, res) {
    let data = {
      sub_cat_name: req.body.sub_cat_name,
      sub_cat_code: req.body.sub_cat_code,
      sub_cat_description: req.body.sub_cat_description,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO sub_categories (sub_cat_name, sub_cat_code, sub_cat_description, user_id, category_id) VALUES ?`,
          data,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Insert Sub Category Failed`,
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

  updateSubCategory(req, res) {
    let data = {
      sub_cat_name: req.body.sub_cat_name,
      sub_cat_code: req.body.sub_cat_code,
      sub_cat_description: req.body.sub_cat_description,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `UPDATE sub_categories SET ? WHERE sub_cat_id = ${req.params.id}`,
          data,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Update Sub Category Failed`,
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

  deleteSubCategory(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM sub_categories WHERE sub_cat_id = ${req.params.id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Sub Category Failed`,
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
