import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import SinglePostPage from "./components/SinglePostPage";
import NewPost from "./components/NewPost";
import Home from "./components/Home";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/NewPost" element={<NewPost />} />
        <Route path="/Home" element={<Home />} />
          <Route path="/post/:id" element ={<SinglePostPage/>}/>
      </Routes>

    </div>
  );
};

export default App;
