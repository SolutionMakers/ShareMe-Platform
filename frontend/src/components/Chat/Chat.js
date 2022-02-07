import React, { useState, useEffect } from "react";
import "../Chat/Chat.css";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

const Chat = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const joinRoom = () => {
    setLoggedIn(true);
    socket.emit("JOIN_ROOM", room);
  };

  const sendMessage = () => {
    const messageContent = {
      room,
      content: {
        sender: userName,
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <>
      <div className="Chat">
        {loggedIn ? (
          <div>
            <ul>
              {messageList.map((element, index) => {
                console.log(element);
                return (
                  <li key={index}>
                    <p>
                      {element.sender}: {element.message}
                    </p>
                  </li>
                );
              })}
            </ul>
            <input
              style={{ width: "450px" }}
              type={"text"}
              placeholder="Message ..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              onClick={sendMessage}
              style={{ backgroundColor: "#79b893" }}
            >
              send
            </button>
          </div>
        ) : (
          <div>
            <input
              type={"text"}
              placeholder="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Room ID"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button onClick={joinRoom}>Enter Room</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
