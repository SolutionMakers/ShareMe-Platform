const connection = require("../database/db");

const createNewPost = (req, res) => {
  const { description,media } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO posts (description,user_id,media) VALUES (?,?,?);`;
  const data = [description, user_id,media];

  connection.query(query, data, (err, results) => {
    if (err) {
    return  res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
   
    res.status(200).json({
      success: true,
      massage: "Post created",
      results: results,
    });
  });
};

module.exports = {
    createNewPost,
};
