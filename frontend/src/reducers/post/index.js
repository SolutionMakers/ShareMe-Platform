//initial state
const initialState = {
  posts: [],
};

//reducer function
const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_POSTS":
      return { posts: payload };

    case "ADD_POST":
      return { posts: [...state.posts, payload] };
    case "UPDATE_POST":
      return {
        posts: state.posts.map((element) => {
          if (payload.id == element.id) {
            return payload;
          } else {
            return element;
          }
        }),
      };
    case "DELETE_POST":
      return {
        posts: state.posts.filter((element) => {
          return element.id != payload;
        }),
      };
    default:
      break;
  }
};

//actions
const setPosts = (posts) => {
  return { type: "SET_POSTS", payload: posts };
};

const addPost = (newPost) => {
  return { type: "ADD_POST", payload: newPost };
};

const updatePost = (updatedPost) => {
  return { type: "UPDATE_POST", payload: updatedPost };
};

const deletePost = (id) => {
  return { type: "DELETE_POST", payload: id };
};
