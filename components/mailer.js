const nodemailer = require('nodemailer');
const { create } = require('express-handlebars');
const nodemailerExpressHandlebars = require('nodemailer-express-handlebars');
const path = require('path');
var dotenv = require('dotenv')

const username = process.env.MAIL_USERNAME
const password = process.env.MAIL_PASSWORD
const defaultEmail = process.env.MAIL_DEFAULT_ADDRESS
const emailPort = process.env.MAIL_PORT
const emailHost = process.env.MAIL_HOST
const emailSecure = process.env.MAIL_SECURE_TOGGLE

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort, // Use the appropriate port for your SMTP server
    secure: emailSecure, // Set to true if using port 465
    auth: {
        user: username,
        pass: password
    }
});

// Configure Handlebars for email templates
const hbs = create({
    extName: '.handlebars',
    partialsDir: path.resolve(__dirname, '/emailTemplates'),
    defaultLayout: false
});

transporter.use('compile', nodemailerExpressHandlebars({
    viewEngine: hbs,
    viewPath: path.resolve(__dirname, '/emailTemplates'),
    extName: '.handlebars'
}));

// Function to send email
const sendEmail = (to, subject, template, context) => {
    const mailOptions = {
        from: defaultEmail,
        to,
        subject,
        template,
        context
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;