import { logout } from "../reducers/login";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const Navigation = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <div className="nav">
    <div className="logo_search">
      <div className="logo"></div>
      <div className="search">
        <input
          className="input_search"
          type="text"
          placeholder="Search AAB"
         
         
        />
      </div>
    </div>
  
    <div className="home_nav">
      <Link to="/home">
        <AiFillHome className="home_icon" />
      </Link>
    </div>
  
    <div>
      <Link to="/NewPost">New Post</Link>
    </div>
    <div>My profile</div>
    <div className="style_logOut">
      <button className="LogOut"
        onClick={() => {
          dispatch(logout());
          localStorage.clear();
          navigate("/");
        }}
      >LogOut</button>
    </div>
  </div>
  );
};





export default Navigation;
