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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <>
      <ToastContainer />
      {state.isLoggedIn ? <Navigation /> : <></>}
      <div className="App">
        <div className="Home">
          <Routes>
            {state.isLoggedIn ? (
              <Route path="/chat/" element={<Chat />} />
            ) : (
              <></>
            )}
            {state.isLoggedIn ? (
              <Route path="/Home" element={<Home />} />
            ) : (
              <></>
            )}
            {state.isLoggedIn ? (
              <Route path="/post/:id" element={<SinglePostPage />} />
            ) : (
              <></>
            )}
            {state.isLoggedIn ? (
              <Route path="/NewPost" element={<NewPost />} />
            ) : (
              <></>
            )}
            {state.isLoggedIn ? (
              <Route path="/profile/:user_id" element={<ProfilePage />} />
            ) : (
              <></>
            )}
          </Routes>
        </div>
        {state.isLoggedIn ? <></> : <Login />}
      </div>
    </>
  );
};

export default App;
