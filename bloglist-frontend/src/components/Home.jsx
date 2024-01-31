import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/userReducer";

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
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
      <Blogs />
    </>
  );
};

export default Home;
