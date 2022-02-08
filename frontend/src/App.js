import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import SinglePostPage from "./components/SinglePostPage/SinglePostPage";
import { useSelector } from "react-redux";
import NewPost from "./components/NewPost/NewPost";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfilePage";
import Chat from "./components/Chat/Chat";
const App = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <>
      {state.isLoggedIn ? <Navigation /> : <></>}
      <div className="App">
        <div className="Home">
          <Routes>
            <Route path="/NewPost" element={<NewPost />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/post/:id" element={<SinglePostPage />} />
            <Route path="/profile/:user_id" element={<ProfilePage />} />
            <Route path="/chat/" element={<Chat />} />
          </Routes>
        </div>
        {state.isLoggedIn ? <></> : <Login />}
      </div>
    </>
  );
};

export default App;
