const { body } = require("express-validator");
const validate = require("./validate");

const updateContactRules = [
  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("githubUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("linkedinUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn URL must be a valid URL"),
  body("twitterUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Twitter URL must be a valid URL"),
  validate,
];

module.exports = {
  updateContactRules,
};
