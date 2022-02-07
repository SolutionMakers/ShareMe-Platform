const express = require("express");


const messageRouter = express.Router();

const {createNewMessage } = require("../controllers/message");
const {authentication} = require("../middleware/authentication");

messageRouter.post("/:room_id", authentication, createNewMessage );

module.exports = messageRouter;