const nodemailer = require('nodemailer');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const yourEmail = process.env.EMAIL;
const appPassword = process.env.PASSWORD;

const recipients = JSON.parse(fs.readFileSync('./email.json', 'utf8'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: yourEmail,
    pass: appPassword,
  },
});

recipients.forEach(({ name, email, msg }) => {
  const mailOptions = {
    from: yourEmail,
    to: email,
    subject: `Hello ${name}`,
    text: msg,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(`Error sending email to ${email}:`, error.message);
    } else {
      console.log(`Email sent to ${email}:`, info.response);
    }
  });
});

transporter.close();
