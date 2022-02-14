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
  const user_id = req.params.id;
  //const user_id = req.token.userId;
  const query = `SELECT * FROM friends INNER JOIN users ON users.id = friends.friend where user_id = ? AND friends.is_deleted= 0`;
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
      res.status(200).json({
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
      res.status(200).json({
        success: false,
        massage: `No friends yet`,
      });
    }
  });
};
/******************************************************* */
const removeFriend = (req, res) => {
  // we will get this friend_id from the profile page from the link (params)
  const user_id = req.token.userId;
  const friend_id = req.params.id;
  const query = `UPDATE friends SET is_deleted=1 WHERE user_id=? AND friend=?;`;
  const data = [user_id, friend_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to remove the friend with id: ${friend_id}`,
      results: results,
    });
  });
};

const getSuggestionFriends = (req, res) => {
  const user_id = req.token.userId;
  const query = `SELECT * FROM users INNER JOIN friends ON users.id = friends.friend where user_id <> ?`;
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
        massage: `Success to get all suggestion friends for this user ${user_id}`,
        results: results,
      });
    } else {
      res.status(200).json({
        success: false,
        massage: `No suggestion friends for this user ${user_id}`,
      });
    }
  });
};

module.exports = {
  AddFriend,
  getAllFriendsByUserId,
  getAllFriends,
  removeFriend,
  getSuggestionFriends
};
