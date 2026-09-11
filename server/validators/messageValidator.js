const { body } = require("express-validator");
const validate = require("./validate");

const createMessageRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("subject")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Subject cannot exceed 200 characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ min: 5, max: 5000 })
    .withMessage("Message must be between 5 and 5000 characters"),
  validate,
];

module.exports = {
  createMessageRules,
};
