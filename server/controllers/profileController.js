const Profile = require("../models/Profile");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

const parseArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {}

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseStatistics = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {}

  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [valuePart, ...labelParts] = line.split("|");

      return {
        value: valuePart?.trim() || "",
        label: labelParts.join("|").trim(),
      };
    })
    .filter((item) => item.value || item.label);
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Failed to load profile.",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    const {
      name,
      role,
      heroIntro,
      portraitCaption,
      heroTechnologyLabels,
      sectionKicker,
      largeStatement,
      description,
      statistics,
      philosophyTitle,
      philosophyParagraph,
    } = req.body;

    if (!profile && (!name || !role)) {
      return res.status(400).json({
        message: "Name and role are required to create the profile.",
      });
    }

    if (!profile) {
      profile = new Profile({
        name,
        role,
        heroIntro: heroIntro || "",
        portraitCaption: portraitCaption || "",
        heroTechnologyLabels: parseArray(heroTechnologyLabels),
        sectionKicker: sectionKicker || "",
        largeStatement: largeStatement || "",
        description: description || "",
        statistics: parseStatistics(statistics),
        philosophyTitle: philosophyTitle || "",
        philosophyParagraph: philosophyParagraph || "",
      });
    } else {
      if (name !== undefined) profile.name = name;
      if (role !== undefined) profile.role = role;
      if (heroIntro !== undefined) profile.heroIntro = heroIntro;
      if (portraitCaption !== undefined) {
        profile.portraitCaption = portraitCaption;
      }

      if (heroTechnologyLabels !== undefined) {
        profile.heroTechnologyLabels = parseArray(heroTechnologyLabels);
      }

      if (sectionKicker !== undefined) {
        profile.sectionKicker = sectionKicker;
      }

      if (largeStatement !== undefined) {
        profile.largeStatement = largeStatement;
      }

      if (description !== undefined) {
        profile.description = description;
      }

      if (statistics !== undefined) {
        profile.statistics = parseStatistics(statistics);
      }

      if (philosophyTitle !== undefined) {
        profile.philosophyTitle = philosophyTitle;
      }

      if (philosophyParagraph !== undefined) {
        profile.philosophyParagraph = philosophyParagraph;
      }
    }

    // Logo upload
    if (req.files?.logo?.[0]) {
      const uploadedLogo = await uploadToCloudinary(
        req.files.logo[0].buffer,
        "uzzi-portfolio/profile"
      );

      profile.logo = uploadedLogo;
    }

    // Profile image upload
    if (req.files?.profileImage?.[0]) {
      const uploadedImage = await uploadToCloudinary(
        req.files.profileImage[0].buffer,
        "uzzi-portfolio/profile"
      );

      profile.profileImage = uploadedImage;
    }

    await profile.save();

    res.status(200).json({
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Failed to update profile.",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
