const express = require("express");

const {
  getProjects,
  getPublishedProjects,
  getHomepageProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { projectRules } = require("../validators/projectValidator");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get("/public", getPublishedProjects);

router.get("/homepage", getHomepageProjects);

router.get("/slug/:slug", getProjectBySlug);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get("/", protect, getProjects);

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 8,
    },
  ]),
  projectRules,
  createProject
);

router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 8,
    },
  ]),
  projectRules,
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

module.exports = router;