import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { user_id } = useParams();

  const [userPosts, setUserPosts] = useState([]);
  const getPostsByUserId = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${user_id}`);
      if (res.data.success) {
        setUserPosts(res.data.results);
        console.log(`All the posts for this user_id ${user_id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userPosts);
  /***************************************** */
  useEffect(() => {
    getPostsByUserId();
  }, []);
  return (
    <>
      <div>Profile Page</div>
      {userPosts.length
        ? userPosts.map((element, index) => {
            return (
              <div key={index}>
                <h1>User Posts:</h1>
                <h1>{element.media}</h1>
                <h1>{element.description}</h1>
                <h1>user Info</h1>
                <h1>{element.userName}</h1>
                <h1>{element.email}</h1>
                <h1>{element.dob}</h1>
                <h1>{element.country}</h1>
                <h1>{element.profileimage}</h1>
                <h1>{element.gender}</h1>
              </div>
            );
          })
        : "No Posts for this user"}
    </>
  );
};

export default ProfilePage;
