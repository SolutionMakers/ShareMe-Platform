import { combineReducers, createStore } from "redux";
import postReducer from "./post/index";
import loginReducer from "./login/index";
import commentReducer from "./comment/index";
const reducers = combineReducers({
  postReducer,
  loginReducer,
  commentReducer,
});

const store = createStore(reducers);

export default store;
