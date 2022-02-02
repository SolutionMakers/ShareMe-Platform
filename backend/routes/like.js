const express = require("express");

//controllers
const { getAllLikesByPostId,createNewLike} = require("../controllers/like");

//middlewares
const {authentication} = require("../middleware/authentication");

const likesRouter = express.Router();

likesRouter.post(
  "/:post_id",
  authentication,
  createNewLike
);

likesRouter.get(
  "/:post_id",

  getAllLikesByPostId
);


module.exports =likesRouter;