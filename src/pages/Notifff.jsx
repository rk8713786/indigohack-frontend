import React, { useEffect } from 'react';
import { db } from '../firebase';
import { sendNotification } from './../components/notificationService';

const Notifff = () => {
  useEffect(() => {
    const fetchNotifications = async () => {
      const snapshot = await db.collection('notifications').get();
      snapshot.forEach(doc => {
        const data = doc.data();
        const { method, recipient, message } = data;

        sendNotification(method, recipient, message);
      });
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notification Sender</h1>
    </div>
  );
};

export default Notifff;
