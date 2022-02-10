const express = require("express");

const { AddFriend, getAllFriendsByUserId } = require("../controllers/friends");
const { authentication } = require("../middleware/authentication");
const friendsRouter = express.Router();

friendsRouter.post("/", authentication, AddFriend);
friendsRouter.get("/user", authentication, getAllFriendsByUserId);

module.exports = friendsRouter;
