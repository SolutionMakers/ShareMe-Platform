const express = require("express");

const {
  AddFriend,
  getAllFriendsByUserId,
  getAllFriends,
  removeFriend,
  getSuggestionFriends
} = require("../controllers/friends");
const { authentication } = require("../middleware/authentication");
const friendsRouter = express.Router();

friendsRouter.post("/", authentication, AddFriend);
friendsRouter.get("/user/:id", getAllFriendsByUserId);
friendsRouter.get("/all", getAllFriends);
friendsRouter.put("/remove/:id", authentication, removeFriend);
friendsRouter.get("/suggestion", authentication, getSuggestionFriends);

module.exports = friendsRouter;
