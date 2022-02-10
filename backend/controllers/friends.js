const connection = require("../database/db");

const AddFriend = (req, res) => {
  const { friend } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO friends (user_id,friend) VALUES (?,?);`;
  const data = [user_id, friend];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "friend Added",
      results: results,
    });
  });
};
/*************************************************** */
const getAllFriendsByUserId = (req, res) => {
  //const user_id = req.params.user_id
  const user_id = req.token.userId;
  const query = `SELECT * FROM friends INNER JOIN users ON users.id = friends.friend where user_id = ?`;
  const data = [user_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    if (results.length) {
      res.status(200).json({
        success: true,
        massage: `Success to get all friends for this user ${user_id}`,
        results: results,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `No friends for this user ${user_id}`,
      });
    }
  });
};
/*************************************************************** */

const getAllFriends = (req, res) => {
  const query = `select * from friends where is_deleted = 0`;
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    if (results.length) {
      res.status(200).json({
        success: true,
        massage: `Success to get all the friends`,
        results: results,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `No friends yet`,
      });
    }
  });
};
module.exports = { AddFriend, getAllFriendsByUserId, getAllFriends };
