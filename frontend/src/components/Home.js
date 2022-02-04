import React, { useState, useEffect } from "react";
import { setPosts, updatePost, deletePost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

/************************** */
const Home = () => {
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

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

  return (
    <div className="post">
      <div>All Posts</div>

      {state.posts.map((element, i) => {
        return (
          <div key={i}>
            <div>
              <div className="onePost">
                <div>
                  {" "}
                  {modal && id == element.id && (
                    <div className="modal">
                      <div onClick={toggleModal} className="overlay"></div>
                      <div className="modal-content">
                        <h2>Hello Modal</h2>
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
                          className="close-modal"
                          onClick={() => toggleModal("")}
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>{element.media}</div>
                <div>{element.description}</div>
                <div>{element.profileimage}</div>
                <div>{element.userName}</div>

                <button
                  onClick={() => toggleModal(element.id)}
                  className="btn-modal"
                >
                  My Modal
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

