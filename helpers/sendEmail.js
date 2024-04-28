import nodemailer from "nodemailer";
import "dotenv/config.js";

const { FROM_EMAIL, PASSWORD_EMAIL } = process.env;

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: FROM_EMAIL,
        pass: PASSWORD_EMAIL,
    },
}

const transporter = nodemailer.createTransport(config);

// const emailOptions = {
//   from: 'goitnodejs@meta.ua',
//   to: 'noresponse@gmail.com',
//   subject: 'Nodemailer test',
//   text: 'Привіт. Ми тестуємо надсилання листів!',
// };

// transporter
//         .sendMail(emailOptions)
//         .then(info => console.log(info))
//         .catch(err => console.log(err));
  
export const sendEmail = (email) => {
    transporter
        .sendMail({...email, from: FROM_EMAIL})
        .then(info => console.log(info))
        .catch(err => console.log(err.message));
}