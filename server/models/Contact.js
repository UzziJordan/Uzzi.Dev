const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    sectionCopy: {
      headline: {
        type: String,
        default: "",
        trim: true,
      },
      supportingText: {
        type: String,
        default: "",
        trim: true,
      },
    },

    channels: {
      email: {
        type: String,
        default: "",
        trim: true,
      },
      location: {
        type: String,
        default: "",
        trim: true,
      },
      githubUrl: {
        type: String,
        default: "",
        trim: true,
      },
      linkedinUrl: {
        type: String,
        default: "",
        trim: true,
      },
      whatsappUrl: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);