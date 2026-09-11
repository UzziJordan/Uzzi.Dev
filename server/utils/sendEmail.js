const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactNotification = async ({
  name,
  email,
  message,
}) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_FROM}>`,
    to: process.env.CONTACT_EMAIL,

    // This is the important part.
    // Clicking "Reply" in your email will reply to the visitor.
    replyTo: email,

    subject: `New portfolio message from ${name}`,

    text: `
You received a new message from your portfolio.

Name: ${name}
Email: ${email}

Message:
${message}
    `.trim(),

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Portfolio Message</h2>

        <p>
          You received a new message through your portfolio website.
        </p>

        <hr />

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong>
          <a href="mailto:${email}">${email}</a>
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p style="white-space: pre-line;">
          ${message}
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactNotification,
};