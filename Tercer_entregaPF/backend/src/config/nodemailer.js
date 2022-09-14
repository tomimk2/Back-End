const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jotita.ta@gmail.com',
        pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    transporter
}