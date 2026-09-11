import { useState } from "react";

const defaultCategory = {
  categoryName: "",
  tools: "",
};

const StackForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    frontend: {
      ...defaultCategory,
      ...(initialData?.frontend || {}),
    },
    backend: {
      ...defaultCategory,
      ...(initialData?.backend || {}),
    },
    database: {
      ...defaultCategory,
      ...(initialData?.database || {}),
    },
    tools: {
      ...defaultCategory,
      ...(initialData?.tools || {}),
    },
  });

  const updateCategory = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const toolsToText = (tools) => {
    if (!Array.isArray(tools)) return "";

    return tools
      .map((tool) => `${tool.name} | ${tool.hoverNote || ""}`)
      .join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      frontendCategoryName: formData.frontend.categoryName,
      frontendTools: formData.frontend.tools,

      backendCategoryName: formData.backend.categoryName,
      backendTools: formData.backend.tools,

      databaseCategoryName: formData.database.categoryName,
      databaseTools: formData.database.tools,

      toolsCategoryName: formData.tools.categoryName,
      toolsTools: formData.tools.tools,
    });
  };

  const categories = [
    {
      key: "frontend",
      number: "01",
      title: "FRONTEND",
      description: "Client-side technologies and UI development.",
    },
    {
      key: "backend",
      number: "02",
      title: "BACKEND",
      description: "Server-side technologies and API development.",
    },
    {
      key: "database",
      number: "03",
      title: "DATABASE",
      description: "Data storage and database technologies.",
    },
    {
      key: "tools",
      number: "04",
      title: "TOOLS",
      description: "Development, deployment and productivity tools.",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {categories.map((category) => {
        const current = formData[category.key];

        const toolsValue =
          Array.isArray(current.tools)
            ? toolsToText(current.tools)
            : current.tools;

        return (
          <section
            key={category.key}
            className="border border-white/10 bg-white/1.5 rounded-xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-mono text-gray-600 mb-2">
                  {category.number}
                </p>

                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {category.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {category.description}
                </p>
              </div>

              <div className="hidden sm:block text-xs font-mono text-gray-700">
                STACK / {category.number}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                  Category Name
                </label>

                <input
                  type="text"
                  value={current.categoryName}
                  onChange={(e) =>
                    updateCategory(
                      category.key,
                      "categoryName",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Frontend Development"
                  className="cms-input"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-500">
                    Tools
                  </label>

                  <span className="text-[10px] font-mono text-gray-700">
                    NAME | HOVER NOTE
                  </span>
                </div>

                <textarea
                  rows={7}
                  value={toolsValue}
                  onChange={(e) =>
                    updateCategory(
                      category.key,
                      "tools",
                      e.target.value
                    )
                  }
                  placeholder={`React | Component-based UI library
Tailwind CSS | Utility-first CSS framework
JavaScript | Core programming language`}
                  className="cms-input resize-y min-h-45 leading-7"
                />

                <p className="text-xs text-gray-700 mt-2 font-mono">
                  One tool per line. Separate the tool name and hover note
                  with <span className="text-gray-500">|</span>
                </p>
              </div>
            </div>
          </section>
        );
      })}

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

export default StackForm;