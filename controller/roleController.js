const connection = require("../config/db");
let mysql = require("mysql");
let pool = mysql.createPool(connection);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllRole(req, res) {
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query("SELECT r.* FROM roles r", (error, rows) => {
          if (error) {
            res.status(404).json({
              error: "ITEM_NOT_FOUND",
              message: `Role was not found`,
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

  getRoleById(req, res) {
    let search = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `SELECT r.* FROM roles r 
          WHERE 
          r.role_id = ${search}`,
          (error, rows) => {
            if (error) {
              req.status(404).json({
                error: "ERROR",
                message: `There's something wrong with the Server`,
              });
            } else {
              if (rows.length === 0) {
                res.status(404).json({
                  error: "ROLE_NOT_FOUND",
                  message: `Role was not found`,
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

  addRole(req, res) {
    let data = {
      role_name: req.body.role_name,
    };
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `INSERT INTO roles (role_name) VALUES ?`,
          data,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Insert Role Failed`,
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

  updateRole(req, res) {
    let data = {
      role_name: req.body.role_name,
    };
    let id = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(
          `UPDATE roles SET ? WHERE role_id = ${id}`,
          data,
          (error, rows) => {
            if (error) {
              res.status(404).json({
                error: "ERROR",
                message: `Update Role Failed`,
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

  deleteRole(req, res) {
    let id = req.params.id;
    try {
      pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query(`DELETE FROM roles WHERE role_id = ${id}`, (error, rows) => {
          if (error) {
            res.status(404).json({
              error: "ERROR",
              message: `Delete Role Failed`,
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
};
