const { body } = require("express-validator");
const validate = require("./validate");

const loginRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  validate,
];

module.exports = {
  loginRules,
};
