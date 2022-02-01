const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
app.use(cors());

app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", usersRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
