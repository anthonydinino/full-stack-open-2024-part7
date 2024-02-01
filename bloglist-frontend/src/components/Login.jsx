import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../reducers/loggedInUserReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="grid place-items-center">
      <h2 className="mb-5 text-center">Log in to application</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-3">
          <p>username</p>
          <input
            className="border rounded w-full px-4 py-2"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div className="flex items-center gap-3">
          <p>password</p>
          <input
            className="border rounded w-full px-4 py-2"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button
          className="btn border bg-blue-500 hover:bg-blue-600 text-white"
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
