const express = require("express");

const {
  AddFriend,
  getAllFriendsByUserId,
  getAllFriends,
  removeFriend,
} = require("../controllers/friends");
const { authentication } = require("../middleware/authentication");
const friendsRouter = express.Router();

friendsRouter.post("/", authentication, AddFriend);
friendsRouter.get("/user", authentication, getAllFriendsByUserId);
friendsRouter.get("/all", getAllFriends);
friendsRouter.put("/remove/:id", authentication, removeFriend);

module.exports = friendsRouter;
