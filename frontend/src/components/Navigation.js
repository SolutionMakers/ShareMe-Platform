import { logout } from "../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Navigation = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      user_id: state.loginReducer.user_id,
    };
  });
  /***************************************************************************************** */

  const [allUsers, setAllUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  /*********************************************************** */
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
    console.log(result);
  };
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
            className="input_search"
            type="text"
            placeholder="Search AAB"
            onChange={(e) => {
              filteredSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="home_nav">
        <Link to="/home">
          <AiFillHome className="home_icon" />
        </Link>
      </div>

      <div className="empty"></div>
      <div
        className="my_profile"
        onClick={() => {
          navigate(`/profile/${state.user_id}`);
        }}
      >
        My profile
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
