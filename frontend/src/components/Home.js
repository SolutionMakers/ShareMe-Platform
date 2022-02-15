import React, { useState, useEffect } from "react";
import { setPosts, updatePost, deletePost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { FaUserFriends } from "react-icons/fa";
import {
  BsThreeDotsVertical,
  BsFillHeartFill,
  BsFillChatLeftTextFill,
  BsPen,
  BsChatDotsFill,
} from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import noAvatar from "../images/noAvatar.png";
/******************************************************************************************************* */
const Home = () => {
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [allLikes, setAllLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

  /***************************************************************************************************************** */
  const navigation = useNavigate();
  const toggleModal = (id) => {
    setModal(!modal);
    setId(id);
  };
  const imgUser = localStorage.getItem("img");

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
      user_id: state.loginReducer.user_id,
    };
  });
  /*************************************************************************************************************** */
  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts/friends/posts", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (res.data.success) {
        dispatch(setPosts(res.data.results.reverse()));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  /**************************************************************************************************************** */

  /********************************************************************************************************************* */

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.data.success) {
        setAllUsers(res.data.results);
      } else throw Error;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  /**************************************************************** */
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
        getAllPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************************************************* */
  const putNewLike = async (id) => {
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
        console.log(res.data);
        getAllPosts();
        getAllLikes();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  /********************************************************** */

  const getAllFriendsByUserId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/friends/user/${state.user_id}`
      );
      if (res.data.success) {
        setAllFriends(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /****************************************************************************************************************** */
  const getAllLikes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/like`);
      if (res.data.success) {
        setAllLikes(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /**********************************************************************************************************************/
  useEffect(() => {
    getAllPosts();
    getAllLikes();
    getAllUsers();
    getAllFriendsByUserId();
  }, []);
  /**********************************************************************************************************************/
  const filterArray = (id) => {
    return allLikes.filter((e, i) => {
      return e.post_id === id;
    });
  };
  /**************************************************************************************************** */
  const checkLikes = (id) => {
    const filtered = allLikes.filter((element) => {
      return element.user_id == state.user_id && element.post_id == id;
    });
    if (filtered.length != 0) {
      return true;
    } else {
      return false;
    }
  };
  /**********************************************************************************************************************/

  let finalArray = allFriends.map(function (obj) {
    return obj.id;
  });

  console.log(finalArray);
  /*************************************************************************** */
  return (
    <div className="contain_all_home">
      <div className="left_home">
        <div className="chat_with_friends">
          <div className="connect_word">
            <BsFillChatLeftTextFill className="icon_sug" /> Connect with your
            friends
          </div>

          <div className="box_chat_home">
            {allFriends.length ? (
              allFriends.map((e, i) => {
                return (
                  <>
                    <div
                      className="user_rod_suggestions"
                      onClick={() => {
                        navigation(`/chat/`);
                      }}
                    >
                      <img
                        className="user_sug_img"
                        src={
                          e.profileimage !== "undefined"
                            ? e.profileimage
                            : noAvatar
                        }
                      />
                      <div className="user_fri_name">{e.userName}</div>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="middle_home">
        <div className="create_post">
          <div className="pen_publish">
            <BsPen className="icon_pen" />
            <div className="publish">publish</div>
          </div>

          <div className="border_bottom_create"></div>
          <div className="content_create_post">
            <img
              className="img_user_creat_post"
              src={imgUser !== "undefined" ? imgUser : noAvatar}
            />
            <textarea
              id="publish"
              className="textarea"
              rows="3"
              placeholder="Write something about you..."
              spellCheck="false"
              onClick={() => {
                navigation("/NewPost");
              }}
            ></textarea>
          </div>
          <div className="upload_media_post">
            <div className="compose-option">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-camera"
                id="icon_cam_svg"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span className="media">Media</span>
              <input
                id="feed-upload-input-2"
                type="file"
                accept=".png, .jpg, .jpeg"
                onClick={(e) => {
                  navigation("/NewPost");
                }}
              />
            </div>
          </div>
        </div>
        <div className="all_posts_home">
          {state.posts.map((element, i) => {
            return (
              <div key={i} className="post">
                <div className="postWrapper">
                  <div className="postTop">
                    <div className="postTopLeft">
                      <Link to={`/profile/${element.user_id}`}>
                        <img
                          className="postProfileImg"
                          width="100%"
                          src={
                            element.profileimage !== "undefined"
                              ? element.profileimage
                              : noAvatar
                          }
                        />
                      </Link>
                      <span className="postUsername">{element.userName}</span>
                      <div className="postDate">
                        {format(element.created_at)}
                      </div>
                    </div>
                    <div className="postTopRight">
                      {element.user_id == state.user_id ? (
                        <div>
                          <BsThreeDotsVertical
                            className="icon_popup"
                            onClick={() => toggleModal(element.id)}
                          />
                          {modal && id == element.id && (
                            <div className="modal_Edit">
                              <div
                                onClick={toggleModal}
                                className="overlay_Edit"
                              ></div>
                              <div className="modal-content_Edit">
                                <div className="Edit_post_pagePost">
                                  <div className="pen_publish_">
                                    <BsPen className="icon_pen_" />
                                    <div className="publish_">Edit Post</div>
                                  </div>

                                  <div className="border_bottom_create_"></div>
                                  <div className="content_create_post_">
                                    <img
                                      className="img_user_creat_post_"
                                      src={
                                        imgUser !== "undefined"
                                          ? imgUser
                                          : noAvatar
                                      }
                                    />

                                    <textarea
                                      id="publish_"
                                      className="textarea_"
                                      defaultValue={element.description}
                                      rows="3"
                                      spellCheck="false"
                                      onChange={(e) => {
                                        setDescription(e.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                  <div className="upload_media_post_">
                                    <button
                                      className="Delete_button"
                                      onClick={(e) => {
                                        handleDelete(element.id);
                                        toggleModal();
                                      }}
                                    >
                                      <MdDeleteForever className="rubbish" />
                                      Delete
                                    </button>

                                    <button
                                      className="button_Save"
                                      onClick={(e) => {
                                        handleUpdate(element.id);
                                        toggleModal();
                                      }}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="postCenter">
                    <p className="postText">{element.description}</p>
                    {element.media.includes("video") ? (
                      <video controls className="postImg">
                        <source src={element.media} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        className="postImg"
                        src={element.media}
                        alt=""
                        onClick={() => {
                          navigation(`/post/${element.id}`);
                        }}
                      />
                    )}
                  </div>

                  <div className="postBottom">
                    <div className="postBottomLeft">
                      {checkLikes(element.id) ? (
                        <BsFillHeartFill
                          className="likeIcon_heart"
                          style={{ transition: "all 0.5s", color: "#e60023" }}
                        />
                      ) : (
                        <BsFillHeartFill
                          className="likeIcon_heart"
                          onClick={(e) => {
                            putNewLike(element.id);
                            e.target.style.color = "#e60023";
                            e.target.style.transition = "all 0.5s";
                          }}
                        />
                      )}

                      <span className="postLikeCounter">
                        {filterArray(element.id).length} People Like It
                      </span>
                    </div>

                    <div className="postBottomRight">
                      comments
                      <BsChatDotsFill
                        className="postCommentText"
                        onClick={() => {
                          navigation(`/post/${element.id}`);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rigth_home">
        <div className="suggestions_and_box">
          <div className="suggestions_word">
            <FaUserFriends className="icon_sug" /> Suggestions
          </div>
          <div className="box_suggestions">
            {allUsers.length ? (
              allUsers.map((e, i) => {
                return (
                  <>
                    {state.user_id != e.id && !finalArray.includes(e.id) ? (
                      <div
                        className="user_rod_suggestions"
                        onClick={() => {
                          navigation(`/profile/${e.id}`);
                        }}
                      >
                        <img
                          className="user_sug_img"
                          src={
                            e.profileimage !== "undefined"
                              ? e.profileimage
                              : noAvatar
                          }
                        />
                        <div className="user_sug_name">{e.userName}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
