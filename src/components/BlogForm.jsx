import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNewBlog = async (e) => {
    e.preventDefault();
    addBlog({title, author, url})
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={createNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
