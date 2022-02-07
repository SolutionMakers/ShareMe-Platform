const initialState = {
  token: "" || localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
  user_id: "" || localStorage.getItem("user_id"),
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return {
        token: payload.token,
        user_id: payload.user_id,
        isLoggedIn: true,
      };

    case "LOG_OUT":
      return {
        token: "",
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;

export const login = ({ token, user_id }) => {
  return { type: "LOG_IN", payload: { token, user_id } };
};

export const logout = () => {
  return { type: "LOG_OUT" };
};
