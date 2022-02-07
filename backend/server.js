const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
app.use(cors());
app.use(express.json());
const socket = require("socket.io");
const PORT = 5000;
/*************************************** */
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/post");
const commentsRouter = require("./routes/comments");
const rolesRouter = require("./routes/roles");
const likesRouter = require("./routes/like");
const roomsRouter =require('./routes/rooms')
const messageRouter = require ('./routes/message')
/*************************************** */
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/", commentsRouter);
app.use("/roles", rolesRouter);
app.use("/like", likesRouter);
app.use("/rooms", roomsRouter);
app.use("/message",messageRouter)

/*************************************** */
const server = app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
/******************************************** */
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  socket.on("JOIN_ROOM", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("SEND_MESSAGE", (data) => {
    console.log(data);
    socket.to(data.room).emit("RECEIVE_MESSAGE", data.content);
  });

  socket.on("disconnect", () => {
    console.log("\nuser left ...");
  });
});
