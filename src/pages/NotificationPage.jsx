import React, { useEffect } from "react";
import { useFlight } from "../Contexts/Flights";
import NotificationCard from "../components/NotificationCard";

const NotificationPage = () => {
  const { currentUser, fetchNotifications, msgData } = useFlight();
  useEffect(() => {
    fetchNotifications();
  }, []);

  if (msgData.recipient === currentUser.email) {
    return (
      <div className="notification-page">
        <h2 className="display-4 text-primary text-center mt-5">
          Notifications
        </h2>
        <div className="notification-list mt-3">
          {
            <NotificationCard
              key={msgData.id}
              message={msgData.message}
              time={msgData.timestamp}
            />
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="notification-page">
        <h2 className="display-4 text-primary text-center mt-5">
          Notifications
        </h2>
        <div className="notification-list mt-3">
          <h5>No Notifications</h5>
        </div>
      </div>
    );
  }
};

export default NotificationPage;
