import React, { useEffect } from "react";
import { setPosts } from "../reducers/post/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
/************************** */
const Home = () => {
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
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="post">
      <div>All Posts</div>
      {state.posts.map((element, i) => {
        return (
          <>
            <div key={i}>
              <div className="onePost">
                <div>{element.media}</div>
                <div>{element.description}</div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Home;
