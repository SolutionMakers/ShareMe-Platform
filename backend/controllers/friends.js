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

module.exports = { AddFriend };
