const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
app.use(cors());
app.use(express.json());
const PORT = 5000;
/*************************************** */
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/post");
const commentsRouter = require("./routes/comments");
const rolesRouter = require("./routes/roles");
const likesRouter=require ("./routes/like")
/*************************************** */
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/", commentsRouter);
app.use("/roles", rolesRouter);
app.use("/like",likesRouter)
/*************************************** */
app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
