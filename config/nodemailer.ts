import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// SMTP service for creating a transporter
const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.EMAIL_PASS,
     },
});

export default transporter;
