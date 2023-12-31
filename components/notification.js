import { useContext } from "react";
import classes from "./notification.module.css";
import NotificationContext from "../store/notification-context";

const Notification = (props) => {
  const { title, message, status } = props;

  const notificationCtx = useContext(NotificationContext);

  let statusClasses;

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeNotificationClass = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeNotificationClass}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
