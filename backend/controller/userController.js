const { check } = require("express-validator");
const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllUser(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.*, r.role_name
          FROM users u JOIN roles r ON r.role_id = u.role_id`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `User was not found`,
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

  getUserById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.*, r.role_name 
          FROM users u JOIN roles r ON u.role_id = r.role_id 
          WHERE u.user_id = ${search}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "USER_NOT_FOUND",
                  message: `User was not found`,
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

  addUser(req, res) {
    let user_name = req.body.user_name;
    let user_email = req.body.user_email;
    let password = req.body.password;
    let image_url = req.body.image_url;
    let role_id = req.body.role_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO users (user_name, user_email, password, image_url, role_id) 
          VALUES ('${user_name}', '${user_email}', SHA1('${password}'),'${image_url}' , '${role_id}')`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Input User Failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Input User Success",
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

  updateUser(req, res) {
    let user_id = req.params.id;
    let user_name = req.body.user_name;
    let user_email = req.body.user_email;
    let password = req.body.password;
    let image_url = req.body.image_url;
    let archived = req.body.archived;
    let role_id = req.body.role_id;

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.* FROM users u WHERE u.user_id = ${user_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `User was not found`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "USER_NOT_FOUND",
                  message: `User was not found`,
                });
                return;
              }

              if (typeof user_name === "undefined" || user_name === "") {
                user_name = rows[0].user_name;
              }

              if (typeof user_email === "undefined" || user_email === "") {
                user_email = rows[0].user_email;
              }

              if (typeof password === "undefined" || password === "") {
                password = rows[0].password;
              }

              if (typeof image_url === "undefined" || image_url === "") {
                image_url = rows[0].image_url;
              }

              if (typeof archived === "undefined" || archived === "") {
                archived = rows[0].archived;
              }

              if (typeof role_id === "undefined" || role_id === "") {
                role_id = rows[0].role_id;
              }

              conn.query(
                `UPDATE users u
                SET u.user_name = '${user_name}', u.user_email = '${user_email}', u.password = SHA1('${password}'), u.image_url = '${image_url}', u.archived = '${archived}', u.updated_time = NOW() , u.role_id = '${role_id}'
                WHERE u.user_id = ${user_id}`,
                (error, rows) => {
                  if (error) {
                    res.status(404).json({
                      error: "ERROR",
                      message: `Update User Failed`,
                    });
                  } else {
                    res.json({
                      data: rows,
                      message: "Update User Success",
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
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },

  deleteUser(req, res) {
    let user_id = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM news WHERE user_id = ${user_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete News Failed`,
              });
            }
          }
        );

        conn.query(
          `DELETE FROM sub_categories WHERE user_id = ${user_id}`,
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
          `DELETE FROM categories WHERE user_id = ${user_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Category Failed`,
              });
            }
          }
        );

        conn.query(
          `DELETE FROM comments WHERE user_id = ${user_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete Comment Failed`,
              });
            }
          }
        );

        conn.query(
          `DELETE FROM users WHERE user_id = ${user_id}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Delete User Failed`,
              });
            } else {
              res.json({
                data: rows,
                message: "Delete User Success",
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
};
