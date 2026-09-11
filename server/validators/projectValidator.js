const { body } = require("express-validator");
const validate = require("./validate");

const projectRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Title must be between 2 and 150 characters"),
  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 500 })
    .withMessage("Short description cannot exceed 500 characters"),
  body("year")
    .optional()
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Year must be a valid 4-digit year"),
  body("githubUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("liveUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Live URL must be a valid URL"),
  validate,
];

module.exports = {
  projectRules,
};
