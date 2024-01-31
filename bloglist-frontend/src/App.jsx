import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { resumeSession, setUser, userLogin } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resumeSession());
  }, []);

  const handleLogout = async (e) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userLogin(username, password));
    setUsername("");
    setPassword("");
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
        <BlogForm />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
