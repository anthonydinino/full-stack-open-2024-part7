import { useEffect } from "react";
import Notification from "./components/Notification";
import Home from "./components/Home";
import Login from "./components/Login";
import { resumeSession } from "./reducers/loggedInUserReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    dispatch(resumeSession());
  }, []);

  return (
    <div>
      <Notification />
      {loggedInUser ? <Home /> : <Login />}
    </div>
  );
};

export default App;
