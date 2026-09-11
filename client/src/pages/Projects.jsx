import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/public/Navbar";
import { getPublishedProjects } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await getPublishedProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#08090a] text-white">
      <Navbar />

      <motion.main
        className="pt-18"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}
        <section className="border-b border-white/10 px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-300">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#52677c]">
              /PROJECTS
            </p>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-5xl font-semibold uppercase tracking-tighter text-white md:text-7xl lg:text-[92px] lg:leading-[0.9]">
                  ALL
                  <br />
                  PROJECTS
                </h1>
              </div>

              <div className="max-w-md">
                <p className="font-mono text-xs leading-6 tracking-wide text-[#7f8d9b]">
                  A collection of selected builds — from interface
                  to API, database and deployment. Each project is
                  a complete system built from the ground up.
                </p>
              </div>
            </div>

            <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                PROJECT ARCHIVE
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                {String(projects.length).padStart(2, "0")} BUILDS
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT LIST
        ====================================================== */}
        <section className="px-6 py-16 md:px-10 md:py-20 lg:px-14">
          <div className="mx-auto max-w-300">

            {loading && (
              <div className="py-20 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                  Loading projects...
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="border border-red-500/20 px-6 py-8">
                <p className="font-mono text-xs text-red-400">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && projects.length === 0 && (
              <div className="border border-white/10 px-6 py-12">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#52677c]">
                  No published projects yet.
                </p>
              </div>
            )}

            {!loading && !error && projects.length > 0 && (
              <div className="space-y-10">
                {projects.map((project, index) => {
                  const isReversed = index % 2 !== 0;

                  return (
                    <article
                      key={project._id}
                      className="group border border-white/10 bg-[#0a0c0e] transition-colors duration-300 hover:border-white/20"
                    >
                      <div
                        className={`grid lg:grid-cols-2 ${
                          isReversed
                            ? "lg:grid-flow-dense"
                            : ""
                        }`}
                      >
                        {/* IMAGE */}
                        <Link
                          to={`/projects/${project.slug}`}
                          className={`relative block aspect-16/10 overflow-hidden border-b border-white/10 lg:aspect-auto lg:min-h-90 lg:border-b-0 ${
                            isReversed
                              ? "lg:col-start-2 lg:border-l lg:border-white/10"
                              : "lg:border-r lg:border-white/10"
                          }`}
                        >
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                            />
                          ) : (
                            <div className="flex h-full min-h-70 items-center justify-center bg-[#0d1013]">
                              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                                No Image
                              </span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/10 transition duration-500 group-hover:bg-transparent" />

                          <div className="absolute left-5 top-5 border border-white/15 bg-[#08090a]/80 px-3 py-2 backdrop-blur-sm">
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#9aa9b8]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </Link>

                        {/* INFO */}
                        <div
                          className={`flex flex-col justify-between p-7 md:p-9 lg:p-10 ${
                            isReversed
                              ? "lg:col-start-1 lg:row-start-1"
                              : ""
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-6">
                              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                                {String(index + 1).padStart(2, "0")} /{" "}
                                {project.year}
                              </span>

                              {project.featured && (
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-400">
                                  Featured
                                </span>
                              )}
                            </div>

                            <Link
                              to={`/projects/${project.slug}`}
                              className="mt-8 block"
                            >
                              <h2 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-white transition-colors group-hover:text-blue-400 md:text-4xl">
                                {project.title}
                              </h2>
                            </Link>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-[#7f8d9b]">
                              {project.shortDescription ||
                                project.description ||
                                project.caseStudy}
                            </p>

                            {/* TECHNOLOGIES */}
                            {project.technologies?.length > 0 && (
                              <div className="mt-8 flex flex-wrap gap-2">
                                {project.technologies.map(
                                  (technology) => (
                                    <span
                                      key={technology}
                                      className="border border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[#718091]"
                                    >
                                      {technology}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </div>

                          {/* ACTIONS */}
                          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                            <Link
                              to={`/projects/${project.slug}`}
                              className="inline-flex h-11 items-center gap-3 border border-white/15 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition hover:border-blue-500 hover:text-blue-400"
                            >
                              View Project
                              <span className="text-sm">
                                →
                              </span>
                            </Link>

                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-11 items-center gap-3 border border-white/10 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#718091] transition hover:border-white/25 hover:text-white"
                              >
                                GitHub
                                <span className="text-sm">
                                  ↗
                                </span>
                              </a>
                            )}

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-11 items-center gap-3 border border-white/10 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#718091] transition hover:border-white/25 hover:text-white"
                              >
                                Live Site
                                <span className="text-sm">
                                  ↗
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default Projects;
