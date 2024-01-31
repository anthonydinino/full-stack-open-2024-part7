import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const addLike = async (blog) => {
    await blogService.put(blog.id, {
      ...blog,
      likes: ++blog.likes,
      user: blog.user.id,
    });
    refreshBlogs();
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id);
      refreshBlogs();
    }
  };

  const refreshBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const createBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog);
      dispatch(
        setNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            isError: false,
          },
          3
        )
      );
      refreshBlogs();
    } catch (error) {
      dispatch(setNotification({ message: error.message, isError: true }, 3));
    }
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (e) => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: e.response?.status
              ? "wrong username or password"
              : "something went wrong",
            isError: true,
          },
          3
        )
      );
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.username} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <br />
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
