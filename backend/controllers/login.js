const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const userName = req.body.userName;

  const query = `SELECT * FROM users WHERE userName=?`;
  const data = [userName];
  connection.query(query, data, (err, results) => {
    if (err) throw err;
    if (results.length) {
      bcrypt.compare(password, results[0].password, (err, response) => {
        if (err) res.json(err);
        if (response) {
          const payload = {
            userId: results[0].id,
            country: results[0].country,
            role: results[0].role_id,
          };
          const options = {
            expiresIn: "24h",
          };
          const secret = process.env.SECRET;

          const token = jwt.sign(payload, secret, options);

          res.status(200).json({
            success: true,
            message: "Valid login credentials",
            token,
            userId: results[0].id,
            imge: results[0].profileimage,
            userName: results[0].userName,
          });
        } else {
          res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
            err,
          });
        }
      });
    } else {
      res
        .status(404)
        .json({ success: false, massege: "The username doesn't exist", err });
    }
  });
};

module.exports = { login };
