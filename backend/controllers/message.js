const connection = require("../database/db");

const createNewMessage = (req, res) => {
  const message = req.body.message;
  const sender_id = req.token.userId;
  const room_id = req.params.room_id;

  const query = `INSERT INTO message (sender_id,message,room_id) VALUES (?,?,?);`;
  const data = [sender_id, message, room_id];
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
const getAllMessageByRoomId = (req, res, next) => {
  const room_id = req.params.room_id;

  const query = `SELECT message.id,message,profileimage,userName,room_id FROM message INNER JOIN users ON users.id=sender_id WHERE room_id=?  ORDER BY message.id ASC `;
  const data = [room_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (results.length) {
       return res.status(201).json({
        success: true,
        massage: `all the message of room ${room_id}`,
        results: results,
      });
    } else {
     return  res.status(200).json({
        success: false,
        massage: `No message in this room`,
      });
    }
  });
};
module.exports = {
  createNewMessage,
  getAllMessageByRoomId,
};
