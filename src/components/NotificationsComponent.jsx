import React, { useEffect } from "react";
import { useFlight } from "../Contexts/Flights";

function NotificationsComponent() {
  const { fetchNotifications, msgData  } = useFlight();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      {msgData.map((msg, index) => (
        <div key={index}>
          <h6>{msg.Message}</h6>
          <h6>{msg.Message}</h6>
          <h6>{msg.Message}</h6>
          <h6>{msg.Message}</h6>
          <h6>{msg.Message}</h6>
          <h6>{msg.Message}</h6>
          <h6>{msg.Message}</h6>
        </div>
      ))}
      
    </div>
  );
}

export default NotificationsComponent;
