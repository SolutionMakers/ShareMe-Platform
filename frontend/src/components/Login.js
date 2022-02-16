import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      imgUser: state.loginReducer.imgUser,
    };
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [signuPMessage, setSignupMessage] = useState("");
  const [modalLogin, setModalLogin] = useState(false);

  const toggleModal = () => {
    setModalLogin(!modalLogin);
  };

  /* ************************* */
  const logInUser = async (e) => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        userName,
        password,
      });
      if (res.data.success) {
        setSignupMessage("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.userId);
        localStorage.setItem("img", res.data.imge);
        localStorage.setItem("userName", res.data.userName);
        dispatch(
          login({
            token: res.data.token,
            user_id: res.data.userId,
            userName: res.data.userName,
          })
        );
        navigate("/home");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      toast.error("Error happened while Login, please try again", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  /* *************************** */
  return (
    <div className="container_for_all">
      <div className="container_login">
        <div className="flex_qout">
        <img className="logo_slogan" src="https://res.cloudinary.com/dvg9eijgb/image/upload/v1645002900/su1xnqw4k9jxcaxmyuwu.png" />
          <div className="slogan"> Welcome to AAB</div>
          <div className="qout">
            {" "}
            Connect with new friends and get to know a new world
          </div>
        </div>
        <div className="Login">
          <div className="all_input_login">
            <div>
              {" "}
              <input
                className="input_login"
                type="email"
                placeholder="username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                className="input_login"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && logInUser();
                }}
              />
            </div>

            <button className="button_login" onClick={logInUser}>
              Login
            </button>
          </div>

          <div className="sperate_style">
            <div className="line_login"></div>
            <button className="craete_new_account" onClick={toggleModal}>
              Craete new account
            </button>
          </div>
        </div>
      </div>

      {modalLogin && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="register">
              <div className="register-content">
                <div className="title_close">
                  <div className="titRegis">Sign Up</div>
                  <BsFillXCircleFill
                    className="icon_close"
                    onClick={toggleModal}
                  />
                </div>
                <div className="gap_inpt_signup">
                  <div className="line_signup"></div>

                  <div>
                    <input //1
                      className="input_signup"
                      type="text"
                      placeholder="userName"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input //2
                      className="input_signup"
                      type="email"
                      placeholder="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input //3
                      className="input_signup"
                      type="date"
                      placeholder="date of birth"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>

                  <div className="border_bottom">
                    <input //4
                      className="input_signup"
                      type="text"
                      placeholder="gender"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                  </div>

                  <div className="border_bottom">
                    <input //5
                      className="input_signup"
                      type="text"
                      placeholder="country"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input //6
                      className="input_signup"
                      type="password"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <button
                  className="buttonRegs"
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
                        toast.success(
                          " The user has been created successfully",
                          {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                        e.target.style.background =
                          "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                        e.target.style.color = "black";
                        toggleModal();
                      })
                      .catch((err) => {
                        toast.error(
                          " Error happened while register, please try again",
                          {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          }
                        );
                        e.target.style.background =
                          "linear-gradient(-45deg,#f7797d,#f7797d)";
                        e.target.style.color = "black";
                      });
                  }}
                >
                  sing up
                </button>

                <div className="sing_up_message">{signuPMessage}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
