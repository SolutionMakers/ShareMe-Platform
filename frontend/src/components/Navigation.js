import { logout } from "../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import noAvatar from "../images/noAvatar.png";
import { FaFacebookMessenger } from "react-icons/fa";
const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgUser = localStorage.getItem("img");
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      user_id: state.loginReducer.user_id,
      userName: state.loginReducer.userName,
    };
  });
  /***************************************************************************************** */

  const [allUsers, setAllUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [startType, setStartType] = useState(false);
  /***************************************************************************************** */

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
  const filteredSearch = (str) => {
    const result = allUsers.filter((element, i) => {
      return element.userName.includes(str);
    });
    setSearchResult(result);
  };
  console.log(searchResult);
  /***************************************************************************************** */
  useEffect(() => {
    getAllUsers();
  }, []);
  /***************************************************************************************** */

  return (
    <div className="nav">
      <div className="logo_search">
        <div className="logo"></div>
        <div className="search">
          <input
            //className="input_search"
            type="text"
            id="myInput"
            placeholder="Find a friend"
            onChange={(e) => {
              filteredSearch(e.target.value);
              if (e.target.value !== "") {
                setStartType(true);
              } else {
                setStartType(false);
              }
            }}
          />

          {startType ? (
            searchResult.length ? (
              searchResult.map((user) => {
                return (
                  <ul id="myUL">
                    <li>
                      {/* <img src={user.profileimage} /> */}
                      <a>{user.userName}</a>
                    </li>
                  </ul>
                );
              })
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </div>

      <FaFacebookMessenger
        className="chat"
        onClick={() => {
          navigate(`/chat`);
        }}
      />
      <div className="home_nav">
        <Link to="/home">
          <AiFillHome className="home_icon" />
        </Link>
      </div>

      <div
        className="user_nav"
        onClick={() => {
          navigate(`/profile/${state.user_id}`);
        }}
      >
        <img
          className="img_user_nav"
          src={imgUser !== "undefined" ? imgUser : noAvatar}
        />
        <div className="userName_font_nav">{state.userName}</div>
      </div>
      <div className="style_logOut">
        <button
          className="LogOut"
          onClick={() => {
            dispatch(logout());
            localStorage.clear();
            navigate("/");
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navigation;
