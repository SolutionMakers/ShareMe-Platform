import { combineReducers, createStore } from "redux";
import postsReducer from "./post/index";
import loginReducer from "./login/index";
import commentReducer from "./comment/index";
const reducers = combineReducers({
  postsReducer,
  loginReducer,
  commentReducer,
});

const store = createStore(reducers);

export default store;
