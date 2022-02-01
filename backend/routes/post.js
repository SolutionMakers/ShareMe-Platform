const express = require("express");

const { createNewPost,getPostById } = require("../controllers/posts");
const {authentication} = require("../middleware/authentication");

const postsRouter = express.Router();

postsRouter.post("/",authentication,createNewPost);
postsRouter.get("/:id/post",getPostById);

module.exports = postsRouter;