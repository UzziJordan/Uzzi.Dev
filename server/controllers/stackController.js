const Stack = require("../models/Stack");

const parseTools = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // Continue with line parsing
  }

  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, ...noteParts] = line.split("|");

      return {
        name: namePart?.trim() || "",
        hoverNote: noteParts.join("|").trim(),
      };
    })
    .filter((tool) => tool.name);
};

const buildCategory = (categoryName, tools) => ({
  categoryName: categoryName?.trim() || "",
  tools: parseTools(tools),
});

const getStack = async (req, res) => {
  try {
    const stack = await Stack.findOne();

    if (!stack) {
      return res.status(404).json({
        message: "Stack not found.",
      });
    }

    res.status(200).json(stack);
  } catch (error) {
    console.error("Get stack error:", error);

    res.status(500).json({
      message: "Failed to load stack.",
    });
  }
};

const updateStack = async (req, res) => {
  try {
    const {
      frontendCategoryName,
      frontendTools,

      backendCategoryName,
      backendTools,

      databaseCategoryName,
      databaseTools,

      toolsCategoryName,
      toolsTools,
    } = req.body;

    let stack = await Stack.findOne();

    const frontend = buildCategory(
      frontendCategoryName,
      frontendTools
    );

    const backend = buildCategory(
      backendCategoryName,
      backendTools
    );

    const database = buildCategory(
      databaseCategoryName,
      databaseTools
    );

    const tools = buildCategory(
      toolsCategoryName,
      toolsTools
    );

    if (!stack) {
      stack = new Stack({
        frontend,
        backend,
        database,
        tools,
      });
    } else {
      stack.frontend = frontend;
      stack.backend = backend;
      stack.database = database;
      stack.tools = tools;
    }

    await stack.save();

    res.status(200).json({
      message: "Stack updated successfully.",
      stack,
    });
  } catch (error) {
    console.error("Update stack error:", error);

    res.status(500).json({
      message: "Failed to update stack.",
    });
  }
};

module.exports = {
  getStack,
  updateStack,
};