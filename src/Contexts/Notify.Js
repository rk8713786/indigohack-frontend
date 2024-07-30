const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

admin.initializeApp();

const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = 'YOUR_TWILIO_PHONE_NUMBER';
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

exports.sendNotification = functions.https.onCall(async (data, context) => {
  const { method, recipient, message } = data;

  try {
    switch (method) {
      case 'SMS':
        await client.messages.create({
          body: message,
          from: TWILIO_PHONE_NUMBER,
          to: recipient,
        });
        break;
      case 'Email':
        await transporter.sendMail({
          from: 'your-email@gmail.com',
          to: recipient,
          subject: 'Flight Notification',
          text: message,
        });
        break;
      case 'App':
        await admin.messaging().sendToDevice(recipient, {
          notification: {
            title: 'Flight Notification',
            body: message,
          },
        });
        break;
      default:
        throw new Error('Unknown notification method');
    }
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: error.message };
  }
});
