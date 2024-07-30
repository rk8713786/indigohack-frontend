import { functions } from '../firebase';

const sendNotification = async (method, recipient, message) => {
  const sendNotificationFunction = functions.httpsCallable('sendNotification');
  try {
    const result = await sendNotificationFunction({ method, recipient, message });
    if (result.data.success) {
      console.log(`${method} notification sent successfully`);
    } else {
      console.error(`Error sending ${method} notification:`, result.data.error);
    }
  } catch (error) {
    console.error(`Error calling sendNotification function:`, error);
  }
};

export { sendNotification };