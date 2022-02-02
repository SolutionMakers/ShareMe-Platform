import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const [post, setPost] = useState({});
  const [comments,setComments]= useState([]);
const getCommentsByUserID= async ()=>{
  try {
    const res = await axios.get(`http://localhost:5000/all/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    if (res.data.success) {
      console.log(res.data.results)

      setComments(res.data.results);
    } 
    
  } catch (error) {
    if (error.response && error.response.data) {
     console.log(error.response.data.message);
    }
    
  }
}

  const getPostByID = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${id}/post`);
      if (res.data.success) {
      // console.log(res.data.results)

        setPost(res.data.results[0]);
      } 
      
    } catch (error) {
      if (error.response && error.response.data) {
       console.log(error.response.data.message);
      }
      
    }
  };
  useEffect(() => {
    getPostByID();
    getCommentsByUserID();
  },[]);

  return (
    <div>
       
        <>
          <p>{post.userName}</p>
          <img src={post.profileimage} />
          <p>{post.description}</p>
          <img src={post.media} />
          {comments.length?comments.map((element)=>{
            return (<div>
              <p>{element.userName}</p>
              <img src={element.profileimage}/>
              <p>{element.comment}</p>
            </div>)
          }):<></>}
        </>
       
    </div>
  );
};

export default SinglePostPage;
