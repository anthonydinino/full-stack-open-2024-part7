import { useState, useEffect } from "react";
import userService from "../services/users";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService
      .getAll()
      .then((data) => setUsers(data))
      .catch((err) =>
        dispatch(setNotification({ message: err.message, isError: true }, 3))
      );
  });

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`${user.id}`} state={user}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
