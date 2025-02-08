import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
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

  const loginUser = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      setUser(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      sendNotification("Login successful");
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

  const addBlog = async (blogObject) => {
    newBlogRef.current.toggleVisibility();
    const blog = await blogService.creteNew(blogObject);
    setBlogs(blogs.concat(blog));
    sendNotification(`Successfully created blog ${blog.title}`, "green");
  };

  const sendNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const blogList = () => {
    return (
      <div>
        <h2>BlogList</h2>
        <Notification notification={notification} />
        <span>{user.name} logged in</span> &nbsp;
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="New Blog" ref={newBlogRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        <h3>Blogs</h3>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {user ? (
        blogList()
      ) : (
        <LoginForm loginUser={loginUser} notification={notification} />
      )}
    </div>
  );
};

export default App;
