const express = require("express");

const { createNewPost } = require("../controllers/posts");
const {authentication} = require("../middleware/authentication");

const postsRouter = express.Router();

postsRouter.post("/",authentication,createNewPost);

module.exports = postsRouter;