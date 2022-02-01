const connection = require("../database/db");

const createNewComment = (req, res) => {
  const postId = req.params.post_id;
  const commenter_id = req.token.userId;
  const { comment } = req.body;

  const query = `INSERT INTO comments (comment, commenter_id, post_id) VALUES (?,?,?)`;
  const data = [comment, commenter_id, postId];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      results: results,
    });
  });
};

const getAllCommentsById = (req, res) => {
  const post_id = req.params.id;

  const query = `SELECT * FROM comments INNER JOIN users ON users.id=comments.commenter_id WHERE comments.post_id=?;`;
  const data = [post_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "The comments Not Found",
        err: err,
      });
    }
 
    res.status(200).json({
      success: true,
      massage: `All the comments for the Post: ${post_id}`,
      results: results,
    });
  });
};

module.exports = {
  createNewComment,
  getAllCommentsById
};