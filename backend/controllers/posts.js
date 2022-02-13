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

/* **************************************** */
const getPostsbyUserId = (req, res) => {
  const user_id = req.params.user_id;

  const query = `SELECT posts.id, description,created_at, userName,media,profileimage,user_id FROM posts INNER JOIN users ON users.id=posts.user_id WHERE posts.user_id=? AND posts.is_deleted=0 ORDER BY posts.id DESC;;`;
  const data = [user_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "The user Not Found",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `All the posts for the user: ${user_id}`,
      results: results,
    });
  });
};

/****************************************/
const getAllPosts = (req, res) => {
  const query = `SELECT posts.id, description, userName,media,profileimage,created_at,user_id FROM users INNER JOIN posts ON users.id=posts.user_id WHERE posts.is_deleted=0 ORDER BY posts.id DESC;
   `;

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the posts",
      results: result,
    });
  });
};
/********************************** */
const getPostById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT description, userName,media,profileimage, created_at,user_id,posts.is_deleted FROM users INNER JOIN posts ON users.id=posts.user_id WHERE posts.id=?
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
      return res.status(404).json({
        success: false,
        massage: "The post Not found",
      });
    }

    return res.status(200).json({
      success: true,
      massage: `The post ${id}`,
      results: results,
    });
  });
};

const updatePostById = (req, res) => {
  const { description } = req.body;
  const id = req.params.id;

  const query = `UPDATE posts SET description=? WHERE id=?;`;

  const data = [description, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      res.status(404).json({
        success: false,
        massage: `The Post: ${id} is not found`,
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(201).json({
      success: true,
      massage: `Post updated`,
      results: results,
    });
  });
};
/************************************* */

const deletePostById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE Posts SET is_deleted=1 WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!results.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The Post: ${id} is not found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete Post with id: ${id}`,
      results: results,
    });
  });
};

const getAllPostByfiendId = (req, res) => {
  const query = `SELECT posts.id, description,media,profileimage,userName,posts.user_id, created_at FROM posts INNER JOIN friends ON friends.friend=posts.user_id INNER JOIN users ON users.id=posts.user_id WHERE friends.user_id=? AND posts.is_deleted=0 AND friends.is_deleted=0 UNION
  SELECT posts.id, description,media,profileimage,userName,posts.user_id, created_at FROM posts INNER JOIN users ON users.id=posts.user_id WHERE posts.user_id=? AND posts.is_deleted=0 `;

  const data = [req.token.userId, req.token.userId];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "The friend Not Found",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `All the posts Show to user: ${req.token.userId}`,
      results: results,
    });
  });
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPostsbyUserId,
  getPostById,
  updatePostById,
  deletePostById,
  getAllPostByfiendId,
};
