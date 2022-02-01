const connection = require("../database/db");

const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES (?)`;
  const data = [role];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: "Success role created",
      results: results,
    });
  });
};
/*************************************** */
module.exports = {
  createNewRole,
};
