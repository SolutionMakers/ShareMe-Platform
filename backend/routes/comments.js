const express = require("express");

//controllers
const { createNewComment,getAllCommentsById } = require("../controllers/comment");

//middlewares
const {authentication} = require("../middleware/authentication");

const commentsRouter = express.Router();

commentsRouter.post(
  "/posts/:post_id/comments",
  authentication,
  createNewComment
);

commentsRouter.get(
  "/all/:id/comments",

  getAllCommentsById
);


module.exports = commentsRouter;