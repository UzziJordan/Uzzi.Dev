const Contact = require("../models/Contact");

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();

    if (!contact) {
      return res.status(404).json({
        message: "Contact information not found.",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Get contact error:", error);

    res.status(500).json({
      message: "Failed to load contact information.",
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const {
      headline,
      supportingText,
      email,
      location,
      githubUrl,
      linkedinUrl,
      whatsappUrl,
    } = req.body;

    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact({
        sectionCopy: {
          headline: headline || "",
          supportingText: supportingText || "",
        },

        channels: {
          email: email || "",
          location: location || "",
          githubUrl: githubUrl || "",
          linkedinUrl: linkedinUrl || "",
          whatsappUrl: whatsappUrl || "",
        },
      });
    } else {
      contact.sectionCopy.headline = headline ?? "";
      contact.sectionCopy.supportingText = supportingText ?? "";

      contact.channels.email = email ?? "";
      contact.channels.location = location ?? "";
      contact.channels.githubUrl = githubUrl ?? "";
      contact.channels.linkedinUrl = linkedinUrl ?? "";
      contact.channels.whatsappUrl = whatsappUrl ?? "";
    }

    await contact.save();

    res.status(200).json({
      message: "Contact information updated successfully.",
      contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);

    res.status(500).json({
      message: "Failed to update contact information.",
    });
  }
};

module.exports = {
  getContact,
  updateContact,
};