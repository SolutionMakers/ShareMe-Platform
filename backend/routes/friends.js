const express = require("express");

const {
  AddFriend,
  getAllFriendsByUserId,
  getAllFriends,
} = require("../controllers/friends");
const { authentication } = require("../middleware/authentication");
const friendsRouter = express.Router();

friendsRouter.post("/", authentication, AddFriend);
friendsRouter.get("/user", authentication, getAllFriendsByUserId);
friendsRouter.get("/all", getAllFriends);

module.exports = friendsRouter;
