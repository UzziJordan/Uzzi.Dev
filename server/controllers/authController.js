const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.COOKIE_SAME_SITE || "lax",
  path: "/api",
  maxAge: SESSION_DURATION,
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check that fields were provided
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find admin
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res
      .cookie(SESSION_COOKIE, token, sessionCookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const logout = (req, res) => {
  res
    .clearCookie(SESSION_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.COOKIE_SAME_SITE || "lax",
      path: "/api",
    })
    .status(200)
    .json({ success: true, message: "Logged out" });
};

module.exports = {
  login,
  logout,
};
