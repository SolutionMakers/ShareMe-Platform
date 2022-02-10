
const express = require("express");



const { createNewPost, getAllPosts,getPostsbyUserId,getPostById,deletePostById,updatePostById,getAllPostByfiendId} = require("../controllers/posts");

const { authentication } = require("../middleware/authentication");

const postsRouter = express.Router();

postsRouter.post("/", authentication, createNewPost);
postsRouter.get("/:user_id", getPostsbyUserId);
postsRouter.get("/friends/posts",authentication,getAllPostByfiendId);
postsRouter.get("/", getAllPosts);
postsRouter.get("/:id/post", getPostById);

postsRouter.put("/:id/post", updatePostById);

postsRouter.delete("/:id", deletePostById);


module.exports = postsRouter;

