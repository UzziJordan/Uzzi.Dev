const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getSessionToken = (req) => {
  const cookie = req.headers.cookie || "";
  const session = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("admin_session="));

  return session ? decodeURIComponent(session.slice("admin_session=".length)) : null;
};

const protect = async (req, res, next) => {
  try {
    const token = getSessionToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  protect,
};
