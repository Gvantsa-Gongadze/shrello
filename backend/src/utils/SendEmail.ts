const nodemailer = require('nodemailer');

export const sendEmail = async (email: string, url: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        },
    });

    try {
        transporter.sendMail({
            from: "ggong2016@agruni.edu.ge",
            to: email,
            subject: "Confirm Email",
            text: "Hello",
            html: url,
        });
    } catch(error) {
        console.log('error', error)
    }
}
