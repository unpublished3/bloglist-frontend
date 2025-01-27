import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserString = window.localStorage.getItem("loggedInUser");
    if (loggedInUserString) {
      const loggedInUser = JSON.parse(loggedInUserString);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async (e) => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  const createNewBlog = async (e) => {
    e.preventDefault();
    console.log(":)");
    const blog = await blogService.creteNew({ title, author, url });
    setBlogs(blogs.concat(blog))
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const blogForm = () => {
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

  const blogList = () => {
    return (
      <div>
        <h2>BlogList</h2>
        <span>{user.name} logged in</span> &nbsp;
        <button onClick={handleLogout}>Logout</button>
        {blogForm()}
        <h3>Blogs</h3>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  return user ? blogList() : loginForm();
};

export default App;
