import React from "react";
import "./css/NotificationCard.css";

const NotificationCard = ({ type, message, date, time }) => {
  return (
    <div className="notification-card">
      <h5> Notification</h5>
      <p>{message}</p>
      <p>{time}</p>
    </div>
  );
};

export default NotificationCard;
