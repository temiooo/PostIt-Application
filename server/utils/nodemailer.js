const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const mailOptions = (to, bcc, subject, html) => ({
  from: '"PostIt" <mypostitapp1@gmail.com>',
  to,
  bcc,
  subject,
  html,
});

export { transporter, mailOptions };
