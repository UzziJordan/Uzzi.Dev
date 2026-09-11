const mongoose = require("mongoose");

const stackToolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hoverNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const stackCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    tools: {
      type: [stackToolSchema],
      default: [],
    },
  },
  { _id: false }
);

const stackSchema = new mongoose.Schema(
  {
    frontend: {
      type: stackCategorySchema,
      required: true,
    },
    backend: {
      type: stackCategorySchema,
      required: true,
    },
    database: {
      type: stackCategorySchema,
      required: true,
    },
    tools: {
      type: stackCategorySchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stack", stackSchema);