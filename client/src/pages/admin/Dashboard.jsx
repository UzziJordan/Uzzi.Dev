import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getProjects,
} from "../../services/projectService";

const Dashboard = () => {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data =
          await getProjects();

        setProjects(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Dashboard projects error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const publishedCount =
    projects.filter(
      (project) =>
        project.published
    ).length;

  const featuredCount =
    projects.filter(
      (project) =>
        project.published &&
        project.featured
    ).length;

  return (
    <div className="pb-16">
      {/* ======================================================
          STATS
      ====================================================== */}
      <div className="grid border-b border-white/10 md:grid-cols-3">
        <Stat
          label="Total Projects"
          value={
            loading
              ? "—"
              : String(
                  projects.length
                ).padStart(2, "0")
          }
        />

        <Stat
          label="Published"
          value={
            loading
              ? "—"
              : String(
                  publishedCount
                ).padStart(2, "0")
          }
        />

        <Stat
          label="On Homepage"
          value={
            loading
              ? "—"
              : String(
                  featuredCount
                ).padStart(2, "0")
          }
        />
      </div>

      {/* ======================================================
          QUICK ACTIONS
      ====================================================== */}
      <div className="border-b border-white/10 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52677c]">
              Quick Actions
            </p>

            <h2 className="mt-3 text-2xl font-medium uppercase tracking-[-0.02em] text-white">
              Manage Portfolio
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/projects/new"
              className="inline-flex h-13 items-center gap-3 bg-white px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-black transition hover:bg-[#dfe4e8]"
            >
              <span className="text-lg">
                +
              </span>

              New Project
            </Link>

            <Link
              to="/admin/profile"
              className="inline-flex h-13 items-center border border-white/15 px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#9aa9b8] transition hover:border-white/30 hover:text-white"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================
          RECENT PROJECTS
      ====================================================== */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 py-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52677c]">
              Recent Work
            </p>

            <h2 className="mt-3 text-2xl font-medium uppercase tracking-[-0.02em] text-white">
              Projects
            </h2>
          </div>

          <Link
            to="/admin/projects"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#52677c] transition hover:text-white"
          >
            View All →
          </Link>
        </div>

        {!loading &&
          projects.length === 0 && (
            <div className="border-b border-white/10 py-16 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#52677c]">
                No projects yet
              </p>
            </div>
          )}

        {projects
          .slice(0, 4)
          .map((project) => (
            <div
              key={project._id}
              className="flex flex-col gap-5 border-b border-white/10 py-7 md:flex-row md:items-center"
            >
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
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-medium uppercase tracking-[-0.02em] text-white">
                  {project.title}
                </h3>

                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#52677c]">
                  /{project.slug}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {project.published && (
                  <span className="border border-blue-500/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400">
                    Published
                  </span>
                )}

                {project.featured && (
                  <span className="border border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9aa9b8]">
                    Homepage
                  </span>
                )}

                <Link
                  to={`/admin/projects/edit/${project._id}`}
                  className="border border-white/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9aa9b8] transition hover:border-white/30 hover:text-white"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Stat = ({
  label,
  value,
}) => (
  <div className="border-b border-white/10 py-10 last:border-b-0 md:border-b-0 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0">
    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52677c]">
      {label}
    </p>

    <p className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white">
      {value}
    </p>
  </div>
);

export default Dashboard;