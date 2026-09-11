import { useEffect, useState } from "react";

const getStructuredText = (items = []) => {
  if (!Array.isArray(items)) return "";

  return items
    .map((item) => {
      // New structured format
      if (typeof item === "object" && item !== null) {
        return `${item.title || ""} | ${
          item.description || ""
        }`.trim();
      }

      // Old string format
      return String(item);
    })
    .filter(Boolean)
    .join("\n");
};

const getStackText = (items = []) => {
  if (!Array.isArray(items)) return "";

  return items
    .map((item) => String(item).trim())
    .filter(Boolean)
    .join("\n");
};

const getChallengesText = (items = []) => {
  if (!Array.isArray(items)) return "";

  return items
    .map((item) => String(item).trim())
    .filter(Boolean)
    .join("\n");
};

const parseStructuredLines = (text) => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...descriptionParts] =
        line.split("|");

      return {
        title: title?.trim() || "",
        description: descriptionParts
          .join("|")
          .trim(),
      };
    })
    .filter(
      (item) =>
        item.title || item.description
    );
};

const parseLines = (text) => {
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const ProjectForm = ({
  initialData = null,
  onSubmit,
  saving = false,
}) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    year: new Date().getFullYear(),

    shortDescription: "",
    description: "",

    role: "",
    focus: "",

    problem: "",
    solution: "",
    caseStudy: "",

    keyFeatures: "",
    technologies: "",

    frontendStack: "",
    backendStack: "",
    dataStack: "",
    servicesStack: "",

    processSteps: "",
    challenges: "",

    previewImageUrl: "",

    githubUrl: "",
    liveUrl: "",

    published: true,
    featured: false,

    order: 0,
  });

  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // =====================================================
  // LOAD INITIAL DATA
  // =====================================================

  useEffect(() => {
    if (!initialData) return;

    const technologyStack =
      initialData.technologyStack ||
      initialData.stack ||
      {};

    setForm({
      title: initialData.title || "",

      slug: initialData.slug || "",

      year:
        initialData.year ||
        new Date().getFullYear(),

      shortDescription:
        initialData.shortDescription || "",

      description:
        initialData.description || "",

      role: initialData.role || "",

      focus: initialData.focus || "",

      problem: initialData.problem || "",

      solution: initialData.solution || "",

      caseStudy:
        initialData.caseStudy || "",

      keyFeatures:
        getStructuredText(
          initialData.keyFeatures?.length
            ? initialData.keyFeatures
            : initialData.features
        ),

      technologies:
        Array.isArray(
          initialData.technologies
        )
          ? initialData.technologies.join(
              ", "
            )
          : "",

      frontendStack: getStackText(
        technologyStack.frontend
      ),

      backendStack: getStackText(
        technologyStack.backend
      ),

      dataStack: getStackText(
        technologyStack.data
      ),

      servicesStack: getStackText(
        technologyStack.services
      ),

      processSteps:
        initialData.processSteps?.length
          ? getStructuredText(
              initialData.processSteps
            )
          : getStructuredText(
              initialData.developmentProcess
                ? initialData.developmentProcess
                    .split("\n")
                    .map((line) => {
                      const [
                        title,
                        ...descriptionParts
                      ] =
                        line.split("|");

                      return {
                        title:
                          title?.trim() ||
                          "",

                        description:
                          descriptionParts
                            .join("|")
                            .trim(),
                      };
                    })
                : []
            ),

      challenges:
        getChallengesText(
          initialData.challenges
        ),

      previewImageUrl:
        initialData.previewImageUrl ||
        "",

      githubUrl:
        initialData.githubUrl || "",

      liveUrl:
        initialData.liveUrl || "",

      published:
        initialData.published ?? true,

      featured:
        initialData.featured ?? false,

      order:
        initialData.order ?? 0,
    });
  }, [initialData]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // BUILD FORM DATA
  // =====================================================

  const buildFormData = () => {
    const formData = new FormData();

    // ---------------------------------------------
    // BASIC FIELDS
    // ---------------------------------------------

    formData.append(
      "title",
      form.title.trim()
    );

    formData.append(
      "slug",
      form.slug.trim()
    );

    formData.append(
      "year",
      form.year
    );

    formData.append(
      "shortDescription",
      form.shortDescription.trim()
    );

    formData.append(
      "description",
      form.description.trim()
    );

    // ---------------------------------------------
    // CASE STUDY
    // ---------------------------------------------

    formData.append(
      "role",
      form.role.trim()
    );

    formData.append(
      "focus",
      form.focus.trim()
    );

    formData.append(
      "problem",
      form.problem.trim()
    );

    formData.append(
      "solution",
      form.solution.trim()
    );

    formData.append(
      "caseStudy",
      form.caseStudy.trim()
    );

    // ---------------------------------------------
    // KEY FEATURES
    // ---------------------------------------------

    const keyFeatures =
      parseStructuredLines(
        form.keyFeatures
      );

    formData.append(
      "keyFeatures",
      JSON.stringify(keyFeatures)
    );

    // ---------------------------------------------
    // TECHNOLOGY TAGS
    // ---------------------------------------------

    formData.append(
      "technologies",
      JSON.stringify(
        form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );

    // ---------------------------------------------
    // TECHNOLOGY STACK
    // ---------------------------------------------

    const technologyStack = {
      frontend: parseLines(
        form.frontendStack
      ),

      backend: parseLines(
        form.backendStack
      ),

      data: parseLines(
        form.dataStack
      ),

      services: parseLines(
        form.servicesStack
      ),
    };

    formData.append(
      "technologyStack",
      JSON.stringify(
        technologyStack
      )
    );

    // ---------------------------------------------
    // DEVELOPMENT PROCESS
    // ---------------------------------------------

    const processSteps =
      parseStructuredLines(
        form.processSteps
      );

    formData.append(
      "processSteps",
      JSON.stringify(processSteps)
    );

    // ---------------------------------------------
    // CHALLENGES
    // ---------------------------------------------

    formData.append(
      "challenges",
      JSON.stringify(
        parseLines(form.challenges)
      )
    );

    // ---------------------------------------------
    // IMAGE URL
    // ---------------------------------------------

    formData.append(
      "previewImageUrl",
      form.previewImageUrl.trim()
    );

    // ---------------------------------------------
    // LINKS
    // ---------------------------------------------

    formData.append(
      "githubUrl",
      form.githubUrl.trim()
    );

    formData.append(
      "liveUrl",
      form.liveUrl.trim()
    );

    // ---------------------------------------------
    // PUBLISHING
    // ---------------------------------------------

    formData.append(
      "published",
      String(form.published)
    );

    formData.append(
      "featured",
      String(form.featured)
    );

    formData.append(
      "order",
      String(form.order)
    );

    // ---------------------------------------------
    // MAIN IMAGE
    // ---------------------------------------------

    if (image) {
      formData.append(
        "image",
        image
      );
    }

    // ---------------------------------------------
    // GALLERY
    // ---------------------------------------------

    gallery.forEach((file) => {
      formData.append(
        "gallery",
        file
      );
    });

    return formData;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData =
      buildFormData();

    onSubmit(formData);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Basic Information
        </h2>

        <p className="mt-2 text-xs text-gray-600">
          The core information displayed throughout
          your portfolio.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input
            className="cms-input"
            name="title"
            placeholder="Project Name"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            className="cms-input"
            name="slug"
            placeholder="URL Slug — e.g. restaurant-ordering-system"
            value={form.slug}
            onChange={handleChange}
            required
          />

          <input
            className="cms-input"
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
          />

          <input
            className="cms-input"
            name="previewImageUrl"
            placeholder="Preview Image URL"
            value={form.previewImageUrl}
            onChange={handleChange}
          />
        </div>

        <textarea
          className="cms-input mt-5 min-h-28"
          name="shortDescription"
          placeholder="Short Summary"
          value={form.shortDescription}
          onChange={handleChange}
          required
        />

        <textarea
          className="cms-input mt-5 min-h-36"
          name="description"
          placeholder="Full Project Description"
          value={form.description}
          onChange={handleChange}
        />
      </section>

      {/* =================================================
          PROJECT CONTEXT
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Project Context
        </h2>

        <p className="mt-2 text-xs text-gray-600">
          This information appears beside the
          project introduction on the case-study page.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input
            className="cms-input"
            name="role"
            placeholder="Role — Full-stack developer"
            value={form.role}
            onChange={handleChange}
          />

          <input
            className="cms-input"
            name="focus"
            placeholder="Focus — Ordering and operations in one system"
            value={form.focus}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* =================================================
          CASE STUDY
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Case Study
        </h2>

        <p className="mt-2 text-xs text-gray-600">
          Explain the problem and how your project
          solved it.
        </p>

        <textarea
          className="cms-input mt-6 min-h-40"
          name="problem"
          placeholder="01 — THE PROBLEM"
          value={form.problem}
          onChange={handleChange}
        />

        <textarea
          className="cms-input mt-5 min-h-40"
          name="solution"
          placeholder="02 — THE SOLUTION"
          value={form.solution}
          onChange={handleChange}
        />

        <textarea
          className="cms-input mt-5 min-h-40"
          name="caseStudy"
          placeholder="Additional Case Study Information"
          value={form.caseStudy}
          onChange={handleChange}
        />
      </section>

      {/* =================================================
          KEY FEATURES
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Key Features
        </h2>

        <p className="mt-2 text-xs leading-5 text-gray-600">
          One feature per line using:
          <br />
          <span className="text-gray-500">
            TITLE | DESCRIPTION
          </span>
          <br />
          <br />
          Example:
          <br />
          Authentication | Secure authentication and
          session management
          <br />
          Order Management | Manage customer orders
          through one system
        </p>

        <textarea
          className="cms-input mt-5 min-h-48"
          name="keyFeatures"
          placeholder={`Authentication | Secure authentication and session management
Order Management | Manage customer orders through one system
Admin Dashboard | Control the application from one place
Table Ordering | Customers can order directly from their table
Email Notifications | Receive notifications when important actions occur
Responsive Interface | Works across desktop, tablet and mobile`}
          value={form.keyFeatures}
          onChange={handleChange}
        />
      </section>

      {/* =================================================
          TECHNOLOGY STACK
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Technology Stack
        </h2>

        <p className="mt-2 text-xs text-gray-600">
          Technology Tags are used on project cards.
          The grouped stack appears on the project
          detail page.
        </p>

        <input
          className="cms-input mt-6"
          name="technologies"
          placeholder="Technology Tags — React, Node.js, MongoDB"
          value={form.technologies}
          onChange={handleChange}
        />

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
              FRONTEND
            </label>

            <textarea
              className="cms-input min-h-32"
              name="frontendStack"
              placeholder={`React
Tailwind CSS
Framer Motion`}
              value={form.frontendStack}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
              BACKEND
            </label>

            <textarea
              className="cms-input min-h-32"
              name="backendStack"
              placeholder={`Node.js
Express
JWT`}
              value={form.backendStack}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
              DATA
            </label>

            <textarea
              className="cms-input min-h-32"
              name="dataStack"
              placeholder={`MongoDB
Mongoose`}
              value={form.dataStack}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
              SERVICES
            </label>

            <textarea
              className="cms-input min-h-32"
              name="servicesStack"
              placeholder={`Cloudinary
Brevo
Vercel`}
              value={form.servicesStack}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* =================================================
          DEVELOPMENT PROCESS
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Development Process
        </h2>

        <p className="mt-2 text-xs leading-5 text-gray-600">
          One step per line:
          <br />
          <span className="text-gray-500">
            TITLE | DESCRIPTION
          </span>
        </p>

        <textarea
          className="cms-input mt-5 min-h-48"
          name="processSteps"
          placeholder={`Research | Understand the problem and requirements
Planning | Define the architecture and user flow
Design | Plan the interface and experience
Development | Build the application
Testing | Test the application and fix issues
Deployment | Deploy the finished product`}
          value={form.processSteps}
          onChange={handleChange}
        />
      </section>

      {/* =================================================
          CHALLENGES
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Challenges
        </h2>

        <p className="mt-2 text-xs text-gray-600">
          One challenge per line.
        </p>

        <textarea
          className="cms-input mt-5 min-h-40"
          name="challenges"
          placeholder={`Handling concurrent operations
Designing a reliable authentication flow
Keeping the interface simple for users
Managing uploaded media
Maintaining reliable API communication`}
          value={form.challenges}
          onChange={handleChange}
        />
      </section>

      {/* =================================================
          MEDIA
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Media
        </h2>

        <div className="mt-6">
          <label className="mb-3 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
            PROJECT IMAGE
          </label>

          {initialData?.image && (
            <div className="mb-4">
              <img
                src={initialData.image}
                alt={initialData.title}
                className="h-40 w-full max-w-md object-cover border border-white/10"
              />

              <p className="mt-2 text-[10px] font-mono text-gray-700">
                UPLOAD A NEW IMAGE TO REPLACE THIS
                IMAGE
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              setImage(
                event.target.files?.[0] ||
                  null
              )
            }
            className="text-xs text-gray-500"
          />
        </div>

        <div className="mt-8">
          <label className="mb-3 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
            ADD TO GALLERY
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) =>
              setGallery(
                Array.from(
                  event.target.files || []
                )
              )
            }
            className="text-xs text-gray-500"
          />

          {gallery.length > 0 && (
            <p className="mt-3 text-xs text-gray-600">
              {gallery.length} image
              {gallery.length !== 1
                ? "s"
                : ""}{" "}
              selected
            </p>
          )}
        </div>
      </section>

      {/* =================================================
          LINKS
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Links
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input
            className="cms-input"
            name="liveUrl"
            placeholder="Live Website URL"
            value={form.liveUrl}
            onChange={handleChange}
          />

          <input
            className="cms-input"
            name="githubUrl"
            placeholder="GitHub Repository URL"
            value={form.githubUrl}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* =================================================
          PUBLISHING
      ================================================= */}

      <section className="border border-white/10 bg-[#0b0c0e] p-6">
        <h2 className="text-sm font-semibold text-white">
          Publishing
        </h2>

        <div className="mt-6 space-y-5">
          {/* PUBLISHED */}

          <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-400">
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
              className="h-4 w-4"
            />

            <span>
              Published
            </span>
          </label>

          {/* HOMEPAGE */}

          <label
            className={`flex items-center gap-3 text-sm ${
              form.published
                ? "cursor-pointer text-gray-400"
                : "cursor-not-allowed text-gray-700"
            }`}
          >
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              disabled={!form.published}
              onChange={handleChange}
              className="h-4 w-4"
            />

            <span>
              On Homepage
            </span>
          </label>

          <div>
            <label className="mb-2 block text-[10px] font-mono tracking-[0.25em] text-gray-600">
              DISPLAY ORDER
            </label>

            <input
              className="cms-input max-w-xs"
              type="number"
              name="order"
              placeholder="0"
              value={form.order}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* =================================================
          SAVE
      ================================================= */}

      <div className="flex justify-end pb-12">
        <button
          type="submit"
          disabled={saving}
          className="bg-white px-8 py-4 text-xs font-mono tracking-[0.2em] text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "SAVING..."
            : "SAVE PROJECT"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;