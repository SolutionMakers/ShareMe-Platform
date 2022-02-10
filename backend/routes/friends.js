const express = require("express");

const { AddFriend } = require("../controllers/friends");
const { authentication } = require("../middleware/authentication");
const friendsRouter = express.Router();

friendsRouter.post("/", authentication, AddFriend);

module.exports = friendsRouter;
