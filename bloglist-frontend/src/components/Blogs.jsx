import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialiseBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  return blogs.length > 0 ? (
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))
  ) : (
    <p>no blogs...</p>
  );
};

export default Blogs;
