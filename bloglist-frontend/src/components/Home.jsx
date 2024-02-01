import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/loggedInUserReducer";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import User from "./User";

const Home = () => {
  const user = useSelector((state) => state.loggedInUser);
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
        <Route path="/users/:id" element={<User />} />
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
