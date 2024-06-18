const { check } = require("express-validator");
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
        conn.query(
          `SELECT s.*, c.category_name, u.user_name, r.role_name 
          FROM sub_categories s
          JOIN categories c ON s.category_id = c.category_id
          JOIN users u ON s.user_id = u.user_id
          JOIN roles r ON u.role_id = r.role_id
          ORDER BY s.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `Sub Category was not found`,
              });
            } else {
              res.status(200).json({
                data: rows,
                message: "Sub Categories fetched successfully",
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

  getSubCategoryById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT s.*, c.category_name, u.user_name, r.role_name 
          FROM sub_categories s
          JOIN categories c ON s.category_id = c.category_id
          JOIN users u ON s.user_id = u.user_id
          JOIN roles r ON u.role_id = r.role_id
          WHERE 
          s.category_id = ${search}
          ORDER BY s.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
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
                res.status(200).json({
                  data: rows,
                  message: "Sub Category By Id fetched successfully",
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

  addSubCategory(req, res) {
    let sub_cat_name = req.body.sub_cat_name;
    let sub_cat_code = req.body.sub_cat_code;
    let description = req.body.description;
    let user_id =
      typeof req.body.user_id === "undefined" || req.body.user_id === ""
        ? 2
        : req.body.user_id;
    let category_id =
      typeof req.body.category_id === "undefined" || req.body.category_id === ""
        ? 1
        : req.body.category_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO sub_categories (sub_cat_name, sub_cat_code, sub_cat_description, user_id, category_id)
          VALUES ('${sub_cat_name}', '${sub_cat_code}', '${description}', '${user_id}', '${category_id}')`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Insert Sub Category Failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Insert Sub Category Success",
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

  updateSubCategory(req, res) {
    let sub_cat_id = parseInt(req.params.id);
    let sub_cat_name = req.body.sub_cat_name;
    let sub_cat_code = req.body.sub_cat_code;
    let description = req.body.description;
    let archived = req.body.archived;
    let user_id = req.body.user_id;
    let category_id = req.body.category_id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT s.* FROM sub_categories s WHERE sub_cat_id = ${sub_cat_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Sub Category not found`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "SUB_CATEGORY_NOT_FOUND",
                  message: `Sub Category was not found`,
                });
                return;
              }

              if (typeof sub_cat_name === "undefined" || sub_cat_name === "") {
                sub_cat_name = rows[0].sub_cat_name;
              }

              if (typeof sub_cat_code === "undefined" || sub_cat_code === "") {
                sub_cat_code = rows[0].sub_cat_code;
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

              if (typeof category_id === "undefined" || category_id === "") {
                category_id = rows[0].category_id;
              }

              conn.query(
                `UPDATE sub_categories s 
                SET s.sub_cat_name = '${sub_cat_name}', s.sub_cat_code = '${sub_cat_code}', s.description = '${description}', s.archived = '${archived}', s.user_id = '${user_id}', s.category_id = '${category_id}', update_time = NOW() 
                WHERE sub_cat_id = ${sub_cat_id}`,
                (error, rows) => {
                  if (error) {
                    res.status(404).json({
                      error: "ERROR",
                      message: `Update Sub Category Failed`,
                    });
                  } else {
                    res.json({
                      data: rows,
                      message: "Update Sub Category Success",
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

  deleteSubCategory(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM news WHERE sub_cat_id = ${req.params.id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Sub Category Failed`,
              });
            }
          }
        );

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
                message: "Delete Sub Category Success",
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
