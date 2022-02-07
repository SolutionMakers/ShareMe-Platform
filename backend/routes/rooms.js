const express = require("express");


const roomsRouter = express.Router();

const { openRoom ,createRoom} = require("../controllers/rooms");
const {authentication} = require("../middleware/authentication");

roomsRouter.post("/", authentication, openRoom, createRoom);

module.exports = roomsRouter;
