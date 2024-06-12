const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  loginUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.user_name, u.password 
          FROM users u
          WHERE 
          u.username = '${username}' AND u.password = '${password}'`,
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
                  message: "Login success",
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
  registerUser(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.user_name, u.user_email
          FROM users u
          WHERE u.user_name = '${username}' OR u.user_email = '${email}'`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length > 0) {
                res.status(404).json({
                  error: "USER_ALREADY_EXIST",
                  message: `User already exist`,
                });
                return;
              }
            }
          }
        );
        conn.query(
          `INSERT INTO users (user_name, user_email, password) 
          VALUES ('${username}', '${email}', '${password}')`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              res.json({
                data: rows,
                message: "User has been registered",
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
