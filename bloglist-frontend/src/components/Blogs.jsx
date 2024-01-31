import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { initialiseBlogs, addLike } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  const addALike = async (blog) => {
    await blogService.put(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    dispatch(addLike(blog.id));
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id);
    }
    dispatch(initialiseBlogs());
  };

  return blogs.length > 0 ? (
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addALike={addALike}
          deleteBlog={deleteBlog}
        />
      ))
  ) : (
    <p>no blogs...</p>
  );
};

export default Blogs;
