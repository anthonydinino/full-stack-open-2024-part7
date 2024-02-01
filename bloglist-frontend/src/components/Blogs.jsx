import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialiseBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, []);

  return blogs.length > 0 ? (
    <div className="flex flex-col py-3 w-full">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link
            key={blog.id}
            className="no-underline even:bg-slate-100 hover:bg-slate-200 border border-slate-100 hover:even:border-slate-200 p-5"
            to={`blogs/${blog.id}`}
          >
            {blog.title} <p className="text-black">{blog.author}</p>
            <div className=""></div>
          </Link>
        ))}
    </div>
  ) : (
    <p>no blogs...</p>
  );
};

export default Blogs;
