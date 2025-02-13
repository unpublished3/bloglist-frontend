import { useState } from "react";

const Blog = ({ blog, likeBlog }) => {
  const [completelyVisible, setCompleteVisible] = useState(false);

  const toggleVisibility = () => setCompleteVisible(!completelyVisible);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "inline-block",
    padding: 4,
  };

  const informationStyle = {
    display: completelyVisible ? "" : "none",
    margin: 1,
  };

  const handleLikes = (e) => {
    e.preventDefault();
    likeBlog({...blog, likes: blog.likes + 1})
  }

  return (
    <>
      <div style={blogStyle}>
        <span style={{ fontWeight: "bold" }}>{blog.title}</span> &nbsp;
        Likes: {blog.likes} &nbsp;
        <button onClick={toggleVisibility}>
          {!completelyVisible ? "View " : "Hide"}
        </button>
        <p style={informationStyle}>Url: {blog.url}</p>
        <p style={informationStyle}>
          Likes: {blog.likes} &nbsp;
          <button onClick={handleLikes}>Like</button>
        </p>
        <p style={informationStyle}>Author: {blog.author}</p>
      </div>
      <br />
    </>
  );
};

export default Blog;
