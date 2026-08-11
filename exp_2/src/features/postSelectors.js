import { createSelector } from "@reduxjs/toolkit";

export const selectPostsState = (state) =>
  state.posts;

export const selectPostIds = (state) =>
  state.posts.ids;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => {
    return postsState.ids.map(
      (id) => postsState.entities[id]
    );
  }
);

export const selectPostCount = createSelector(
  [selectPostIds],
  (ids) => ids.length
);

export const selectLikedPosts = createSelector(
  [selectAllPosts],
  (posts) =>
    posts.filter((post) => post.likes > 0)
);

export const selectPostsSortedByLikes =
  createSelector(
    [selectAllPosts],
    (posts) => {
      return [...posts].sort(
        (a, b) => b.likes - a.likes
      );
    }
  );