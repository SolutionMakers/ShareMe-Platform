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

/* **************************************** */ 
const getPostsbyUserId = (req, res) => {
  const user_id = req.params.user_id;

  const query = `SELECT * FROM posts WHERE user_id=? AND is_deleted=0;`;
  const data = [user_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "The user Not Found",
        err: err,
      });
    }

    // result are the data returned by mysql server
    console.log(results)
    res.status(200).json({
      success: true,
      massage: `All the posts for the user: ${user_id}`,
      results: results,
    });
  });
};
module.exports = {
    createNewPost,getPostsbyUserId,
};
