const express = require("express");

const {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} = require("../controllers/messageController");

const { protect } = require("../middleware/auth");
const { createMessageRules } = require("../validators/messageValidator");

const router = express.Router();

router.post("/", createMessageRules, createMessage);

router.get("/", protect, getMessages);

router.get("/:id", protect, getMessageById);

router.patch("/:id/status", protect, updateMessageStatus);

router.delete("/:id", protect, deleteMessage);

module.exports = router;