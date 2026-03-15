import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Usa Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Password app di Gmail
  }
});

export async function sendEmail({ subject, text }) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.MY_EMAIL, // ← il tuo indirizzo
    subject,
    text
  });
}