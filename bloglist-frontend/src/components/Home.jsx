import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/userReducer";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button onClick={() => dispatch(userLogout())}>logout</button>
      </p>
      <br />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="create new blog">
                <BlogForm />
              </Togglable>
              <Blogs />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Home;
