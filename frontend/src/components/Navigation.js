import { Link } from "react-router-dom";
import { logout } from "../reducers/login";
import { useDispatch, useSelector } from "react-redux";
const Navigation = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <div className="navigation">
      {state.isLoggedIn ? (
        <>
          <Link to="/home">Home</Link>
          <Link to="/NewPost">New Post</Link>
          <Link
            onClick={() => {
              dispatch(logout());
              localStorage.clear();
            }}
            to="/"
          >
            logout
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Navigation;
