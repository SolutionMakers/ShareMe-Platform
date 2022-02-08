import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Chat/Chat.css";
import { io } from "socket.io-client";
import axios from "axios";

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

const Chat = () => {
    /********************************************* */
    const state = useSelector((state) => {
      return {
        token: state.loginReducer.token,
        posts: state.postsReducer.posts,
        user_id: state.loginReducer.user_id,
        userName: state.loginReducer.userName,
      };
    });
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState(state.userName);
  const [messageList, setMessageList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const  [room,setRoom] = useState(0);



  /************************************************************** */
  const reciveMessage =()=>{
    socket.on("RECEIVE_MESSAGE", (data) => {
      getAllMessages(room);
    });
  }
  /************************************************************** */

  const joinRoom = () => {
    setLoggedIn(true);
    socket.emit("JOIN_ROOM", room);
  };
  /************************************************************** */
  const sendMessage = () => {
    const messageContent = {
      room,
      content: {
        sender:state.userName,
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);
    setMessage("");
    getAllMessages(room);
  };
  /************************************************************** */
  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.data.success) {
        setAllUsers(res.data.results);
      } else throw Error;
    } catch (err) {
      console.log(err.response.data);
    }
  };
  /*************************************************************** */
  const getAllMessages = async (room)=>{
    const res = await axios.get(`http://localhost:5000/message/${room}`,  {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    if(res.data.success){
  setMessageList(res.data.results)
    }
  }
  /************************************************************ */
const createMessage = async ()=>{
  const res = await axios.post(`http://localhost:5000/message/${room}`,{message},  {
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  })
  if(res.data.success){
sendMessage();
  }
}
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
        setRoom(res.data.results[0]?.id)
        setMessageList([])
        getAllMessages(res.data.results[0].id)
      }
      if (res.data.results?.insertId) {
        setRoom(res.data.results?.insertId)
        console.log(`done to create the room`);
        setMessageList([])
        getAllMessages(res.data.results.insertId)
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*********************************************************** */
    /************************************************************** */
    useEffect(() => {
      joinRoom();
      getAllUsers();
      reciveMessage();
      getAllMessages(room);

    }, []);
  return (
    <>
      <div className="AllUsers">
        {allUsers.map((element, index) => {
          return (
            <div key={index}>
              <img src={element.profileimage} />
              <h1>{element.userName}</h1>
              <button
                onClick={() => {
                  joinRoomData(element.id);
                }}
                className="joinRoom"
              >
                Chat
              </button>
            </div>
          );
        })}
      </div>

      <div className="Chat">
        {loggedIn ? (
          <div>
            <ul>
              {messageList.length? messageList.map((element, index) => {
                return (
                  <li key={index}>
                    <p>
                      {element.userName}: {element.message}
                    </p>
                  </li>
                );
              }):<></>}
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
              onClick={createMessage}
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
                // setUserName(e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Room ID"
              onChange={(e) => {
                setRoomId(e.target.value);
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
