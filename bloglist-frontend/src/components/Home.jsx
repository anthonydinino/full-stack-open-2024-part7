import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import Blog from "./Blog";

import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import User from "./User";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
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
