import React, { useState, useEffect } from "react";
import { setPosts, updatePost, deletePost } from "../../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFillHeartFill,
  BsFillHandThumbsUpFill,
  BsPlusCircleFill,
} from "react-icons/bs";

import axios from "axios";
import noAvatar from "../../images/noAvatar.png";
import { format, render, cancel, register } from "timeago.js";

import "../SinglePostPage/SinglePostPage.css";

const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
    };
  });
  const [post, setPost] = useState([]);
  const [modal, setModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [description, setDescription] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((result) => {
        dispatch(deletePost(id));
      })
      .catch((err) => {
        throw err;
      });
  };
  /************************************************************************************************************* */
  const handleUpdate = async (id) => {
    try {
      const newPost = {
        description,
      };
      const res = await axios.put(
        `http://localhost:5000/posts/${id}/post`,
        newPost,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(updatePost(newPost));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        getPostByID();
        getLikesByUserID();
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
        setComment("");
        getPostByID();
        getCommentsByUserID();
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
  }, []);

  return (
    <div>
      {post.is_deleted == 0 ? (
        <div className="Single_post">
          <div className="post">
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <Link to={`/profile/${post.user_id}`}>
                    <img
                      className="postProfileImg"
                      width="100%"
                      src={
                        post.profileimage !== "undefined"
                          ? post.profileimage
                          : noAvatar
                      }
                    />
                  </Link>
                  <span className="postUsername">{post.userName}</span>
                  <span className="postDate">{format(post.created_at)}</span>
                </div>
                <div className="postTopRight">
                  <BsThreeDotsVertical
                    className="icon_popup"
                    onClick={() => toggleModal(post.id)}
                  />
                  <div>
                    {" "}
                    {modal && (
                      <div className="modal_post">
                        <div
                          onClick={toggleModal}
                          className="overlay_post"
                        ></div>
                        <div className="modal-content_post">
                          <h2>Edit Post</h2>
                          <button
                            className="button_delete"
                            onClick={() => {
                              navigation("/home");
                              handleDelete(id);
                            }}
                          >
                            delete
                          </button>
                          <input
                            type="text"
                            placeholder="updated description"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                          <button onClick={() => handleUpdate(id)}>
                            Update
                          </button>
                          <button
                            className="close-modal_post"
                            onClick={() => toggleModal("")}
                          >
                            CLOSE
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="postCenter">
                <p className="postText">{post.description}</p>
                <img className="postImg" src={post.media} alt="" />
              </div>

              <div className="postBottom">
                <div className="postBottomLeft">
                  <BsFillHandThumbsUpFill
                    className="likeIcon"
                    onClick={(e) => {
                      e.target.style.color = "#1877f2";
                      e.target.style.transition = "all 0.5s";
                    }}
                  />
                  <BsFillHeartFill
                    className="likeIcon_heart"
                    onClick={(e) => {
                      putNewLike(post.id);
                      e.target.style.color = "#e60023";
                      e.target.style.transition = "all 0.5s";
                    }}
                  />

                  <span className="postLikeCounter">
                    {likes.length} People Like It
                  </span>
                </div>
                <div className="postBottomRight"></div>
              </div>
            </div>

            <div className="all_comments">
              {comments.length ? (
                comments.map((element, index) => {
                  return (
                    <div key={index} className="comment_style">
                      <div className="comment_flex_row">
                        <img
                          className="img_profile_single"
                          src={element.profileimage}
                        />

                        <div className="one_comment">
                          <div className="comment_flex_column">
                            <div className="uesr_commenter_name">
                              {element.userName}
                            </div>

                            <div className="comment_font">
                              {element.comment}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <div className="add_comment_syle">
              <input
                className="Add_comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
                placeholder="write comment here..."
              />{" "}
              <BsPlusCircleFill className="apple" onClick={createNewComment} />
            </div>
          </div>
        </div>
      ) : (
        <>No Posts</>
      )}
    </div>
  );
};

export default SinglePostPage;
