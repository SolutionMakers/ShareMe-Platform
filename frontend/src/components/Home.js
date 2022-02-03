import React, { useState, useEffect } from "react";
import { setPosts, updatePost } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
/************************** */
const Home = () => {
  const [description, setDescription] = useState("");
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

  /********************************************** */

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
                <div>{element.media}</div>
                <div>{element.description}</div>
                <div>{element.profileimage}</div>
                <div>{element.userName}</div>
                <input
                  type="text"
                  placeholder="updated description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <button
                  onClick={async () => {
                    try {
                      const newPost = {
                        description,
                      };
                      const res = await axios.put(
                        `http://localhost:5000/posts/${element.id}/post`,
                        newPost,
                        {
                          headers: {
                            Authorization: `Bearer ${state.token}`,
                          },
                        }
                      );
                      console.log(newPost);
                      if (res.data.success) {
                        console.log(`done`);
                        dispatch(updatePost(newPost));
                        getAllPosts();
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Update
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
