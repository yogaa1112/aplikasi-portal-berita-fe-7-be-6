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
  getSubCategoryByQuery(req, res) {
    let search = req.params.query;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT s.* FROM sub_categories s 
          JOIN users u ON s.user_id = u.user_id
          JOIN categories c ON s.category_id = c.category_id
          WHERE 
          s.categories_id = ${search} OR
          s.categories_name = ${search} OR
          s.categories_code = ${search} OR
          s.categories_description = ${search} OR
          u.user_name = ${search} OR
          c.category_name = ${search}`,
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
};
