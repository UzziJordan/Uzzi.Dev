const express = require("express");

const {
  getContact,
  updateContact,
} = require("../controllers/contactController");

const { protect } = require("../middleware/auth");
const { updateContactRules } = require("../validators/contactValidator");

const router = express.Router();

router.get("/", getContact);

router.put("/", protect, updateContactRules, updateContact);

module.exports = router;