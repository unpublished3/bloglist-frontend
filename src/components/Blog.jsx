import { useState } from "react"

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {
  const [completelyVisible, setCompleteVisible] = useState(false)

  const toggleVisibility = () => setCompleteVisible(!completelyVisible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "inline-block",
    padding: 4,
  }

  const informationStyle = {
    display: completelyVisible ? "" : "none",
    margin: 1,
  }

  const showDelete = {
    display: username === blog.user.username ? "" : "none",
  }

  const handleLikes = (e) => {
    e.preventDefault()
    likeBlog({ ...blog, likes: blog.likes + 1 })
  }

  const onDelete = (e) => {
    e.preventDefault()
    if (window.confirm(`Delete ${blog.title}?`)) deleteBlog(blog.id)
  }

  return (
    <>
      <div style={blogStyle}>
        <span style={{ fontWeight: "bold" }}>{blog.title}</span>
        <span> by {blog.author}</span> &nbsp;
        <button onClick={toggleVisibility}>
          {!completelyVisible ? "View " : "Hide"}
        </button>
        <div style={informationStyle}>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes} &nbsp;
            <button onClick={handleLikes}>Like</button>
          </p>
          <button style={showDelete} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      <br />
    </>
  )
}

export default Blog
