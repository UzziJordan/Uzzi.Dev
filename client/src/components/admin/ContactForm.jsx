const ContactForm = ({ formData, setFormData, onSubmit, loading }) => {
  const updateField = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* SECTION COPY */}
      <section className="border border-white/10 bg-white/1.5 rounded-xl p-6 md:p-8">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono text-gray-600 mb-2">
              01
            </p>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              SECTION COPY
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Control the main copy displayed on your contact section.
            </p>
          </div>

          <span className="hidden sm:block text-xs font-mono text-gray-700">
            CONTACT / 01
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              Headline
            </label>

            <input
              type="text"
              value={formData.sectionCopy.headline}
              onChange={(e) =>
                updateField(
                  "sectionCopy",
                  "headline",
                  e.target.value
                )
              }
              placeholder="Let's build something meaningful together."
              className="cms-input"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              Supporting Text
            </label>

            <textarea
              rows={5}
              value={formData.sectionCopy.supportingText}
              onChange={(e) =>
                updateField(
                  "sectionCopy",
                  "supportingText",
                  e.target.value
                )
              }
              placeholder="Have a project in mind? Tell me about it and let's create something great."
              className="cms-input resize-y"
            />
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="border border-white/10 bg-white/1.5 rounded-xl p-6 md:p-8">
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-mono text-gray-600 mb-2">
              02
            </p>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              CHANNELS
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Manage the communication channels visitors can use to reach you.
            </p>
          </div>

          <span className="hidden sm:block text-xs font-mono text-gray-700">
            CONTACT / 02
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EMAIL */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              Email
            </label>

            <input
              type="email"
              value={formData.channels.email}
              onChange={(e) =>
                updateField(
                  "channels",
                  "email",
                  e.target.value
                )
              }
              placeholder="hello@example.com"
              className="cms-input"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              Location
            </label>

            <input
              type="text"
              value={formData.channels.location}
              onChange={(e) =>
                updateField(
                  "channels",
                  "location",
                  e.target.value
                )
              }
              placeholder="Lagos, Nigeria"
              className="cms-input"
            />
          </div>

          {/* GITHUB */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              GitHub URL
            </label>

            <input
              type="url"
              value={formData.channels.githubUrl}
              onChange={(e) =>
                updateField(
                  "channels",
                  "githubUrl",
                  e.target.value
                )
              }
              placeholder="https://github.com/username"
              className="cms-input"
            />
          </div>

          {/* LINKEDIN */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              LinkedIn URL
            </label>

            <input
              type="url"
              value={formData.channels.linkedinUrl}
              onChange={(e) =>
                updateField(
                  "channels",
                  "linkedinUrl",
                  e.target.value
                )
              }
              placeholder="https://linkedin.com/in/username"
              className="cms-input"
            />
          </div>

          {/* WHATSAPP */}
          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
              WhatsApp URL
            </label>

            <input
              type="url"
              value={formData.channels.whatsappUrl}
              onChange={(e) =>
                updateField(
                  "channels",
                  "whatsappUrl",
                  e.target.value
                )
              }
              placeholder="https://wa.me/234XXXXXXXXXX"
              className="cms-input"
            />

            <p className="text-xs text-gray-700 mt-2 font-mono">
              Use your complete WhatsApp click-to-chat URL.
            </p>
          </div>
        </div>
      </section>

      {/* SAVE */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "SAVING..." : "SAVE CHANGES"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;