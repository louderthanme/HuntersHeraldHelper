import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const user = process.env.HUNTER_HERALD_EMAIL;
const pass = process.env.HUNTER_HERALD_PASSWORD;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass,
    }
});

export const sendEmail = async (email, subject, text, image) => {
    console.log('Sending email');

    const mailOptions = {
        from: user,
        to: email,
        subject,
        text,
        attachments: [
            {
                filename: 'CurrentCalendar.png',
                path: image,
            }
        ]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
}