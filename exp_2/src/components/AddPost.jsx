import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/postSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      likes: 0,
    };

    dispatch(addPost(newPost));

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Post</h2>

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Post content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button type="submit">
        Add Post
      </button>
    </form>
  );
}

export default AddPost;