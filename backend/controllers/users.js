const connection = require("../database/db");

const bcrypt = require("bcrypt");
const salt = 10;

const createNewUser = async (req, res) => {
  const { userName, email, password, dob, country, profileimage, gender } =
    req.body;

  const encryptedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users (userName, email, password, dob, country, profileimage, gender) VALUES ('${userName}', '${email}', '${encryptedPassword}', DATE '${dob}', '${country}', '${profileimage}', '${gender}')`;

  connection.query(query, (err, results) => {
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

const updateProfilePhoto = (req, res) => {
  const  profileimage = req.body.profileimage;
  const id = req.params.id;

  const query = `UPDATE users SET profileimage=? WHERE id=?;`;

  const data = [profileimage, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      res.status(404).json({
        success: false,
        massage: `The User : ${id} is not found`,
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: `profile image updated`,
      results: results,
    });
  });
};
/************************************* */

module.exports = {
  createNewUser,updateProfilePhoto
};
