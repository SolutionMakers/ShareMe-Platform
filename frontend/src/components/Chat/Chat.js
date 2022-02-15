import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../Chat/Chat.css";
import { io } from "socket.io-client";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import noAvatar from "../../images/noAvatar.png";
const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

const Chat = () => {
  /********************************************* */
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
      userName: state.loginReducer.userName,
    };
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [letsStart, setLetsStart] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [room, setRoom] = useState(0);

  /************************************************************** */
  const reciveMessage = () => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      getAllMessages(room);
    });
  };
  /************************************************************** */

  const joinRoom = () => {
    setLoggedIn(true);
    socket.emit("JOIN_ROOM", room);
  };
  /************************************************************** */
  const sendMessage = () => {
    if (message !== "") {
      const messageContent = {
        room,
        content: {
          sender: state.userName,
          message: message,
        },
      };
      socket.emit("SEND_MESSAGE", messageContent);
      setMessage("");
      getAllMessages(room);
    }
  };
  /************************************************************** */
  const getAllFriendsByUserId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/friends/user/${state.user_id}`
      );
      if (res.data.success) {
        setAllFriends(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*************************************************************** */
  const getAllMessages = async (room) => {
    const res = await axios.get(`http://localhost:5000/message/${room}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    if (res.data.success) {
      setMessageList(res.data.results);
    }
  };
  /************************************************************ */
  const createMessage = async () => {
    if (message !== "") {
      const res = await axios.post(
        `http://localhost:5000/message/${room}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        sendMessage();
        setMessage("");
        setLetsStart(true);
      }
    }
  };
  /************************************************************ */
  const joinRoomData = async (receiver_id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/rooms",
        {
          id: receiver_id,
        },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      );
      // use the optional chaining to prevent the error when it access on the id and insertId
      if (res.data.results[0]?.id) {
        console.log(`done to open the room`);
        setRoom(res.data.results[0]?.id);
        setMessageList([]);
        getAllMessages(res.data.results[0].id);
      }
      if (res.data.results?.insertId) {
        setRoom(res.data.results?.insertId);
        console.log(`done to create the room`);
        setMessageList([]);
        getAllMessages(res.data.results.insertId);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /************************************************************** */
  useEffect(() => {
    joinRoom();
    getAllFriendsByUserId();
    reciveMessage();
  }, [messageList]);
  /************************* */
  return (
    <>
      <div className="All_chat">
        <div className="left_side_chat">
          <h3 className="followr_chat">Followers: {allFriends.length}</h3>
          <div className="border_line"></div>

          {allFriends.length ? (
            allFriends.map((element, index) => {
              return (
                <div key={index} className="users_chat">
                  <div className="name_img">
                    <img
                      src={
                        element.profileimage !== "undefined"
                          ? element.profileimage
                          : noAvatar
                      }
                      className="img_user_chat"
                      onClick={() => {
                        joinRoomData(element.id);
                        setLetsStart(true);
                      }}
                    />
                    <div
                      onClick={() => {
                        joinRoomData(element.id);
                        setLetsStart(true);
                      }}
                    >
                      {element.userName}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>

        <div className="mid_side_chat">
          {loggedIn ? (
            <>
              {letsStart ? (
                <div className="chat_page">
                  <ScrollToBottom className="message-container">
                    {messageList.length ? (
                      messageList.map((element, index) => {
                        return (
                          <div key={index} className="chat_rod">
                            <div className="words_chat">
                              <img
                                className="img_user_chat"
                                src={
                                  element.profileimage !== "undefined"
                                    ? element.profileimage
                                    : noAvatar
                                }
                              />{" "}
                              <div className="message">{element.message}</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </ScrollToBottom>
                </div>
              ) : (
                <div className="start_chat">Let's Start conversation</div>
              )}
            </>
          ) : (
            <></>
          )}
          <div className="input_and_send">
            <textarea
              className="textarea_chat"
              rows="1"
              placeholder="Send Chat"
              spellCheck="false"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && createMessage();
              }}
            ></textarea>

            <div
              className="add-button"
              onClick={() => {
                createMessage();
              }}
            >
              <div className="button-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
