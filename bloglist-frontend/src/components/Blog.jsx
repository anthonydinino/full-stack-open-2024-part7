import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addALike, deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const Blog = () => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    blogService.getOne(id).then((blog) => setBlog(blog));
  });

  const blogIsFromUser = (blog) =>
    blog.user.username ===
    JSON.parse(localStorage.getItem("loggedBlogappUser")).username;

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div style={{ display: "flex" }}>
        <p>likes {blog.likes}</p>
        <button onClick={() => dispatch(addALike(blog))}>like</button>
      </div>
      <p>{blog.author}</p>
      <p>added by {blog.user.name} </p>
      {blogIsFromUser(blog) && (
        <button onClick={() => dispatch(deleteBlog(blog))}>remove</button>
      )}
    </div>
  );
};

export default Blog;
