const express = require("express");

//controllers
const {
  getAllLikesByPostId,
  createNewLike,
  getAllLikes,likesByPostIdAndUserId
} = require("../controllers/like");

//middlewares
const { authentication } = require("../middleware/authentication");

const likesRouter = express.Router();

likesRouter.post("/:post_id", authentication,likesByPostIdAndUserId, createNewLike);
likesRouter.get(
  "/:post_id",

  getAllLikesByPostId
);
likesRouter.get("/", getAllLikes);

module.exports = likesRouter;
