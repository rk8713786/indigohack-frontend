const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3001; // Choose any port that is free

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'airlinessystem821@gmail.com', // Replace with your email
    pass: 'kzxs fkwe rhwf vbgd'   // Replace with your email password
  }
});

// Twilio configuration
const accountSid = 'AC2dab0eebb4483c7509cd9d6244af138c'; // Replace with your Twilio Account SID
const authToken = 'e77813b665ecd72fba485a1f088ca8c1';   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Route to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: 'rjm9871@gmail.com', // Replace with your email
      to:'rk99576@gmail.com',
      subject:"Testing",
      text:"Hello"
    });
    res.status(200).send(`Email sent successfully: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// Route to send SMS
app.post('/send-sms', async (req, res) => {
  const { to, body } = req.body;

  try {
    const message = await client.messages.create({
      body: "Hi Rahul",
      from: '+16187624806', // Replace with your Twilio phone number
      to: '+919911069251'
    });
    res.status(200).send(`Message sent successfully: ${message.sid}`);
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).send('Error sending SMS');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
