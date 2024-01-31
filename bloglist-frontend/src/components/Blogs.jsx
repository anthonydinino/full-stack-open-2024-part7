import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { initialiseBlogs } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  return blogs.length > 0 ? (
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => <Blog key={blog.id} blog={blog} />)
  ) : (
    <p>no blogs...</p>
  );
};

export default Blogs;
