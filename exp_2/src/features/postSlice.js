import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {
    1: {
      id: 1,
      title: "Learning Redux Toolkit",
      content: "Redux provides centralized state management.",
      likes: 0,
    },
    2: {
      id: 2,
      title: "React Performance",
      content: "Memoized selectors improve performance.",
      likes: 0,
    },
  },

  ids: [1, 2],
};

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: (state, action) => {
      const post = action.payload;

      state.entities[post.id] = post;
      state.ids.push(post.id);
    },

    deletePost: (state, action) => {
      const id = action.payload;

      delete state.entities[id];

      state.ids = state.ids.filter(
        (postId) => postId !== id
      );
    },

    likePost: (state, action) => {
      const id = action.payload;

      if (state.entities[id]) {
        state.entities[id].likes += 1;
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  likePost,
} = postSlice.actions;

export default postSlice.reducer;