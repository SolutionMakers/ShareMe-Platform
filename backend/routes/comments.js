const express = require("express");

//controllers
const { createNewComment } = require("../controllers/comment");

//middlewares
const {authentication} = require("../middleware/authentication");

const commentsRouter = express.Router();

commentsRouter.post(
  "/posts/:post_id/comments",
  authentication,
  createNewComment
);

module.exports = commentsRouter;