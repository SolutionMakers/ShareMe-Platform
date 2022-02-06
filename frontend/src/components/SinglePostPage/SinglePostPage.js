import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../SinglePostPage/SinglePostPage.css";

const SinglePostPage = () => {
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  /* ****************************************************** */

  const getCommentsByUserID = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/all/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setComments(res.data.results);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  };
  /* ****************************************************** */

  const getLikesByUserID = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/like/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        setLikeCount(res.data.results.length);
        setLikes(res.data.results);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  };
  /* ****************************************************** */
  const getPostByID = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${id}/post`);
      if (res.data.success) {
        setPost(res.data.results[0]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  };
  /* ****************************************************** */

  const putNewLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        console.log("done");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };
  /* ****************************************************** */
  const createNewComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/posts/${id}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        setComment(res.data.results);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };
  /* ****************************************************** */

  useEffect(() => {
    getPostByID();
    getCommentsByUserID();
    getLikesByUserID();
  }, [comment, likes]);
  return (
    <div>
      {post.is_deleted == 0 ? (
        <>
          <p>{post.userName}</p>
          <img src={post.profileimage} />
          <p>{post.description}</p>
          <img src={post.media} />
          <>
            <p>{likeCount} LIKE</p>
            <button onClick={putNewLike}>LIKE</button>
          </>
          {comments.length ? (
            comments.map((element, index) => {
              return (
                <div key={index}>
                  <p>{element.userName}</p>
                  <img src={element.profileimage} />
                  <p>{element.comment}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
          <input
            type="text"
            placeholder="Whats on your Mind ?"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={createNewComment}>Comment</button>
        </>
      ) : (
        <>No Posts</>
      )}
    </div>
  );
};

export default SinglePostPage;