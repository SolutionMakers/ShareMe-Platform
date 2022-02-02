import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { addPost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";

const NewPost = () => {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [craetPostMessage, setcraetPostMessage] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
    };
  });

  return (
    <div className="creat_post_all">
      <div className="body_create">
        <input
          type="text"
          className="input_create_post"
          placeholder="Whats on your Mind ?"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          onChange={(e) => {
            setMedia(e.target.value);
          }}
        />
      </div>

      <div className="button_creat_and_messag">
        <button
          className="button_craet_post"
          onClick={(e) => {
            axios
              .post(
                "http://localhost:5000/posts/",
                {
                  description: description,
                  media: media,
                },
                {
                  headers: {
                    Authorization: ` Bearer ${state.token}`,
                  },
                }
              )
              .then((result) => {
                dispatch(addPost({ description, media }));

                e.target.style.background =
                  "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                e.target.style.color = "black";
                setcraetPostMessage("The post has been created successfully");
              })
              .catch((err) => {
                e.target.style.background =
                  "linear-gradient(-45deg,#f7797d,#f7797d)";
                e.target.style.color = "black";
                setcraetPostMessage(
                  "Error happened while creating a new post, please try again"
                );
              });
          }}
        >
          Post
        </button>
        <div className="messagReg">{craetPostMessage}</div>
      </div>
    </div>
  );
};

export default NewPost;
