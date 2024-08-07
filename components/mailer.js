const nodemailer = require('nodemailer');
const { create } = require('express-handlebars');
const nodemailerExpressHandlebars = require('nodemailer-express-handlebars');
const path = require('path');
var dotenv = require('dotenv')

const username = process.env.MAIL_USERNAME
const password = process.env.MAIL_PASSWORD
const defaultEmail = process.env.MAIL_DEFAULT_ADDRESS
const emailPort = process.env.MAIL_PORT || 465
const emailHost = process.env.MAIL_HOST
const env = process.env.NODE_ENV || 'local'

var emailTemplatePath = './emailTemplates'

if (env === 'production' || env === 'staging') {
    emailTemplatePath = './emailTemplates'
}

// Configure the email transporter
const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort, // Use the appropriate port for your SMTP server
    secure: true, // Set to true if using port 465
    auth: {
        type: 'LOGIN',
        user: username,
        pass: password
    }
});

// Configure Handlebars for email templates
const hbs = create({
    extName: '.handlebars',
    partialsDir: path.resolve(emailTemplatePath),
    defaultLayout: false
});

transporter.use('compile', nodemailerExpressHandlebars({
    viewEngine: hbs,
    viewPath: path.resolve(emailTemplatePath),
    extName: '.handlebars'
}));

// Function to send email
const sendEmail = (to, subject, template, context) => {
    const mailOptions = {
        from: defaultEmail,
        to: to.join(','),
        subject,
        template,
        context
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;