const connection = require("../database/db");

const bcrypt = require("bcrypt");
const salt = 10;

const createNewUser = async (req, res) => {
  const {
    userName,
    email,
    password,
    dob,
    country,
    profileimage,
    gender,
    role_id,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users (userName, email, password, dob, email, password, country, profileimage, gender, role_id) VALUES (?,?,?,?,?,?,?,?)`;
  const data = [
    userName,
    email,
    encryptedPassword,
    country,
    `DATE ${dob}`,
    country,
    profileimage,
    gender,
    role_id,
  ];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Success user Added",
      results: results,
    });
  });
};

/************************************* */
module.exports = {
  createNewUser,
};
