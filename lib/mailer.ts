import nodemailer from "nodemailer";
import "dotenv/config";


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.GOOGLE_APP_PASSWORD!,
    },
    secure: true, // Enforces SSL/TLS
    pool: true, // Enables connection pooling
    maxConnections: 5, // Maximum number of connections
    maxMessages: 100, // Maximum number of messages per connection
});

/**
 * Sends an email using the configured transporter.
 * @param to Recipient email address.
 * @param subject Subject of the email.
 * @param html HTML content of the email.
 * @returns Information about the sent email.
 */
export async function sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
        from: `"Coreflex Pilates Studio" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error: any) {
        console.error(`Failed to send email: ${error.message}`);
        throw error;
    }
}

/**
 * Sends an OTP email.
 * @param to Recipient email address.
 * @param otp OTP to send.
 * @returns Information about the sent email.
 */
export async function sendOTPEmail(to: string, otp: string) {
    const subject = "Your Coreflex OTP";
    const html = `<p>Your OTP is: <b>${otp}</b>. It will expire in 5 minutes.</p>`;
    return sendEmail(to, subject, html);
}
