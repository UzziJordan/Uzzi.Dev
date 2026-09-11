import { useEffect, useState } from "react";

const ProfileForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    heroIntro: "",
    portraitCaption: "",
    heroTechnologyLabels: "",
    sectionKicker: "",
    largeStatement: "",
    description: "",
    statistics: "",
    philosophyTitle: "",
    philosophyParagraph: "",
  });

  const [logo, setLogo] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [logoPreview, setLogoPreview] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  useEffect(() => {
    if (!initialData) return;

    setForm({
      name: initialData.name || "",
      role: initialData.role || "",
      heroIntro: initialData.heroIntro || "",
      portraitCaption: initialData.portraitCaption || "",

      heroTechnologyLabels:
        Array.isArray(initialData.heroTechnologyLabels)
          ? initialData.heroTechnologyLabels.join(", ")
          : "",

      sectionKicker: initialData.sectionKicker || "",
      largeStatement: initialData.largeStatement || "",
      description: initialData.description || "",

      statistics: Array.isArray(initialData.statistics)
        ? initialData.statistics
            .map(
              (stat) => `${stat.value || ""} | ${stat.label || ""}`
            )
            .join("\n")
        : "",

      philosophyTitle: initialData.philosophyTitle || "",
      philosophyParagraph: initialData.philosophyParagraph || "",
    });

    setLogoPreview(initialData.logo || "");
    setProfileImagePreview(initialData.profileImage || "");
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Logo must be less than 5MB.");
      return;
    }

    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile image must be less than 5MB.");
      return;
    }

    setProfileImage(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!form.role.trim()) {
      alert("Role is required.");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("heroIntro", form.heroIntro);
    formData.append("portraitCaption", form.portraitCaption);
    formData.append(
      "heroTechnologyLabels",
      form.heroTechnologyLabels
    );

    formData.append("sectionKicker", form.sectionKicker);
    formData.append("largeStatement", form.largeStatement);
    formData.append("description", form.description);
    formData.append("statistics", form.statistics);

    formData.append(
      "philosophyTitle",
      form.philosophyTitle
    );

    formData.append(
      "philosophyParagraph",
      form.philosophyParagraph
    );

    if (logo) {
      formData.append("logo", logo);
    }

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      {/* IDENTITY */}
      <section>
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.35em] text-gray-500">
            IDENTITY
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* LOGO */}
          <div>
            <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
              LOGO
            </label>

            <label className="flex min-h-45 cursor-pointer items-center justify-center border border-white/10 bg-[#08090b] transition hover:border-white/20">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-h-28 max-w-[80%] object-contain"
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    SELECT LOGO
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.2em] text-gray-700">
                    PNG / JPG / WEBP
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
              NAME
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="YOUR NAME"
              className="cms-input"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
              ROLE
            </label>

            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="FULL STACK DEVELOPER"
              className="cms-input"
            />
          </div>

          {/* PROFILE IMAGE */}
          <div>
            <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
              PROFILE IMAGE
            </label>

            <label className="flex min-h-45 cursor-pointer items-center justify-center overflow-hidden border border-white/10 bg-[#08090b] transition hover:border-white/20">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile preview"
                  className="h-full max-h-45 w-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    SELECT PROFILE IMAGE
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.2em] text-gray-700">
                    PNG / JPG / WEBP
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* HERO INTRO */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            HERO INTRO
          </label>

          <textarea
            name="heroIntro"
            value={form.heroIntro}
            onChange={handleChange}
            rows={4}
            placeholder="A short introduction that appears in the hero section."
            className="cms-input resize-none"
          />
        </div>

        {/* PORTRAIT CAPTION */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            PORTRAIT CAPTION
          </label>

          <input
            name="portraitCaption"
            value={form.portraitCaption}
            onChange={handleChange}
            placeholder="FULL STACK DEVELOPER / NIGERIA"
            className="cms-input"
          />
        </div>

        {/* TECHNOLOGIES */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            HERO TECHNOLOGY LABELS
          </label>

          <input
            name="heroTechnologyLabels"
            value={form.heroTechnologyLabels}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB, Express"
            className="cms-input"
          />

          <p className="mt-3 text-xs tracking-[0.15em] text-gray-700">
            Comma separated, e.g. React, Node.js, MongoDB
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-white/10 pt-12">
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.35em] text-gray-500">
            ABOUT
          </p>
        </div>

        {/* SECTION KICKER */}
        <div>
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            SECTION KICKER
          </label>

          <input
            name="sectionKicker"
            value={form.sectionKicker}
            onChange={handleChange}
            placeholder="ABOUT ME"
            className="cms-input"
          />
        </div>

        {/* LARGE STATEMENT */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            LARGE STATEMENT
          </label>

          <textarea
            name="largeStatement"
            value={form.largeStatement}
            onChange={handleChange}
            rows={5}
            placeholder="I build digital experiences that..."
            className="cms-input resize-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            DESCRIPTION
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={7}
            placeholder="Tell visitors more about you..."
            className="cms-input resize-none"
          />
        </div>

        {/* STATISTICS */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            STATISTICS
          </label>

          <textarea
            name="statistics"
            value={form.statistics}
            onChange={handleChange}
            rows={6}
            placeholder={`03 | YEARS EXPERIENCE
12 | PROJECTS
08 | TECHNOLOGIES`}
            className="cms-input resize-none"
          />

          <p className="mt-3 text-xs tracking-[0.15em] text-gray-700">
            One statistic per line, formatted as: VALUE | LABEL
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="border-t border-white/10 pt-12">
        <div className="mb-8">
          <p className="text-[11px] tracking-[0.35em] text-gray-500">
            PHILOSOPHY
          </p>
        </div>

        {/* TITLE */}
        <div>
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            TITLE
          </label>

          <input
            name="philosophyTitle"
            value={form.philosophyTitle}
            onChange={handleChange}
            placeholder="BUILD WITH PURPOSE"
            className="cms-input"
          />
        </div>

        {/* PARAGRAPH */}
        <div className="mt-8">
          <label className="mb-3 block text-[11px] tracking-[0.3em] text-gray-500">
            PARAGRAPH
          </label>

          <textarea
            name="philosophyParagraph"
            value={form.philosophyParagraph}
            onChange={handleChange}
            rows={8}
            placeholder="Write your development philosophy..."
            className="cms-input resize-none"
          />
        </div>
      </section>

      {/* SAVE */}
      <div className="flex justify-end border-t border-white/10 pt-8">
        <button
          type="submit"
          disabled={loading}
          className="border border-white bg-white px-8 py-4 text-[11px] tracking-[0.3em] text-black transition hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "SAVING..." : "SAVE PROFILE"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;