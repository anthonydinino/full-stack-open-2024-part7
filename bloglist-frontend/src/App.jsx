import { useEffect } from "react";
import Notification from "./components/Notification";
import Home from "./components/Home";
import Login from "./components/Login";
import { resumeSession } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resumeSession());
  }, []);

  return (
    <div>
      <Notification />
      {user ? <Home /> : <Login />}
    </div>
  );
};

export default App;
