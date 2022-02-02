import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import SinglePostPage from "./components/SinglePostPage";
const App = () => {
  return (
    <div className="App">
  
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/post/:id" element ={<SinglePostPage/>}/>


</Routes>
    </div>
  );
};

export default App;
