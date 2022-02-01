const express = require("express");

const { createNewUser ,updateProfilePhoto} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewUser);
usersRouter.put("/image/:id",updateProfilePhoto)

module.exports = usersRouter;
