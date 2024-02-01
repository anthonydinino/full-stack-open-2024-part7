import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/loggedInUserReducer";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const styles = {
    background: "lightgrey",
    display: "flex",
    gap: "0.4rem",
  };
  return (
    <>
      <div style={styles}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <p>
          {user.name} logged in{" "}
          <button onClick={() => dispatch(userLogout())}>logout</button>
        </p>
      </div>

      <p></p>
      <h2>blog app</h2>
      <br />
    </>
  );
};

export default Navbar;
