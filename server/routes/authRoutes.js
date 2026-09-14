const express = require("express");

const { login, logout } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginRules } = require("../validators/authValidator");

const router = express.Router();

router.post("/login", loginRules, login);

router.post("/logout", logout);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
