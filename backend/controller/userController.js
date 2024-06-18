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
          FROM users u JOIN roles r ON r.role_id = u.role_id
          ORDER BY u.creation_time DESC`,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ITEM_NOT_FOUND",
                message: `User was not found`,
              });
            } else {
              res.status(200).json({
                data: rows,
                message: "Users fetched successfully",
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
      console.error("Error: ", errors);
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
          WHERE u.user_id = ${search}
          ORDER BY u.creation_time DESC`,
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
                res.status(200).json({
                  data: rows,
                  message: "User By Id fetched successfully",
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
      console.error("Error: ", errors);
    }
  },

  getUserByQuery(req, res) {
    let query = typeof req.body.search === "undefined" ? "" : req.body.search;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT u.*, r.role_name 
          FROM users u JOIN roles r ON u.role_id = r.role_id 
          WHERE
          u.user_name LIKE '%${query}%' OR
          u.user_email LIKE '%${query}%' OR
          r.role_name LIKE '%${query}%'
          ORDER BY u.creation_time DESC`,
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
                res.status(200).json({
                  data: rows,
                  message: "User By Query fetched successfully",
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
      console.error("Error: ", errors);
    }
  },

  addUser(req, res) {
    let user_name = req.body.user_name;
    let user_email = req.body.user_email;
    let password = req.body.password;
    let image_url =
      typeof req.body.image_url === "undefined" || req.body.image_url === ""
        ? "nophoto.jpg"
        : req.body.image_url;
    let role_id =
      typeof req.body.role_id === "undefined" || req.body.role_id === ""
        ? 3
        : req.body.role_id;

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
    let user_id = parseInt(req.params.id);
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
                password = "'" + rows[0].password + "'";
              } else {
                password = `SHA1(${password})`;
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

              console.log(
                user_name,
                user_email,
                password,
                image_url,
                archived,
                role_id,
                user_id
              );

              conn.query(
                `UPDATE users u
                SET u.user_name = '${user_name}', u.user_email = '${user_email}', u.password = ${password}, u.image_url = '${image_url}', u.archived = ${archived}, u.update_time = NOW() , u.role_id = ${role_id}
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
        conn.release();
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
        conn.release();
      });
    } catch (errors) {
      res
        .status(500)
        .json({ error: "INTERNAL_SERVER_ERROR", messgae: error.message });
    }
  },
};
