import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/Login";
const App = () => {
  return (
    <div className="App">
  
<Routes>
<Route path="/" element={<Login/>}/>


</Routes>
    </div>
  );
};

export default App;
