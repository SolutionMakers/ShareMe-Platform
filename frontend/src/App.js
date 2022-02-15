import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import React, { useState, useEffect, Suspense, lazy } from "react";

import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

const Home = lazy(() => import("./components/Home"));
const Chat = lazy(() => import("./components/Chat/Chat"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const Navigation = lazy(() => import("./components/Navigation"));
const NewPost = lazy(() => import("./components/NewPost/NewPost"));
const SinglePostPage = lazy(() =>
  import("./components/SinglePostPage/SinglePostPage")
);
const Login = lazy(() => import("./components/Login"));

const App = () => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <>
      <Suspense
        fallback={
          <div className="spiner">
            {" "}
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
        }
      >
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
      </Suspense>
    </>
  );
};

export default App;
