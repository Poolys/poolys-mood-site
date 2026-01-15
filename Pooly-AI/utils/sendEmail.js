import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'outlook', // o 'outlook', 'yahoo', ecc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // password app se usi Gmail
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