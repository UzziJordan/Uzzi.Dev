const express = require("express");

const {
  getStack,
  updateStack,
} = require("../controllers/stackController");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getStack);

router.put("/", protect, updateStack);

module.exports = router;