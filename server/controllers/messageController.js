const Message = require("../models/Message");
const transporter = require("../config/mail");

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required.",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || "",
      message,
    });

    try {
      const mail = await transporter.sendMail({
        from: `"Uzzi.dev" <${process.env.EMAIL_FROM}>`,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: subject
          ? `Portfolio: ${subject}`
          : `New portfolio message from ${name}`,

        text: `
You received a new message from your portfolio.

Name: ${name}
Email: ${email}
Subject: ${subject || "No subject"}

Message:
${message}
        `,

        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Portfolio Message</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${
              subject || "No subject"
            }</p>

            <hr />

            <p><strong>Message:</strong></p>

            <p style="white-space: pre-line;">
              ${message}
            </p>
          </div>
        `,
      });

      newMessage.emailSent = true;
      newMessage.emailMessageId = mail.messageId;

      await newMessage.save();
    } catch (emailError) {
      console.error("Brevo email error:", emailError);
    }

    res.status(201).json({
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      message: "Failed to send message.",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      message: "Failed to load messages.",
    });
  }
};

const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Get message error:", error);

    res.status(500).json({
      message: "Failed to load message.",
    });
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const { read } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Update message status error:", error);

    res.status(500).json({
      message: "Failed to update message.",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    res.status(200).json({
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      message: "Failed to delete message.",
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
};