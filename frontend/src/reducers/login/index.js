const initialState = {
  token: "" || localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return {
        token: payload,
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

export const login = (token) => {
  return { type: "LOG_IN", payload: token };
};

export const logout = () => {
  return { type: "LOG_OUT" };
};
