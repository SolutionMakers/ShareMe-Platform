const express = require("express");



const { createNewPost, getAllPosts,getPostsByUserId } = require("../controllers/posts");
const { authentication } = require("../middleware/authentication");



const postsRouter = express.Router();

postsRouter.post("/", authentication, createNewPost);
postsRouter.get("/:user_id",getPostsByUserId)
postsRouter.get("/", getAllPosts);

module.exports = postsRouter;

