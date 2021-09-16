import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other por
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});

export { transporter };