import React, { useState, useEffect } from "react";
import { setPosts, updatePost, deletePost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFillHeartFill,
  BsFillHandThumbsUpFill,
  BsChatDotsFill
} from "react-icons/bs";

import { AiFillHourglass } from "react-icons/ai";
import { ImHome3 } from "react-icons/im";
import { FaUserGraduate, FaVenusMars, FaUserCircle } from "react-icons/fa";

import axios from "axios";
import noAvatar from "../images/noAvatar.png";
import cover from "../images/cover.png";

const ProfilePage = () => {
  const { user_id } = useParams();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const navigation = useNavigate();
  const [description, setDescription] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [profileimage, setProfileimage] = useState("");
  const [profileCover, setProfileCover] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [modalImg, setTModalImg] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
  const [uploadedCover, setUploadedCover] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
    };
  });

  /************************************* */
  const toggleModal = (id) => {
    setModal(!modal);
    setId(id);
  };
  /********************************** */
  const toggleModalImg = () => {
    setTModalImg(!modalImg);
  };
  /*********************************** */
  const toggleModalCover = () => {
    setCoverModal(!coverModal);
  };
  /********************************************************************************************************* */
  const uploadCoverPhoto = async () => {
    const formData = new FormData();
    formData.append("file", uploadedCover);
    formData.append("upload_preset", "wyggi4ze");

    await axios
      .post("https://api.cloudinary.com/v1_1/dvg9eijgb/image/upload", formData)
      .then((response) => {
        updateProfileCover(response.data.secure_url);
      })
      .catch((err) => {
        throw err;
      });
  };
  /********************************************************************************************************** */
  const updateProfileCover = async (profileCover) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/cover/${user_id}`,
        { profileCover: profileCover }
      );
      if (res.data.success) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /***************************************** */
  const uploadimage = async () => {
    console.log(uploadedImage);
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "wyggi4ze");

    await axios
      .post("https://api.cloudinary.com/v1_1/dvg9eijgb/image/upload", formData)
      .then((response) => {
        console.log(response);
        updatProfileImage(response.data.secure_url);
      })
      .catch((err) => {
        throw err;
      });
  };

  /****************************************** */
  const getPostsByUserId = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${user_id}`);
      if (res.data.success) {
        setUserPosts(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /******************************************** */
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
  /**************************************** */

  const updatProfileImage = async (profileimage) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/image/${user_id}`,
        { profileimage }
      );
      if (res.data.success) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /***************************************** */
  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users/${user_id}/info`
      );
      if (res.data.success) {
        setUserInfo(res.data.Info[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /****************************************** */

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
        console.log("done");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  /**************************************** */

  const joinRoom = () => {
    axios
      .post(
        `http://localhost:5000/rooms/`,
        {
          id: user_id,
        },
        {
          headers: {
            Authorization: ` Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.results[0].id);
        if (result.data.results[0].id) {
          navigation(`/chat/${result.data.results[0].id}`);
        }

        if (result.data.results[0].insertId) {
          navigation(`/chat/${result.data.results[0].insertId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /***************************************** */
  const filterArray = (id) => {
    return allLikes.filter((e, i) => {
      return e.post_id === id;
    });
  };
  /****************************************** */
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
  /******************************************* */
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
  /******************************************* */

  useEffect(() => {
    getPostsByUserId();
    getUserInfo();
    getAllLikes();
  }, []);
  return (
    <>
      <div className="top_profile_page">
        <div className="cover_and_button">
          {userInfo.id == state.user_id ? (
            <button onClick={toggleModalCover} className="edit_cover_button">
              Edit Cover
            </button>
          ) : (
            <></>
          )}
          {coverModal && (
            <div className="modal_profile">
              <div onClick={toggleModalCover} className="overlay_profile"></div>
              <div className="modal-content_profile">
                <div>
                  <input
                    type="file"
                    onChange={(e) => {
                      setUploadedCover(e.target.files[0]);
                    }}
                  />
                  <button
                    onClick={() => {
                      uploadCoverPhoto();
                      toggleModalCover();
                    }}
                  >
                    upload
                  </button>
                </div>
              </div>
            </div>
          )}
          <img
            className="cover_photo"
            src={
              userInfo.profilecover !== "undefined"
                ? userInfo.profilecover
                : cover
            }
          />
        </div>

        <div className="all_avatar">
          <div className="avatar">
            <img
              className="avatar-image"
              src={
                userInfo.profileimage !== "undefined"
                  ? userInfo.profileimage
                  : noAvatar
              }
            />
            {userInfo.id == state.user_id ? (
              <div className="avatar-button" onClick={toggleModalImg}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather_feather-plus"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="userName_profile">{userInfo.userName}</div>
        </div>

        {/* <button className="chat_button" onClick={joinRoom}>
          Chat Rooms
        </button> */}

        {modalImg && (
          <div className="modal_profile">
            <div onClick={toggleModalImg} className="overlay_profile"></div>
            <div className="modal-content_profile">
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    setUploadedImage(e.target.files[0]);
                  }}
                />
                <button
                  onClick={() => {
                    uploadimage();
                    toggleModalImg();
                  }}
                >
                  upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mid_profile_page">
        {userInfo ? (
          <div className="userBasicInfo_title">
            <div className="title_font">Basic Infos</div>

            <div className="userBasicInfo">
              <div className="flex_row">
                <div className="flex_col_info">
                  <div className="title_info_info">Name</div>
                  <div className="_info">{userInfo.userName}</div>
                  <div className="border_info"></div>
                </div>
                <FaUserCircle className="info_icon" />
              </div>

              <div className="flex_row">
                <div className="flex_col_info">
                  <div className="title_info_info">Gender</div>
                  <div className="_info">{userInfo.gender}</div>
                  <div className="border_info"></div>
                </div>
                <FaVenusMars className="info_icon" />
              </div>

              <div className="flex_row">
                <div className="flex_col_info">
                  <div className="title_info_info">Date of Birth</div>
                  <div className="_info">{userInfo.dob?.slice(0, 10)}</div>
                  <div className="border_info"></div>
                </div>
                <AiFillHourglass className="info_icon" />
              </div>

              <div className="flex_row">
                <div className="flex_col_info">
                  <div className="title_info_info">Lives in</div>
                  <div className="_info">{userInfo.country}</div>
                  <div className="border_info"></div>
                </div>
                <ImHome3 className="info_icon" />
              </div>

              <div className="flex_row">
                <div className="flex_col_info">
                  <div className="title_info_info">Studied at</div>
                  <div className="_info">Meraki Academy</div>
                  <div className="border_info"></div>
                </div>
                <FaUserGraduate className="info_icon" />
              </div>

              <div className="flex_row">
                <div className="flex_col_info">
                  <div className="title_info_info">Relationship</div>
                  <div className="_info_re">Single</div>
                </div>
                <BsFillHeartFill className="info_icon" />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="all_posts_profile_page">
          <div className="userBasicInfo_title_post">
          <span className="post_title">Posts</span>
          </div>
         
          {userPosts.length ? (
            userPosts.map((element, index) => {
              {console.log(element)}
              return (
                <div  className="post">
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
                        {/* <span className="postDate">{format(post.createdAt)}</span> */}
                      </div>
                      <div className="postTopRight">
                        <BsThreeDotsVertical
                          className="icon_popup"
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
                      <p className="postText">{element.description}</p>
                      <img className="postImg" src={element.media} alt="" />
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
                            putNewLike(element.id);
                            e.target.style.color = "#e60023";
                            e.target.style.transition = "all 0.5s";
                          }}
                        />

                        <span className="postLikeCounter">
                          {filterArray(element.id).length} People Like It
                        </span>
                      </div>
                      <div className="postBottomRight">
                     comments
                  <BsChatDotsFill className="postCommentText"
                        onClick={() => {
                          navigation(`/post/${element.id}`);
                        }}/>
                        
                    
                       
                      
                    </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Posts for this user</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
