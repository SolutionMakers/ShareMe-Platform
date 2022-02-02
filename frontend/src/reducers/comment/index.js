const initialState = {
    comment: [],
  };
   
  const commentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "ADD_COMMENT":
        return { comment: [...state.comment, payload] };
  
      default:
        return state;
    }
  };
  
  export default commentReducer;


  //  Action

export const addComment = (comment) => {
    return { type: "ADD_COMMENT", payload: comment };
  };
  