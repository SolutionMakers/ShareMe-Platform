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
 const  [comment,setComment]=useState('');


const getCommentsByUserID= async ()=>{
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
}

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
  const createNewComment = async ()=>{
  try {
    const res = await axios.post(`http://localhost:5000/posts/${id}/comments`,
    { comment,},{
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    if (res.data.success) {
      console.log('done')
      setComment(res.data.results);
    } 
    
  } catch (error) {
    if (error.response && error.response.data) {
     console.log(error.response.data);
    }
    
  }
}
  useEffect(() => {
    getPostByID();
    getCommentsByUserID();
  },[comment]);

  return (
    <div>
       
        <>
          <p>{post.userName}</p>
          <img src={post.profileimage} />
          <p>{post.description}</p>
          <img src={post.media} />
          {comments.length?comments.map((element,index)=>{
            return (<div key ={index}>
              <p>{element.userName}</p>
              <img src={element.profileimage}/>
              <p>{element.comment}</p>
            </div>)
          }):<></>}
        </>
        <input
          type="text"
          placeholder="Whats on your Mind ?"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button onClick={createNewComment}>Comment</button>
       
    </div>
  );
};

export default SinglePostPage;
