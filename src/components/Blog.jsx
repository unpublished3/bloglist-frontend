const Blog = ({ blog }) => (
  <p>
    <span style={{fontWeight: "bold"}}>{blog.title}</span> by {blog.author}
  </p>  
)

export default Blog