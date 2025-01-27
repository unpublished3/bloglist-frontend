const Notification = ({ notification }) => {
  return notification.text ? (
    <p className="notification" style={{ color: notification.type }}>
      {notification.text}
    </p>
  ) : (
    <></>
  );
};

export default Notification;
