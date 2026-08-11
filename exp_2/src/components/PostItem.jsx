import React from "react";

function PostItem({ post, onLike, onDelete }) {
  console.log(
    "Rendering Post:",
    post.title
  );

  return (
    <div className="card">
      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <p>
        Likes: {post.likes}
      </p>

      <button
        onClick={() => onLike(post.id)}
      >
        Like
      </button>

      <button
        onClick={() => onDelete(post.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default React.memo(PostItem);