const nodemailer = require('nodemailer');
const logger = require('./winston');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'solchi.test@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});

const mailOptions = {
    from: 'Servidor Node.js',
    to: 'solchi.test@gmail.com',
    subject: 'Nuevo registro'
}

const send = async (message) => {
    try {
        mailOptions.html = message;
        await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    send
}