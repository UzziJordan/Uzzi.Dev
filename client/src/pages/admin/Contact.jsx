import { useEffect, useState } from "react";
import ContactForm from "../../components/admin/ContactForm";
import {
  getContact,
  updateContact,
} from "../../services/contactService";

const emptyContact = {
  sectionCopy: {
    headline: "",
    supportingText: "",
  },

  channels: {
    email: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    whatsappUrl: "",
  },
};

const Contact = () => {
  const [formData, setFormData] = useState(emptyContact);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await getContact();

        setFormData({
          sectionCopy: {
            headline: data.sectionCopy?.headline || "",
            supportingText:
              data.sectionCopy?.supportingText || "",
          },

          channels: {
            email: data.channels?.email || "",
            location: data.channels?.location || "",
            githubUrl: data.channels?.githubUrl || "",
            linkedinUrl: data.channels?.linkedinUrl || "",
            whatsappUrl: data.channels?.whatsappUrl || "",
          },
        });
      } catch (err) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message ||
              "Failed to load contact information."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await updateContact({
        headline: formData.sectionCopy.headline,
        supportingText: formData.sectionCopy.supportingText,

        email: formData.channels.email,
        location: formData.channels.location,
        githubUrl: formData.channels.githubUrl,
        linkedinUrl: formData.channels.linkedinUrl,
        whatsappUrl: formData.channels.whatsappUrl,
      });

      setFormData({
        sectionCopy: {
          headline: response.contact.sectionCopy?.headline || "",
          supportingText:
            response.contact.sectionCopy?.supportingText || "",
        },

        channels: {
          email: response.contact.channels?.email || "",
          location: response.contact.channels?.location || "",
          githubUrl: response.contact.channels?.githubUrl || "",
          linkedinUrl:
            response.contact.channels?.linkedinUrl || "",
          whatsappUrl:
            response.contact.channels?.whatsappUrl || "",
        },
      });

      setMessage("Contact information updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update contact information."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-xs font-mono text-gray-600">
          LOADING CONTACT...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-6xl">
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-600 mb-3">
          Communication Management
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Contact
            </h1>

            <p className="text-gray-500 mt-3 max-w-xl">
              Manage your contact section copy and the channels visitors
              can use to reach you.
            </p>
          </div>

          <div className="font-mono text-xs text-gray-700">
            02 SECTIONS
          </div>
        </div>
      </div>

      {message && (
        <div className="mb-6 border border-white/10 bg-white/3 rounded-lg px-4 py-3 text-sm text-gray-300">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 border border-red-500/20 bg-red-500/5 rounded-lg px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <ContactForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  );
};

export default Contact;