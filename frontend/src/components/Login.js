import React from "react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [signuPMessage, setSignupMessage] = useState("");
  return (
    <div>
      <div className="Sign_up">
        <input
          className="user_name"
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          className="email"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="date_birth"
          type="text"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          className="gender"
          type="text"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <input
          className="country"
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <input
          className="password"
          type="text"
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
