const express = require("express");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001; // Choose any port that is free

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.REACT_APP_USER, // Replace with your email
    pass: process.env.REACT_APP_PASS, // Replace with your email password
  },
});

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid); // Replace with your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Route to send email
app.post("/send-email", async (req, res) => {
  const to = req.body.recipient;
  const text = "Dear Customer\n" + req.body.message;
  console.log(req.body);
  try {
    const info = await transporter.sendMail({
      from: process.env.REACT_APP_USER, // Replace with your email
      to: to,
      subject: "Flight Update",
      text: text,
    });
    res.status(200).send(`Email sent successfully: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Route to send SMS
app.post("/send-sms", async (req, res) => {
  console.log(req.body);
  const to = req.body.recipient;
  const body = "Dear Customer\n" + req.body.message;
  console.log(to);
  try {
    const message = await client.messages.create({
      body: body,
      from: process.env.REACT_APP_FROM_MOB_NO, // Replace with your Twilio phone number
      to: to,
    });
    res.status(200).send(`Message sent successfully: ${message.sid}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).send("Error sending SMS");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
