import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const Blog = () => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    blogService.getOne(id).then((blog) => setBlog(blog));
  }, []);

  const blogIsFromUser = (blog) =>
    blog.user.username ===
    JSON.parse(localStorage.getItem("loggedBlogappUser")).username;

  const addComment = async (id, comment) => {
    await blogService.addComment(id, comment);
    setComment("");
    blog.comments.push(comment);
  };

  const addLike = async (blog) => {
    await blogService.put(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-3 border p-4 rounded my-4 w-full md:w-2/3">
        <div>
          <div className="flex justify-between">
            <h2>{blog.title}</h2>
            <button
              className="btn bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => addLike(blog)}
            >
              like
            </button>
          </div>
          <p>{blog.author}</p>
        </div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <div style={{ display: "flex" }}>
          <p>likes {blog.likes}</p>
        </div>

        <p>added by {blog.user.name} </p>
        {blogIsFromUser(blog) && (
          <button onClick={() => dispatch(deleteBlog(blog))}>remove</button>
        )}
      </div>
      <div className="w-full md:w-2/3">
        <h3>Comments</h3>
        <div className="flex flex-grow">
          <input
            className="border rounded px-4 py-2"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
          <button
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => addComment(blog.id, comment)}
          >
            add comment
          </button>
        </div>
        <ul className="mt-3">
          {blog.comments.map((comment, i) => (
            <li className="w-full py-1" key={i}>
              <p>{comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Blog;
