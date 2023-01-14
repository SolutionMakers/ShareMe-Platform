import {logout} from "../reducers/login";
import {useDispatch, useSelector} from "react-redux";
import {AiFillHome} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import noAvatar from "../images/noAvatar.png";
import {FaFacebookMessenger} from "react-icons/fa";
import {BsSearch} from "react-icons/bs";
import {MdOutlineLogout} from "react-icons/md";

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
  const [typing, setTyping] = useState("");
  const [modal, setModal] = useState(false);
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
    const result = allUsers.filter((element) => {
      return element.userName.includes(str);
    });
    setSearchResult(result);
  };
  /***************************************************************** */

  const toggleModal = () => {
    setModal(!modal);
  };

  const ref = useRef();

  useEffect(() => {

    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleModal()
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  /***************************************************************************************** */
  useEffect(() => {
    getAllUsers().then(res => console.log('All users done'));
  }, []);
  /***************************************************************************************** */

  return (
      <div className="nav">
        <div className="logo_search">
          <img className="logo" alt="logo-friends"
               src="https://res.cloudinary.com/dvg9eijgb/image/upload/v1645002900/su1xnqw4k9jxcaxmyuwu.png"
               onClick={() => {
                 navigate(`/home`);
               }}/>


          <div className="input_and_icon">
            <div className="search">
              <input
                  className="input_search"
                  type="text"
                  value={typing}
                  placeholder="Find a friend"
                  onChange={(e) => {
                    setTyping(e.target.value);
                    filteredSearch(typing);
                    if (e.target.value !== "") {
                      setModal(true);
                    } else {
                      setModal(false);
                    }
                  }}
              />


              {modal && <div className="rod" ref={ref}>
                {searchResult.length ? (searchResult.map((user) => {
                  return (<>
                    <div
                        className="user_info_rod"
                        onClick={() => {
                          navigate(`/profile/${user.id}`);
                          toggleModal();
                          setTyping("");
                        }}
                    >
                      <img
                          alt="profile-img"
                          src={user.profileimage !== "undefined" ? user.profileimage : noAvatar}
                          className="img_search"
                      />
                      <span>{user.userName}</span>
                    </div>
                  </>);
                })) : (<>No results !</>)}
              </div>}


            </div>

            <BsSearch className="icon_search"/>
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
            <AiFillHome className="home_icon"/>
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
          <MdOutlineLogout
              className="LogOut"
              onClick={() => {
                dispatch(logout());
                localStorage.clear();
                navigate("/");
              }}
          />

        </div>
      </div>
  );
};

export default Navigation;
