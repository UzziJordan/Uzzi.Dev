const express = require("express");

const { login } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginRules } = require("../validators/authValidator");

const router = express.Router();

router.post("/login", loginRules, login);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;