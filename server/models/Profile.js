const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    // IDENTITY
    logo: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    heroIntro: {
      type: String,
      default: "",
      trim: true,
    },

    portraitCaption: {
      type: String,
      default: "",
      trim: true,
    },

    heroTechnologyLabels: [
      {
        type: String,
        trim: true,
      },
    ],

    // ABOUT
    sectionKicker: {
      type: String,
      default: "",
      trim: true,
    },

    largeStatement: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    statistics: [
      {
        value: {
          type: String,
          trim: true,
        },
        label: {
          type: String,
          trim: true,
        },
      },
    ],

    // PHILOSOPHY
    philosophyTitle: {
      type: String,
      default: "",
      trim: true,
    },

    philosophyParagraph: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);