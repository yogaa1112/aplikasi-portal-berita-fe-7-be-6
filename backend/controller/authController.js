const { check } = require("express-validator");
const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  loginUser(req, res) {
    let user_email = req.body.user_email;
    let password = req.body.password;

    if (!user_email || !password)
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Email and Password is required",
      });

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.user_name 
          FROM users u
          WHERE 
          u.user_email = '${user_email}' AND u.password = SHA1('${password}')`,
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
                  message: `Email or Password is Incorrect`,
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
    let user_name = req.body.user_name;
    let user_email = req.body.user_email;
    let password = req.body.password;

    if (!user_name || !user_email || !password)
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Name, Email and Password is required",
      });

    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.user_email
          FROM users u
          WHERE u.user_email = '${user_email}'`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length > 0) {
                res.status(404).json({
                  error: "EMAIL_EXIST",
                  message: `Email already exist`,
                });
              } else {
                conn.query(
                  `INSERT INTO users (user_name, user_email, password)
                  VALUES ('${user_name}', '${user_email}', SHA1('${password}'))`,
                  (error, rows) => {
                    if (error) {
                      req.status(404).json({
                        error: "ERROR",
                        message: `There's something wrong with the Server`,
                      });
                    } else {
                      res.json({
                        message: "Register success",
                      });
                    }
                  }
                );
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

  logoutUser(req, res) {
    res.json({
      message: "Logout success",
    });
  },
};
