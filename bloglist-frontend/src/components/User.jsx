import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    userService
      .getOne(id)
      .then((user) => setUser(user))
      .catch((err) => dispatch(setNotification(err.message, 3)));
  }, []);

  if (!user.blogs) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul className="flex flex-col py-3 w-full">
        {user.blogs.map((blog) => (
          <li
            className="no-underline even:bg-slate-100 hover:bg-slate-200 border border-slate-100 hover:even:border-slate-200 p-5"
            key={blog.id}
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
