const connection = require("../database/db");

const createNewPost = (req, res) => {
  const { description, media } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO posts (description,user_id,media) VALUES (?,?,?);`;
  const data = [description, user_id, media];

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
      massage: "Post created",
      results: results,
    });
  });
};

const getPostById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT description, userName,media,user_id FROM users INNER JOIN posts ON users.id=posts.user_id WHERE posts.id=?
  AND posts.is_deleted=0;`;
  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.length) {
      res.status(404).json({
        success: false,
        massage: "The posts Not found",
      });
    }

    res.status(200).json({
      success: true,
      massage: `The posts ${id}`,
      results: results,
    });
  });
};

module.exports = {
  createNewPost,
  getPostById,
};
