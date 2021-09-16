import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other por
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});

export { transporter };