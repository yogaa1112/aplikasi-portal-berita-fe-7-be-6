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
        conn.query("SELECT u.* FROM users u", (error, rows) => {
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
        });
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },
  getUserById(req, res) {
    let search = req.params.query;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.*, r.role_name 
          FROM users u JOIN roles r ON u.role_id = r.role_id 
          WHERE 
          u.user_id = ${search}`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
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
    let { user_name, user_email, password, role_id } = req.body;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO users (user_name, user_email, password, role_id) VALUES ('${user_name}', '${user_email}', '${password}', '${role_id}')`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              res.json({
                data: rows,
                message: "User has been added",
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
    let { user_name, user_email, password, role_id } = req.body;
    let search = req.params.query;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `UPDATE users SET user_name = '${user_name}', user_email = '${user_email}', password = '${password}', role_id = '${role_id}' WHERE user_id = ${search}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              res.json({
                data: rows,
                message: "User has been updated",
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

  deleteUser(req, res) {
    let search = req.params.query;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `DELETE FROM users WHERE user_id = ${search}`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              res.json({
                data: rows,
                message: "User has been deleted",
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
