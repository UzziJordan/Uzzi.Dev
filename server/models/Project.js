const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // CASE STUDY
    // =========================
    role: {
      type: String,
      trim: true,
      default: "",
    },

    focus: {
      type: String,
      trim: true,
      default: "",
    },

    problem: {
      type: String,
      trim: true,
      default: "",
    },

    solution: {
      type: String,
      trim: true,
      default: "",
    },

    caseStudy: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // KEY FEATURES
    // =========================
    // New structured feature format.
    //
    // Example:
    // {
    //   title: "Table Ordering",
    //   description: "Customers can order directly from their table."
    // }
    //
    // We keep the old `features` field below for
    // compatibility with existing projects.
    keyFeatures: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],

    // Legacy features field
    features: [
      {
        type: String,
        trim: true,
      },
    ],

    // =========================
    // TECHNOLOGY
    // =========================
    // Short technology tags used on project cards.
    //
    // Example:
    // ["React", "Node.js", "MongoDB"]
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    // Detailed technology stack used
    // on the project detail page.
    technologyStack: {
      frontend: [
        {
          type: String,
          trim: true,
        },
      ],

      backend: [
        {
          type: String,
          trim: true,
        },
      ],

      data: [
        {
          type: String,
          trim: true,
        },
      ],

      services: [
        {
          type: String,
          trim: true,
        },
      ],
    },

    // =========================
    // DEVELOPMENT PROCESS
    // =========================
    // New structured version.
    processSteps: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],

    // Legacy field retained so old projects
    // aren't immediately broken.
    developmentProcess: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // CHALLENGES
    // =========================
    challenges: [
      {
        type: String,
        trim: true,
      },
    ],

    // =========================
    // MEDIA
    // =========================
    image: {
      type: String,
      default: "",
    },

    previewImageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    gallery: [
      {
        type: String,
      },
    ],

    // =========================
    // LINKS
    // =========================
    githubUrl: {
      type: String,
      trim: true,
      default: "",
    },

    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // =========================
    // PUBLISHING / DISPLAY
    // =========================
    published: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);