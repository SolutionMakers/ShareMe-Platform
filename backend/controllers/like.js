const connection = require("../database/db");


const createNewLike = (req, res) => {
  const postId = req.params.post_id;
  const user_id = req.token.userId;

  const query = `INSERT INTO likes (user_id, post_id) VALUES (?,?)`;
  const data = [user_id, postId];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new like",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The like has been created success ",
      results: results,
    });
  });
};

const getAllLikesByPostId = (req, res) => {
  const post_id = req.params.post_id;

  const query = `SELECT * FROM likes INNER JOIN users ON users.id=likes.user_id WHERE likes.post_id=?;`;
  const data = [post_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "The likes Not Found",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `All the likes for the Post: ${post_id}`,
      results: results,
    });
  });
};

const getAllLikes = (req, res) => {
  const query = `SELECT * FROM likes INNER JOIN users ON users.id=likes.user_id`;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "Likes Not Found",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `All the likes`,
      results: results,
    });
  });
};
const likesByPostIdAndUserId = (req, res,next) => {
  const post_id = req.params.post_id;
  const user_id=req.token.userId;

  const query = `SELECT * FROM likes WHERE post_id=? AND user_id=?;`;
  const data = [post_id,user_id];

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
        success: false,
        massage: `cant put Like again`,
        results: results,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createNewLike,
  getAllLikesByPostId,
  getAllLikes,
  likesByPostIdAndUserId
};