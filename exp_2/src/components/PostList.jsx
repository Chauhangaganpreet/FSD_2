import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deletePost,
  likePost,
} from "../features/postSlice";

import {
  selectPostsSortedByLikes,
  selectPostCount,
} from "../features/postSelectors";

import PostItem from "./PostItem";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(
    selectPostsSortedByLikes
  );

  const postCount = useSelector(
    selectPostCount
  );

  const handleLike = useCallback(
    (id) => {
      dispatch(likePost(id));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  return (
    <div>
      <h2>
        Posts ({postCount})
      </h2>

      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default PostList;