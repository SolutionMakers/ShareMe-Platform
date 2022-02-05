import React, { useState, useEffect } from "react";
import { setPosts, updatePost, deletePost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFillHeartFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import axios from "axios";
import noAvatar from "../images/noAvatar.png";
/************************** */
const Home = () => {
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
const navigation=useNavigate();
  const toggleModal = (id) => {
    setModal(!modal);

    setId(id);
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
    };
  });
  /************************************************* */
  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      if (res.data.success) {
        dispatch(setPosts(res.data.results));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
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
  /**************************************************************************************************************************/

  useEffect(() => {
    getAllPosts();
  }, []);

  //------------------------------------------------------------
  return (
    <div className="contain_all_home">
      <div className="left_home"></div>

      <div className="middle_home">
        <div className="all_posts_home">
          {state.posts.map((element, i) => {
            return (
              <div className="post">
                <div className="postWrapper">
                  <div className="postTop">
                    <div className="postTopLeft">
                      <Link to={`/profile/${element.id}`}>
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
                      {/* <span className="postDate">{format(post.createdAt)}</span> */}
                    </div>
                    <div className="postTopRight">
                      <BsThreeDotsVertical className="icon_popup"
                        onClick={() => toggleModal(element.id)}
                      />
                      <div>
                        {" "}
                        {modal && id == element.id && (
                          <div className="modal_post">
                            <div
                              onClick={toggleModal}
                              className="overlay_post"
                            ></div>
                            <div className="modal-content_post">
                              <h2>Edit Post</h2>
                              <button
                                className="button_delete"
                                onClick={() => handleDelete(element.id)}
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
                              <button onClick={() => handleUpdate(element.id)}>
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
                    <p className="postText">{element.description}</p>
                    <img
                      className="postImg"
                      src="https://amusd.net/wp-content/uploads/2021/03/HD-Wallpaper.jpg"
                      alt=""
                    />
                  </div>

                  <div className="postBottom">
                    <div className="postBottomLeft">
                      <BsFillHandThumbsUpFill className="likeIcon" />
                      <BsFillHeartFill className="likeIcon_heart" />

                      <span className="postLikeCounter">people like it</span>
                    </div>
                    <div className="postBottomRight">
                      <span className="postCommentText" onClick={()=>{
                        navigation(`/post/${element.id}`)
                      }}> comments</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rigth_home"></div>
    </div>
  );
};

export default Home;
