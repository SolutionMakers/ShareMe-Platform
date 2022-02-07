const connection = require("../database/db");

const createNewMessage
= (req, res) => {
  const message = req.body.message;
  const sender_id = req.token.userId;
  const room_id = req.params.room_id;

  const query = `INSERT INTO message (sender_id,message,room_id) VALUES (?,?,?);`;
  const data = [sender_id,message,room_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "failed to crreatte message",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "Success to create a message",
      results: results,
    });
  });
};
module.exports = {
createNewMessage
  };