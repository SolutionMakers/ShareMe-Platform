const express = require("express");

const { createNewPost, getAllPosts } = require("../controllers/posts");
const { authentication } = require("../middleware/authentication");

const postsRouter = express.Router();

postsRouter.post("/", authentication, createNewPost);
postsRouter.get("/", getAllPosts);

module.exports = postsRouter;
