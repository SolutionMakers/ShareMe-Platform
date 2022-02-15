import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";

import { BsFillXCircleFill, BsPen } from "react-icons/bs";
import noAvatar from "../../images/noAvatar.png";
import "../NewPost/NewPost.css";

const NewPost = () => {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [modal, setModal] = useState(true);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const imgUser = localStorage.getItem("img");
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      posts: state.postsReducer.posts,
    };
  });
  /******************************************* */

  const uploadimage = async () => {
    const formData = new FormData();
    formData.append("file", uploadedImage);
    formData.append("upload_preset", "wyggi4ze");

    await axios
      .post(
        uploadedImage.type?.split("/")[0] == "video"
          ? "https://api.cloudinary.com/v1_1/dvg9eijgb/video/upload"
          : "https://api.cloudinary.com/v1_1/dvg9eijgb/image/upload",
        formData
      )
      .then((response) => {
        setMedia(response.data.secure_url);
      })
      .catch((err) => {
        throw err;
      });
  };

  const createNewPost = () => {
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
      })
      .catch((err) => {
        throw err;
      });
  };
  /**************************************** */

  return (
    <div className="creat_post_all">
      {modal && (
        <div className="modal_create">
          <div className="overlay_create">
            <div className="modal-content_create">
              <div className="create_post_pagePost">
                <div className="pen_publish_pagePost">
                  <BsPen className="icon_pen_pagePost" />
                  <div className="publish_pagePost">publish</div>
                </div>

                <div className="border_bottom_create_pagePost"></div>
                <div className="content_create_post_pagePost">
                  <img
                    className="img_user_creat_post_pagePost"
                    src={imgUser !== "undefined" ? imgUser : noAvatar}
                  />

                  <textarea
                    id="publish_pagePost"
                    className="textarea_pagePost"
                    rows="3"
                    placeholder="Write something about you..."
                    spellCheck="false"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="upload_media_post_pagePost">
                  <div className="compose-option_pagePost">
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
                    <span className="media_pagePost">Media</span>
                    <input
                      id="feed-upload-input-2_pagePost"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        setUploadedImage(e.target.files[0]);
                      }}
                    />
                  </div>
                  <button
                    className="upload_button"
                    onClick={(e) => {
                      uploadimage();

                      e.target.style.background = "#C7C52C";
                      e.target.style.color = "#ffff";
                    }}
                  >
                    upload
                  </button>
                  <button
                    className="button_craet_post_pagePost"
                    onClick={(e) => {
                      createNewPost();
                      navigator("/Home");
                    }}
                  >
                    publish
                  </button>
                </div>
              </div>
              <BsFillXCircleFill
                className="close-modal_create"
                onClick={() => {
                  navigator("/Home");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPost;
