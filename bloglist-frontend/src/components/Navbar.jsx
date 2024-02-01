import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/loggedInUserReducer";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex gap-4 w-full justify-between items-center p-2 bg-gray-200">
        <div className="flex gap-6 items-center ml-6">
          <h2>Blog App</h2>
          <Link to="/" className="no-underline hover:text-blue-500">
            blogs
          </Link>
          <Link to="/users" className="no-underline hover:text-blue-500">
            users
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <p>{user.name} logged in </p>
          <button
            className="btn text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => dispatch(userLogout())}
          >
            logout
          </button>
        </div>
      </div>

      <p></p>
    </>
  );
};

export default Navbar;
