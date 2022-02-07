const connection = require("../database/db");

const openRoom = (req, res, next) => {
  const user_id = req.token.userId;
  const body = req.body.id;
  const query = `SELECT * FROM rooms where sender_id = ? AND receiver_id = ? OR receiver_id= ? AND sender_id=? `;
  const data = [user_id, body, user_id, body];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (results.length) {
      res.status(200).json({
        success: true,
        massage: `Success to open the room`,
        results: results,
      });
    } else {
      next();
    }
  });
};
const createRoom = (req, res) => {
  const body = req.body.id;
  const sender_id = req.token.userId;
  const query = `INSERT INTO rooms (sender_id,receiver_id) VALUES (?,?);`;
  const data = [sender_id, body];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The room already exists",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Success to create a room",
      results: results,
    });
  });
};
module.exports = {
    openRoom,
    createRoom,
  };