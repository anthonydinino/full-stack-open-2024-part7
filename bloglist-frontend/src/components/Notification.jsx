import { useSelector } from "react-redux";

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification);
  if (message) {
    return (
      <div className={`notification ${isError && "error"}`}>{message}</div>
    );
  } else {
    return <></>;
  }
};

export default Notification;
