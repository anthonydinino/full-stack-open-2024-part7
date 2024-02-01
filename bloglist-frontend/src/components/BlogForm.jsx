import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const dispatch = useDispatch();

  const addBlog = async (e) => {
    e.preventDefault();
    dispatch(createBlog(newBlog));
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog} className="flex flex-col gap-5 py-5">
        <div>
          <label htmlFor="Title">title:</label>
          <input
            className="border rounded w-full px-4 py-2"
            id="blog-title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, title: target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="Author">author:</label>
          <input
            className="border rounded w-full px-4 py-2"
            id="blog-author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, author: target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="Url">url:</label>
          <input
            className="border rounded w-full px-4 py-2"
            id="blog-url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, url: target.value });
            }}
          />
        </div>
        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white"
          type="submit"
        >
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
