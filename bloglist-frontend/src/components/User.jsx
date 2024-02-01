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
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
