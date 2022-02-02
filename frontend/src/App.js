import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
const App = () => {
  return (
    <div className="App">
  
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/NewPost" element={<NewPost/>}/>



</Routes>
    </div>
  );
};

export default App;
