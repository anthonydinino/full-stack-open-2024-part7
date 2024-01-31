import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addALike, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogIsFromUser = (blog) =>
    blog.user.username ===
    JSON.parse(localStorage.getItem("loggedBlogappUser")).username;

  const blogDetails = () => {
    return (
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <div style={{ display: "flex" }}>
          <p>likes {blog.likes}</p>
          <button onClick={() => dispatch(addALike(blog))}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {blogIsFromUser(blog) && (
          <button onClick={() => dispatch(deleteBlog(blog))}>remove</button>
        )}
      </div>
    );
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowBlog(!showBlog)}>
        {showBlog ? "hide" : "view"}
      </button>
      {showBlog && blogDetails()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
