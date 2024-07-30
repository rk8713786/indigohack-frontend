import axios from 'axios';

// Send Email
async function sendEmailNotification(emailData) {
  try {
    const response = await axios.post('http://localhost:3001/send-email', emailData);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Send SMS
async function sendSMSNotification(smsData) {
  try {
    const response = await axios.post('http://localhost:3001/send-sms', smsData);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
}
