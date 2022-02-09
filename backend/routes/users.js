const express = require("express");

const {
  createNewUser,
  updateProfilePhoto,
  updateProfileCover,
  getInfoUser,
  getAllUsers,
} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/", createNewUser);
usersRouter.put("/image/:id", updateProfilePhoto);
usersRouter.put("/cover/:id", updateProfileCover);
usersRouter.get("/:id/info", getInfoUser);
usersRouter.get("/", getAllUsers);
module.exports = usersRouter;
