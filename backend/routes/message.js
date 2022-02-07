const express = require("express");

const messageRouter = express.Router();

const {
  createNewMessage,
  getAllMessageByRoomId,
} = require("../controllers/message");
const { authentication } = require("../middleware/authentication");

messageRouter.post("/:room_id", authentication, createNewMessage);
messageRouter.get("/:room_id", authentication, getAllMessageByRoomId);

module.exports = messageRouter;
