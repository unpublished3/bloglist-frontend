import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState({});

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
      sendNotification("Login successful");
      setUsername("");
      setPassword("");
    } catch (e) {
      console.error(e);
      sendNotification("Incorrect username or password", "red");
    }
  };

  const handleLogout = async (e) => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  const newBlogRef = useRef();

  const createNewBlog = async (e) => {
    e.preventDefault();
    newBlogRef.current.toggleVisibility();
    const blog = await blogService.creteNew({ title, author, url });
    setBlogs(blogs.concat(blog));
    sendNotification(`Successfully created blog ${blog.title}`, "green");
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const sendNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification("");
    }, 3000);
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
        <Notification notification={notification} />
        <span>{user.name} logged in</span> &nbsp;
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="New Blog" ref={newBlogRef}>
          {blogForm()}
        </Togglable>
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
        <Notification notification={notification} />
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

  return <div>{user ? blogList() : loginForm()}</div>;
};

export default App;
