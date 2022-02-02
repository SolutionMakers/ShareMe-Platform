import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/login";

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [signuPMessage, setSignupMessage] = useState("");

  /* ************************* */
  const logInUser = async (e) => {
    // e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        userName,
        password,
      });
      if (res.data.success) {
        setSignupMessage ("");
        localStorage.setItem("token", res.data.token);
        dispatch(login(res.data.token));
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setSignupMessage(error.response.data.message);
      }
      setSignupMessage("Error happened while Login, please try again");
    }
  };
  /* *************************** */
  return (
    <div className="all_start_page">
      <div className="login">
        <div>Login</div>
        <input
          type="text"
          placeholder="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={logInUser}
        >
          Login
        </button>
      </div>
      <div className="Sign_up_box">
      <div>signUp</div>
        <input
          className="user_name"
          type="text"
          placeholder="userName"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          className="email"
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="date_birth"
          type="text"
          placeholder="date of birth"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          className="gender"
          type="text"
          placeholder="gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <input
          className="country"
          type="text"
          placeholder="country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <input
          className="password"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="Sign_up"
          onClick={(e) => {
            axios
              .post("http://localhost:5000/users/", {
                userName: userName,
                email: email,
                dob: date,
                gender: gender,
                country: country,
                password: password,
              })
              .then((result) => {
                console.log(result.data);

                e.target.style.background =
                  "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                e.target.style.color = "black";

                setSignupMessage("The user has been created successfully");
              })
              .catch((err) => {
                e.target.style.background =
                  "linear-gradient(-45deg,#f7797d,#f7797d)";
                e.target.style.color = "black";
                setSignupMessage(
                  "Error happened while register, please try again"
                );
              });
          }}
        >
          sing up
        </button>
        <div className="sing_up_message">{signuPMessage}</div>
      </div>
    </div>
  );
};

export default Login;
