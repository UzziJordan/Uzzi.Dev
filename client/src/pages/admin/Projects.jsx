import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  deleteProject,
  getProjects,
  updateProject,
} from "../../services/projectService";

const Projects = () => {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD
  |--------------------------------------------------------------------------
  */
  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProjects();

      console.log(
        "Projects received:",
        data
      );

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        "Load projects error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */
  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) return;

    try {
      await deleteProject(id);

      setProjects(
        (currentProjects) =>
          currentProjects.filter(
            (project) =>
              project._id !== id
          )
      );
    } catch (err) {
      console.error(
        "Delete project error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to delete project."
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE PUBLISHED / FEATURED
  |--------------------------------------------------------------------------
  */
  const handleToggle = async (
    project,
    field
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        field,
        String(!project[field])
      );

      const response =
        await updateProject(
          project._id,
          formData
        );

      setProjects(
        (currentProjects) =>
          currentProjects.map(
            (item) =>
              item._id === project._id
                ? response.project
                : item
          )
      );
    } catch (err) {
      console.error(
        `Toggle ${field} error:`,
        err
      );

      alert(
        err.response?.data?.message ||
          `Failed to update ${field}.`
      );
    }
  };

  const totalProjects =
    projects.length;

  const publishedProjects =
    projects.filter(
      (project) =>
        project.published
    ).length;

  return (
    <div className="pb-16">
      {/* ======================================================
          TOP BAR
      ====================================================== */}
      <div className="flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52677c]">
          {String(totalProjects).padStart(
            2,
            "0"
          )}{" "}
          Total&nbsp; /&nbsp;{" "}
          {String(
            publishedProjects
          ).padStart(
            2,
            "0"
          )}{" "}
          Published
        </p>

        <Link
          to="/admin/projects/new"
          className="inline-flex h-13 items-center justify-center gap-3 bg-white px-7 font-mono text-[11px] uppercase tracking-[0.25em] text-black transition hover:bg-[#dfe4e8]"
        >
          <span className="text-xl leading-none">
            +
          </span>

          New Project
        </Link>
      </div>

      {/* ERROR */}
      {error && (
        <div className="border-b border-red-500/20 bg-red-500/5 px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="border-b border-white/10 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52677c]">
            Loading projects...
          </p>
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        projects.length === 0 && (
          <div className="border-b border-white/10 py-24 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52677c]">
              No projects yet
            </p>

            <Link
              to="/admin/projects/new"
              className="mt-6 inline-flex border border-white/15 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9aa9b8] transition hover:border-white/30 hover:text-white"
            >
              Create First Project
            </Link>
          </div>
        )}

      {/* ======================================================
          PROJECT LIST
      ====================================================== */}
      {!loading &&
        projects.map(
          (project) => (
            <div
              key={project._id}
              className="grid items-center gap-7 border-b border-white/10 py-7 lg:grid-cols-[minmax(300px,1fr)_auto_auto]"
            >
              {/* PROJECT */}
              <div className="flex min-w-0 items-center gap-5">
                <div className="h-16 w-24 shrink-0 overflow-hidden border border-white/10 bg-[#090b0d]">
                  {project.image ||
                  project.previewImageUrl ? (
                    <img
                      src={
                        project.image ||
                        project.previewImageUrl
                      }
                      alt={
                        project.title
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-[9px] text-[#52677c]">
                      NO IMAGE
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-medium uppercase tracking-[-0.02em] text-white">
                    {project.title}
                  </h2>

                  <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#52677c]">
                    /{project.slug}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex flex-wrap items-center gap-4">
                {/* PUBLISHED */}
                <button
                  type="button"
                  onClick={() =>
                    handleToggle(
                      project,
                      "published"
                    )
                  }
                  className={`flex h-11 items-center gap-3 border px-5 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                    project.published
                      ? "border-blue-500/50 text-blue-400"
                      : "border-white/10 text-[#52677c]"
                  }`}
                >
                  <span className="text-sm">
                    {project.published
                      ? "◉"
                      : "○"}
                  </span>

                  {project.published
                    ? "Published"
                    : "Unpublished"}
                </button>

                {/* ON HOMEPAGE */}
                <button
                  type="button"
                  onClick={() =>
                    handleToggle(
                      project,
                      "featured"
                    )
                  }
                  disabled={
                    !project.published
                  }
                  title={
                    !project.published
                      ? "Publish the project before adding it to the homepage."
                      : ""
                  }
                  className={`flex h-11 items-center gap-3 border px-5 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                    !project.published
                      ? "cursor-not-allowed border-white/5 text-[#303941]"
                      : project.featured
                        ? "border-white/40 text-white"
                        : "border-white/15 text-[#9aa9b8]"
                  }`}
                >
                  <span className="text-base">
                    {project.featured
                      ? "★"
                      : "☆"}
                  </span>

                  {project.featured
                    ? "On Homepage"
                    : "Not on Homepage"}
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-8 lg:justify-end">
                <Link
                  to={`/admin/projects/edit/${project._id}`}
                  className="border border-white/15 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition hover:border-white/35"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      project._id
                    )
                  }
                  title="Delete project"
                  className="text-[#52677c] transition hover:text-red-400"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M19 6l-1 15H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Projects;