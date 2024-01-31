import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const addBlog = async (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="Title">title:</label>
        <input
          id="blog-title"
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, title: target.value });
          }}
        />
        <br />
        <label htmlFor="Author">author:</label>
        <input
          id="blog-author"
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, author: target.value });
          }}
        />
        <br />
        <label htmlFor="Url">url:</label>
        <input
          id="blog-url"
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) => {
            setNewBlog({ ...newBlog, url: target.value });
          }}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
