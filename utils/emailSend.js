import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();


// Defining __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
});


export const sendVerificationEmail = async (email, token) => {
    // Read the HTML template
  const templatePath = path.join(__dirname, '../emailTemplate/registrationTemplate.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  htmlContent = htmlContent.replace('{{token}}', token);

  const mailOptions = {
    from: 'poshcoderbd@gmail.com',
    to: email,
    subject: 'Verify your email',
    html: htmlContent, // Set the email content to the HTML template
  };

  await transporter.sendMail(mailOptions);
};
// export const sendVerificationEmail = async (email, token) => {
//   const mailOptions = {
//     from: 'poshcoderbd@gmail.com',
//     to: email,
//     subject: 'Posh Coder Email Verification',
//     text: `Please verify your email by clicking the following link: 
//     https://www.poshcoder.com/verify-email?token=${token}`
//   };

//   await transporter.sendMail(mailOptions);
// };

export const sendOrderCreateEmail = async (orderDetails) => {

  const templatePath = path.resolve(__dirname, '../emailTemplate/orderCreateTemplate.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  htmlContent = htmlContent.replace('{{orderName}}', orderDetails.orderName)
                           .replace('{{name}}', orderDetails.name)
                           .replace('{{phone}}', orderDetails.phone)
                           .replace('{{desc}}', orderDetails.desc)
                           .replace('{{status}}', orderDetails.status)
                           .replace('{{username}}', orderDetails.user.username)
                           .replace('{{email}}', orderDetails.user.email);

  const mailOptions = {
    from: 'poshcoderbd@gmail.com',
    to: 'poshcoderbd@gmail.com',
    subject: 'New Order Placed',
    html: htmlContent, // Use the HTML template
  };

  await transporter.sendMail(mailOptions);
};


// send order confirmation to the user
export const sendUserOrderConfirmationEmail = async (orderDetails) => {
  const templatePath = path.resolve(__dirname, '../emailTemplate/userOrderConfirmationTemplate.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  htmlContent = htmlContent.replace('{{name}}', orderDetails.name)
                           .replace('{{orderName}}', orderDetails.orderName)
                           .replace('{{status}}', orderDetails.status)
                           .replace('{{desc}}', orderDetails.desc)
                           .replace('{{phone}}', orderDetails.phone);

  const mailOptions = {
    from: 'poshcoderbd@gmail.com',
    to: orderDetails.user.email,
    subject: 'Your Order Confirmation',
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};