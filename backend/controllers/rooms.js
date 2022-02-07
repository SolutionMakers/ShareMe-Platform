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

module.exports = {
    openRoom,
  };