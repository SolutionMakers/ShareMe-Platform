const connection = require("../database/db");
const bcrypt = require("bcrypt");
const salt = 10;
/********************************************************************************************* */
const createNewUser = async (req, res) => {
  const {
    userName,
    email,
    password,
    dob,
    country,
    profileimage,
    profilecover,
    gender,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users (userName, email, password, dob, country, profileimage,profilecover, gender) VALUES ('${userName}', '${email}', '${encryptedPassword}', DATE '${dob}', '${country}', '${profileimage}', '${profilecover}', '${gender}')`;

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

/********************************************************************************************* */
const updateProfilePhoto = (req, res) => {
  const profileimage = req.body.profileimage;
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
    res.status(201).json({
      success: true,
      massage: `profile image updated`,
      results: results,
    });
  });
};
/******************************************************************************** */
const updateProfileCover = (req, res) => {
  const profileCover = req.body.profileCover;
  const id = req.params.id;
  const query = `UPDATE users SET profilecover=? WHERE id=?;`;

  const data = [profileCover, id];

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
    res.status(201).json({
      success: true,
      massage: `profile cover updated successfully`,
      results: results,
    });
  });
};
/********************************************************************************* */
const getInfoUser = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id=? And is_deleted=0;`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }

    if (result.length) {
      return res.status(200).json({
        success: true,
        massage: `All info for users==>${userId} `,
        Info: result,
      });
    }

    return res.status(404).json({
      success: false,
      massage: `Dose Not Find User ==> ${userId} `,
    });
  });
};
/********************************************************************************************* */
const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users WHERE is_deleted=0`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: "All the users",
        results: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: "No users Found",
      });
    }
  });
};
/********************************************************************************************* */
module.exports = {
  createNewUser,
  updateProfilePhoto,
  updateProfileCover,
  getInfoUser,
  getAllUsers,
};
