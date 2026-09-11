const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// =====================================================
// HELPERS
// =====================================================

const parseArray = (value) => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // Ignore JSON parsing errors and try comma/newline parsing
  }

  return String(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return value === "true" || value === "1";
};

const parseNumber = (value, defaultValue = 0) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const number = Number(value);

  return Number.isNaN(number) ? defaultValue : number;
};

// Converts:
// TITLE | DESCRIPTION
//
// into:
// {
//   title: "TITLE",
//   description: "DESCRIPTION"
// }
const parseStructuredLines = (value) => {
  if (!value) {
    return [];
  }

  // If frontend sends JSON
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => ({
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
          }))
          .filter((item) => item.title || item.description);
      }
    } catch (error) {
      // Continue with line parsing
    }
  }

  const lines = Array.isArray(value)
    ? value
    : String(value).split(/\r?\n/);

  return lines
    .map((line) => {
      const parts = String(line).split("|");

      return {
        title: (parts[0] || "").trim(),
        description: parts.slice(1).join("|").trim(),
      };
    })
    .filter((item) => item.title || item.description);
};

// =====================================================
// GET ALL PROJECTS - ADMIN
// =====================================================

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({
        order: 1,
        createdAt: -1,
      });

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

// =====================================================
// GET PUBLISHED PROJECTS - PUBLIC
// =====================================================

const getPublishedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      published: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    console.error("Get published projects error:", error);

    res.status(500).json({
      message: "Failed to fetch published projects",
    });
  }
};

// =====================================================
// GET HOMEPAGE PROJECTS - PUBLIC
// =====================================================

const getHomepageProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      published: true,
      featured: true,
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    console.error("Get homepage projects error:", error);

    res.status(500).json({
      message: "Failed to fetch homepage projects",
    });
  }
};

// =====================================================
// GET SINGLE PROJECT BY SLUG - PUBLIC
// =====================================================

const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project by slug error:", error);

    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

// =====================================================
// CREATE PROJECT
// =====================================================

const createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      year,
      shortDescription,
      description,

      role,
      focus,
      problem,
      solution,
      caseStudy,

      technologies,

      technologyStack,

      githubUrl,
      liveUrl,

      published,
      featured,
      order,
    } = req.body;

    if (!title || !slug || !shortDescription) {
      return res.status(400).json({
        message: "Title, slug and short description are required",
      });
    }

    // ---------------------------------------------
    // CHECK SLUG
    // ---------------------------------------------

    const existingProject = await Project.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (existingProject) {
      return res.status(400).json({
        message: "A project with this slug already exists",
      });
    }

    // ---------------------------------------------
    // PARSE STRUCTURED DATA
    // ---------------------------------------------

    const keyFeatures = parseStructuredLines(
      req.body.keyFeatures
    );

    const processSteps = parseStructuredLines(
      req.body.processSteps
    );

    const challenges = parseArray(req.body.challenges);

    // ---------------------------------------------
    // PARSE TECHNOLOGY STACK
    // ---------------------------------------------

    let parsedTechnologyStack = {
      frontend: [],
      backend: [],
      data: [],
      services: [],
    };

    if (technologyStack) {
      try {
        const parsed =
          typeof technologyStack === "string"
            ? JSON.parse(technologyStack)
            : technologyStack;

        parsedTechnologyStack = {
          frontend: parseArray(parsed.frontend),
          backend: parseArray(parsed.backend),
          data: parseArray(parsed.data),
          services: parseArray(parsed.services),
        };
      } catch (error) {
        console.log("Technology stack parsing failed");
      }
    }

    // ---------------------------------------------
    // UPLOAD MAIN IMAGE
    // ---------------------------------------------

    let imageUrl = "";

    if (req.files?.image?.[0]) {
      imageUrl = await uploadToCloudinary(
        req.files.image[0].buffer,
        "uzzi-portfolio/projects"
      );
    }

    // ---------------------------------------------
    // UPLOAD GALLERY
    // ---------------------------------------------

    let galleryUrls = [];

    if (req.files?.gallery) {
      galleryUrls = await Promise.all(
        req.files.gallery.map((file) =>
          uploadToCloudinary(
            file.buffer,
            "uzzi-portfolio/projects/gallery"
          )
        )
      );
    }

    // ---------------------------------------------
    // CREATE PROJECT
    // ---------------------------------------------

    const project = await Project.create({
      title: title.trim(),

      slug: slug.toLowerCase().trim(),

      year: parseNumber(year, new Date().getFullYear()),

      shortDescription: shortDescription.trim(),

      description: description?.trim() || "",

      role: role?.trim() || "",

      focus: focus?.trim() || "",

      problem: problem?.trim() || "",

      solution: solution?.trim() || "",

      caseStudy: caseStudy?.trim() || "",

      keyFeatures,

      // Keep legacy field populated as well
      // so older parts of the application continue
      // to work.
      features: keyFeatures.map((feature) => feature.title),

      technologies: parseArray(technologies),

      technologyStack: parsedTechnologyStack,

      processSteps,

      // Legacy field
      developmentProcess: processSteps
        .map(
          (step) =>
            `${step.title} | ${step.description}`
        )
        .join("\n"),

      challenges,

      image: imageUrl,

      previewImageUrl:
        req.body.previewImageUrl?.trim() || "",

      gallery: galleryUrls,

      githubUrl: githubUrl?.trim() || "",

      liveUrl: liveUrl?.trim() || "",

      published: parseBoolean(published, true),

      featured: parseBoolean(featured, false),

      order: parseNumber(order, 0),
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PROJECT
// =====================================================

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ---------------------------------------------
    // BASIC FIELDS
    // ---------------------------------------------

    if (req.body.title !== undefined) {
      project.title = req.body.title.trim();
    }

    if (req.body.slug !== undefined) {
      const newSlug = req.body.slug.toLowerCase().trim();

      const slugExists = await Project.findOne({
        slug: newSlug,
        _id: {
          $ne: project._id,
        },
      });

      if (slugExists) {
        return res.status(400).json({
          message: "A project with this slug already exists",
        });
      }

      project.slug = newSlug;
    }

    if (req.body.year !== undefined) {
      project.year = parseNumber(
        req.body.year,
        project.year
      );
    }

    if (req.body.shortDescription !== undefined) {
      project.shortDescription =
        req.body.shortDescription.trim();
    }

    if (req.body.description !== undefined) {
      project.description =
        req.body.description.trim();
    }

    // ---------------------------------------------
    // CASE STUDY
    // ---------------------------------------------

    if (req.body.role !== undefined) {
      project.role = req.body.role.trim();
    }

    if (req.body.focus !== undefined) {
      project.focus = req.body.focus.trim();
    }

    if (req.body.problem !== undefined) {
      project.problem = req.body.problem.trim();
    }

    if (req.body.solution !== undefined) {
      project.solution = req.body.solution.trim();
    }

    if (req.body.caseStudy !== undefined) {
      project.caseStudy = req.body.caseStudy.trim();
    }

    // ---------------------------------------------
    // KEY FEATURES
    // ---------------------------------------------

    if (req.body.keyFeatures !== undefined) {
      const keyFeatures = parseStructuredLines(
        req.body.keyFeatures
      );

      project.keyFeatures = keyFeatures;

      // Keep old field synchronized
      project.features = keyFeatures.map(
        (feature) => feature.title
      );
    }

    // ---------------------------------------------
    // TECHNOLOGIES
    // ---------------------------------------------

    if (req.body.technologies !== undefined) {
      project.technologies = parseArray(
        req.body.technologies
      );
    }

    // ---------------------------------------------
    // TECHNOLOGY STACK
    // ---------------------------------------------

    if (req.body.technologyStack !== undefined) {
      try {
        const parsed =
          typeof req.body.technologyStack === "string"
            ? JSON.parse(req.body.technologyStack)
            : req.body.technologyStack;

        project.technologyStack = {
          frontend: parseArray(parsed.frontend),
          backend: parseArray(parsed.backend),
          data: parseArray(parsed.data),
          services: parseArray(parsed.services),
        };
      } catch (error) {
        console.log(
          "Technology stack update parsing failed"
        );
      }
    }

    // ---------------------------------------------
    // DEVELOPMENT PROCESS
    // ---------------------------------------------

    if (req.body.processSteps !== undefined) {
      const processSteps = parseStructuredLines(
        req.body.processSteps
      );

      project.processSteps = processSteps;

      // Keep legacy field synchronized
      project.developmentProcess = processSteps
        .map(
          (step) =>
            `${step.title} | ${step.description}`
        )
        .join("\n");
    }

    // ---------------------------------------------
    // CHALLENGES
    // ---------------------------------------------

    if (req.body.challenges !== undefined) {
      project.challenges = parseArray(
        req.body.challenges
      );
    }

    // ---------------------------------------------
    // PREVIEW IMAGE URL
    // ---------------------------------------------

    if (req.body.previewImageUrl !== undefined) {
      project.previewImageUrl =
        req.body.previewImageUrl.trim();
    }

    // ---------------------------------------------
    // LINKS
    // ---------------------------------------------

    if (req.body.githubUrl !== undefined) {
      project.githubUrl =
        req.body.githubUrl.trim();
    }

    if (req.body.liveUrl !== undefined) {
      project.liveUrl =
        req.body.liveUrl.trim();
    }

    // ---------------------------------------------
    // PUBLISHING
    // ---------------------------------------------

    if (req.body.published !== undefined) {
      project.published = parseBoolean(
        req.body.published,
        project.published
      );
    }

    if (req.body.featured !== undefined) {
      project.featured = parseBoolean(
        req.body.featured,
        project.featured
      );
    }

    if (req.body.order !== undefined) {
      project.order = parseNumber(
        req.body.order,
        project.order
      );
    }

    // ---------------------------------------------
    // REPLACE MAIN IMAGE
    // ---------------------------------------------

    if (req.files?.image?.[0]) {
      const imageUrl = await uploadToCloudinary(
        req.files.image[0].buffer,
        "uzzi-portfolio/projects"
      );

      project.image = imageUrl;
    }

    // ---------------------------------------------
    // ADD GALLERY IMAGES
    // ---------------------------------------------

    if (req.files?.gallery) {
      const newGalleryUrls = await Promise.all(
        req.files.gallery.map((file) =>
          uploadToCloudinary(
            file.buffer,
            "uzzi-portfolio/projects/gallery"
          )
        )
      );

      project.gallery = [
        ...(project.gallery || []),
        ...newGalleryUrls,
      ];
    }

    // ---------------------------------------------
    // SAVE
    // ---------------------------------------------

    await project.save();

    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PROJECT
// =====================================================

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ---------------------------------------------
    // DELETE CLOUDINARY MAIN IMAGE
    // ---------------------------------------------

    if (project.image) {
      try {
        const publicId = project.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log(
          "Cloudinary main image deletion failed"
        );
      }
    }

    // ---------------------------------------------
    // DELETE PROJECT
    // ---------------------------------------------

    await project.deleteOne();

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getProjects,
  getPublishedProjects,
  getHomepageProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
