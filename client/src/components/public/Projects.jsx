import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getHomepageProjects } from "../../services/projectService";
import Reveal from "./Reveal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getHomepageProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to load homepage projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-white/10 bg-[#08090a] px-6 py-24 md:px-10 md:py-15 lg:px-14"
    >
      <div className="mx-auto max-w-300">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <Reveal>
          <div className="flex items-center gap-7 mb-10">
            <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
              /03
            </span>

            <span className="text-[10px] font-mono tracking-[0.35em] text-gray-600 uppercase">
              MY PROJECTS
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-4xl font-semibold uppercase tracking-tighter text-white md:text-6xl lg:text-[66px] lg:leading-[0.9]">
              MY
              <br />
              PROJECTS
            </h2>

            <p className="max-w-md font-mono text-xs leading-6 tracking-wide text-[#7f8d9b]">
              Three projects, each a full build — interface,
              API and data. Open one for the complete case
              study.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            PROJECTS
        ====================================================== */}
        <div className="mt-8 md:mt-10">

          {loading && (
            <div className="border border-white/10 py-16 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                Loading selected work...
              </p>
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="border border-white/10 py-16 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                No selected projects yet.
              </p>
            </div>
          )}

          {!loading && projects.length > 0 && (
            <div className="space-y-8">
              {projects.map((project, index) => {
                const isReversed = index % 2 !== 0;

                return (
                  <Reveal
                    key={project._id}
                    className="group border border-white/10 bg-[#0a0c0e] transition-colors duration-300 hover:border-white/20"
                    delay={(index % 3) * 0.08}
                  >
                    <div
                      className={`grid lg:grid-cols-2 ${
                        isReversed ? "lg:grid-flow-dense" : ""
                      }`}
                    >

                      {/* =================================================
                          IMAGE
                      ================================================== */}
                      <Link
                        to={`/projects/${project.slug}`}
                        className={`relative block aspect-16/10 overflow-hidden border-b border-white/10 lg:aspect-auto lg:min-h-82.5 lg:border-b-0 ${
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
                          <div className="flex h-full min-h-62.5 items-center justify-center bg-[#0d1013]">
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

                      {/* =================================================
                          PROJECT INFO
                      ================================================== */}
                      <div
                        className={`flex flex-col justify-between p-7 md:p-8 lg:py-20 ${
                          isReversed
                            ? "lg:col-start-1 lg:row-start-1"
                            : ""
                        }`}
                      >
                        <div>

                          {/* NUMBER + YEAR */}
                          <div className="flex items-center justify-between gap-6">
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#52677c]">
                              {String(index + 1).padStart(2, "0")}{" "}
                              / {project.year}
                            </span>
                          </div>

                          {/* TITLE */}
                          <Link
                            to={`/projects/${project.slug}`}
                            className="mt-7 block"
                          >
                            <h3 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-white transition-colors group-hover:text-blue-400 md:text-4xl">
                              {project.title}
                            </h3>
                          </Link>

                          {/* DESCRIPTION */}
                          <p className="mt-5 max-w-xl text-sm leading-7 text-[#7f8d9b]">
                            {project.shortDescription ||
                              project.description ||
                              project.caseStudy}
                          </p>

                          {/* TECHNOLOGIES */}
                          {project.technologies?.length > 0 && (
                            <div className="mt-7 flex flex-wrap gap-2">
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

                        {/* =================================================
                            ACTIONS
                        ================================================== */}
                        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                          <Link
                            to={`/projects/${project.slug}`}
                            className="inline-flex h-10 items-center gap-3 border border-white/15 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition hover:border-blue-500 hover:text-blue-400"
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
                              className="inline-flex h-10 items-center gap-3 border border-white/10 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#718091] transition hover:border-white/25 hover:text-white"
                            >
                              GitHub
                              <span className="text-sm">
                                ↗
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* =====================================================
              VIEW ALL
          ====================================================== */}
          {!loading && projects.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Link
                to="/projects"
                className="group inline-flex h-12 items-center gap-4 border border-white/15 px-7 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9aa9b8] transition hover:border-white/30 hover:text-white"
              >
                View All Projects

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
