import React from "react";
import "../Chat/Chat.css";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

const Chat = () => {
  return (
    <div>
      <h1>This is Chat Section</h1>
    </div>
  );
};

export default Chat;
