import PropTypes from "prop-types";

const Notification = ({ messageInfo }) => {
  if (messageInfo) {
    const { message, isError } = messageInfo;
    return (
      <div className={`notification ${isError && "error"}`}>{message}</div>
    );
  } else {
    return <></>;
  }
};

Notification.propTypes = {
  messageInfo: PropTypes.string,
};

export default Notification;
