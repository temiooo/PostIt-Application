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

const forgotPasswordMail = (url, passwordToken) => (
  `<div>
  <p>You are receiving this because you have
  requested the reset of the password for your account.
    <br>
  Please click on the link below or paste it into your
  browser to complete the processs.
    <br>
  Please note that the link is valid for 1 hour only.
    <br>
  http://${url}/#/resetpassword/${passwordToken}
    <br>
  If you did not request this, please ignore this
  email and your password will remain unchanged.
  </p>
  </div>`
);

const resetPasswordMail = (username, url) => (
  `<div>
  <p>Hello ${username},
    <br>
  Your password has been successfully changed.
    <br>
  Click <a href='http://${url}/#/login'>here</a> 
  to login
  </p>
  </div>`
);

const msgPriorityMail = (username, groupname, url) => (
  `<div>
  <p>Hi there,
    <br>
  <strong>${username}</strong> 
  just posted a new message on Group: ${groupname}
    <br>
  Login <a href='http://${url}/#/login'>here</a>
  to view your messages.
  </p>
  </div>`
);

export {
  transporter, mailOptions, forgotPasswordMail,
  resetPasswordMail, msgPriorityMail
};
