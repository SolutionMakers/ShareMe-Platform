import React, { useState, useEffect } from "react";
import { updatePost, deletePost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsFillHeartFill,
  BsChatDotsFill,
  BsPen,
} from "react-icons/bs";

import { MdDeleteForever } from "react-icons/md";
import { ImSad } from "react-icons/im";
import { FiCamera } from "react-icons/fi";
import { AiFillHourglass,AiFillLock  } from "react-icons/ai";
import { ImHome3 } from "react-icons/im";
import { FaUserGraduate, FaVenusMars, FaUserCircle} from "react-icons/fa";
import { format } from "timeago.js";
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
  const [userInfo, setUserInfo] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [modalImg, setTModalImg] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
  const [uploadedCover, setUploadedCover] = useState("");
  const [myFriendsList, setMyFriendsList] = useState([]);
  const [show, setShow] = useState(true);
  const [coverShow, setCoverShow] = useState(false);

  const imgUser = localStorage.getItem("img");

  /************************************************************************************************************** */
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      user_id: state.loginReducer.user_id,
    };
  });
  /************************************************************************************************************** */
  let postsImages = userPosts.filter((e, i) => {
    return e.media !== "" && e.media.includes("image");
  });
  /************************************************************************************************************** */
  const toggleModal = (id) => {
    setModal(!modal);
    setId(id);
  };
  /************************************************************************************************************** */
  const toggleModalImg = () => {
    setTModalImg(!modalImg);
  };
  /************************************************************************************************************** */
  const toggleModalCover = () => {
    setCoverModal(!coverModal);
  };

  /************************************************************************ */

  const toggleCoverImg = () => {
    setCoverShow(!coverShow);
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
        getUserInfo();
      }
    } catch (err) {
      console.log(err);
    }
  };
  /************************************************************************************************************* */
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

  /************************************************************************************************************* */
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
  /************************************************************************************************************* */
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
  /************************************************************************************************************* */

  const updatProfileImage = async (profileimage) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/image/${user_id}`,
        { profileimage }
      );
      if (res.data.success) {
        console.log(res.data);
        getUserInfo();
        localStorage.setItem("img", profileimage);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /************************************************************************************************************* */
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
  /************************************************************************************************************* */

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
        getAllLikes();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  /************************************************************************************************************* */
  const filterArray = (id) => {
    return allLikes.filter((e, i) => {
      return e.post_id === id;
    });
  };
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
        getPostsByUserId();
      }
    } catch (error) {
      console.log(error);
    }
  };
  /************************************************************************************************************* */
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((result) => {
        dispatch(deletePost(id));
        getPostsByUserId();
      })
      .catch((err) => {
        throw err;
      });
  };
  /************************************************************************************************************* */
  const followUser = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/friends`,
        { friend: user_id },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        console.log(`The friend has been added to friend list`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /*********************************************************************************************************** */
  const unFollowUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/friends/remove/${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (res.data.success) {
        console.log(`The follow has been removed `);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*********************************************************************************************************** */

  const getAllFriendsByUserId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/friends/user/${user_id}`
      );
      if (res.data.success) {
        setMyFriendsList(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /****************************** */

  const getAllFriends = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/friends/all`);
      if (res.data.success) {
        checkFriends(res.data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /****************************** */
  const checkFriends = async (array) => {
    const found = await array.map((element) => {
      if (element.user_id == state.user_id && element.friend == user_id) {
        setShow(false);
      }
    });
  };
  /****************************** */
  useEffect(() => {
    getPostsByUserId();
    getUserInfo();
    getAllLikes();
    getAllFriendsByUserId();
    getAllFriends();
  }, [user_id]);

  return (
    <>
      <div className="top_profile_page">
        <div className="cover_and_button">
          {userInfo.id == state.user_id ? (
            <FiCamera className="icone_edit_cover" onClick={toggleModalCover} />
          ) : (
            <></>
          )}
          {coverModal && (
            <div className="modal_cover">
              <div onClick={toggleModalCover} className="overlay_cover"></div>
              <div className="modal-content_cover">
                <div className="modal_edit_pic_cover">
                  <span className="font_span_pic">Edit your Cover</span>
                  <img
                    alt="rect image"
                    className="rectangular_img"
                    src={
                      userInfo.profilecover !== "undefined"
                        ? userInfo.profilecover
                        : cover
                    }
                  />

                  <div className="buttons_upload_flex">
                    <div className="compose">
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
                        className="feather_p"
                        id="icon_cam_svg_P"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      <span className="media_">Media</span>
                      <input
                        id="feed-2"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          setUploadedCover(e.target.files[0]);
                        }}
                      />
                    </div>

                    <button
                      className="upload_edit_cover"
                      onClick={() => {
                        uploadCoverPhoto();
                        toggleModalCover();
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {coverShow && (
            <div className="modal_cover_show">
              <div onClick={toggleCoverImg} className="overlay_cover"></div>
              <div className="modal-content">
                <img
                  alt=" cover image"
                  onClick={toggleCoverImg}
                  className="cover_photo_for_modal"
                  src={
                    userInfo.profilecover !== "undefined"
                      ? userInfo.profilecover
                      : cover
                  }
                />
                <button className="close-modal_cover" onClick={toggleCoverImg}>
                  CLOSE
                </button>
              </div>
            </div>
          )}

          <img
            alt=" cover image"
            onClick={toggleCoverImg}
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
              alt="avatar image"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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

          <div className="userName_profile">
            {userInfo.userName}

            <div className="button_follow_flex">
              {user_id != state.user_id ? (
                <>
                  {" "}
                  {show ? (
                    <button
                      className="follow_button"
                      onClick={() => {
                        followUser();
                        setShow(false);
                      }}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="unfollow_button"
                      onClick={() => {
                        unFollowUser();
                        setShow(true);
                      }}
                    >
                      Unfollow
                    </button>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {modalImg && (
          <div className="modal_profile">
            <div onClick={toggleModalImg} className="overlay_profile"></div>
            <div className="modal-content_profile">
              <div className="modal_edit_pic_profile">
                <span className="font_span_pic">Edit your picture</span>
                <img
                  alt="square image"
                  className="square_img"
                  src={
                    userInfo.profileimage !== "undefined"
                      ? userInfo.profileimage
                      : noAvatar
                  }
                />

                <div className="buttons_upload_flex">
                  <div className="compose">
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
                      className="feather feather-camera_pagePost"
                      id="icon_cam_svg"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                    <span className="media_">Media</span>
                    <input
                      id="feed-2"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        setUploadedImage(e.target.files[0]);
                      }}
                    />
                  </div>

                  <button
                    className="upload_edit_pic"
                    onClick={() => {
                      uploadimage();
                      toggleModalImg();
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mid_profile_page">
        <div className="left_side_profile">
          <div className="one">
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
          </div>

          {/*****************************photo box************ */}

          <div className="tow">
            <div className="box_photo_all">
              <span className="phots_title">Photos</span>

              <div className="All_img">
                <div className="imgees">
                  <img
                    alt="image boxxx"
                    className="imges_box"
                    src={
                      userInfo.profilecover !== "undefined"
                        ? userInfo.profilecover
                        : cover
                    }
                  />

                  <img
                    alt="image boxx"
                    className="imges_box"
                    src={
                      userInfo.profileimage !== "undefined"
                        ? userInfo.profileimage
                        : noAvatar
                    }
                  />

                  {postsImages ? (
                    postsImages.map((element, index) => {
                      return (
                        <img
                          alt="image box"
                          src={element.media}
                          className="imges_box"
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/*************************** box friend********************************* */}

          <div className="four">
            <div className="box_friends_all">
              <span className="Friends_title">
                Friends {myFriendsList.length}
              </span>
              <div className="imgees_cintainer_f">
                {myFriendsList.length ? (
                  myFriendsList.map((e, i) => {
                    return (
                      <>
                        <div className="flex_friend_name">
                          <img
                            alt=" undefined image"
                            src={
                              e.profileimage !== "undefined"
                                ? e.profileimage
                                : noAvatar
                            }
                            className="imges_friend_pic"
                            onClick={() => {
                              navigation(`/profile/${e.id}`);
                            }}
                          />

                          <div className="font_name_friend">{e.userName}</div>
                        </div>

                        <div className="border_info"></div>
                      </>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/**************************************************************** */}

        <div className="all_posts_profile_page">
          <div className="userBasicInfo_title_post">
            <span className="post_title">Posts</span>
          </div>

          {(userPosts.length && user_id == state.user_id) || !show ? (
            userPosts.map((element, index) => {
              return (
                <div key={index} className="post">
                  <div className="postWrapper">
                    <div className="postTop">
                      <div className="postTopLeft">
                        <Link to={`/profile/${element.user_id}`}>
                          <img
                            alt="profile image"
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
                        {element.user_id == state.user_id?( <BsThreeDotsVertical
                          className="icon_popup"
                          onClick={() => toggleModal(element.id)}
                        />):(<></>)}
                       
                        <div>
                          {" "}
                          {modal && id == element.id && (
                            <div className="modal_Edit">
                              <div
                                onClick={toggleModal}
                                className="overlay_Edit"
                              ></div>
                              <div className="modal-content_Edit">
                                <div className="Edit_post_pagePost_p">
                                  <div className="pen_publish_p">
                                    <BsPen className="icon_pen_p" />
                                    <div className="publish_p">Edit Post</div>
                                  </div>

                                  <div className="border_bottom_create_p"></div>
                                  <div className="content_create_post_p">
                                    <img
                                    alt="user image"
                                      className="img_user_creat_post_p"
                                      src={
                                        imgUser !== "undefined"
                                          ? imgUser
                                          : noAvatar
                                      }
                                    />

                                    <textarea
                                      id="publish_p"
                                      className="textarea_p"
                                      defaultValue={element.description}
                                      rows="3"
                                      spellCheck="false"
                                      onChange={(e) => {
                                        setDescription(e.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                  <div className="upload_media_post_p">
                                    <button
                                      className="Delete_button"
                                      onClick={(e) => {
                                        handleDelete(id);
                                        toggleModal();
                                      }}
                                    >
                                      <MdDeleteForever className="rubbish" />
                                      Delete
                                    </button>

                                    <button
                                      className="button_Save"
                                      onClick={(e) => {
                                        handleUpdate(id);
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
                      </div>
                    </div>

                    <div className="postCenter">
                      <p className="postText">{element.description}</p>
                      {element.media.includes("video") ? (
                        <video controls className="postImg">
                          <source src={element.media} type="video/mp4" />
                        </video>
                      ) : (
                        <img alt="post image"
                        className="postImg" src={element.media} alt="" />
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
            })
          ) : (
            user_id == state.user_id? (<div className="Private">

            <div className="lock_style"><ImSad className="lock_icon"/></div>
            <div className="title_Private_column">
            <div className="title_Private_bold">No posts yet</div>
           
            
            </div>
            
                        </div>)
                        
                        :(<div className="Private">

<div className="lock_style"><AiFillLock className="lock_icon"/></div>
<div className="title_Private_column">
<div className="title_Private_bold">This account is private</div>
<div className="title_Private_weight">Follow this account to see their photos and videos</div>

</div>

            </div>)
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
