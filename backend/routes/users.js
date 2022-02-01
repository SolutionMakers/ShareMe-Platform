const express = require("express");

const { createNewUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewUser);

module.exports = usersRouter;
