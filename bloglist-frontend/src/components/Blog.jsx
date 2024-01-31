import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [showBlog, setShowBlog] = useState(false);

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
          <button onClick={() => addLike(blog)}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {blogIsFromUser(blog) && (
          <button onClick={() => deleteBlog(blog)}>remove</button>
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
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
