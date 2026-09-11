import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/public/Navbar";

import {
  getProjectBySlug,
  getPublishedProjects,
} from "../services/projectService";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const [
          projectData,
          allProjects,
        ] = await Promise.all([
          getProjectBySlug(slug),
          getPublishedProjects(),
        ]);

        setProject(projectData);
        setProjects(allProjects);
      } catch (error) {
        console.error(
          "Failed to load project:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090a] text-white flex items-center justify-center">
        <span className="text-[10px] font-mono tracking-[0.3em] text-gray-700">
          LOADING PROJECT...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#08090a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">
            Project not found.
          </p>

          <button
            onClick={() =>
              navigate("/projects")
            }
            className="mt-5 text-[9px] font-mono tracking-[0.2em] text-white"
          >
            BACK TO PROJECTS ↗
          </button>
        </div>
      </div>
    );
  }

  const developmentSteps = Array.isArray(
    project.processSteps
  )
    ? project.processSteps
    : typeof project.developmentProcess === "string"
      ? project.developmentProcess
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => {
            const [title, ...descriptionParts] =
              line.split("|");

            return {
              title: title.trim(),
              description: descriptionParts
                .join("|")
                .trim(),
            };
          })
      : [];

  const keyFeatures = Array.isArray(project.keyFeatures)
    && project.keyFeatures.length > 0
    ? project.keyFeatures
    : Array.isArray(project.features)
      ? project.features.map((feature) =>
          typeof feature === "object" && feature !== null
            ? feature
            : {
                title: String(feature),
                description: "",
              }
        )
      : [];

  const technologyStack =
    project.technologyStack || project.stack || {};

  const currentIndex =
    projects.findIndex(
      (item) => item._id === project._id
    );

  const nextProject =
    currentIndex >= 0 &&
    projects.length > 1
      ? projects[
          (currentIndex + 1) %
            projects.length
        ]
      : null;

  return (
    <div className="min-h-screen bg-[#08090a] text-white">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* =====================================================
            PROJECT HEADER
        ====================================================== */}

        <section className="max-w-300 mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-20">
          <div className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
            {String(
              currentIndex >= 0
                ? currentIndex + 1
                : 1
            ).padStart(2, "0")}
          </div>

          <div className="mt-10 grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-20">
            <div>
              <h1 className="max-w-212.5 text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.84] tracking-[-0.075em] font-black uppercase text-white">
                {project.title}
              </h1>

              <p className="mt-10 max-w-175 text-[17px] md:text-[19px] leading-[1.7] text-gray-500">
                {project.shortDescription}
              </p>

              <div className="mt-10 flex flex-wrap gap-8">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-mono tracking-[0.22em] text-white hover:text-blue-500"
                  >
                    LIVE WEBSITE ↗
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-mono tracking-[0.22em] text-gray-600 hover:text-white"
                  >
                    GITHUB REPO ↗
                  </a>
                )}
              </div>
            </div>

            {/* YEAR / ROLE / FOCUS */}

            <div className="space-y-9">
              <div>
                <p className="text-[9px] font-mono tracking-[0.25em] text-gray-700">
                  YEAR
                </p>

                <p className="mt-2 text-xl text-gray-300">
                  {project.year}
                </p>
              </div>

              {project.role && (
                <div>
                  <p className="text-[9px] font-mono tracking-[0.25em] text-gray-700">
                    ROLE
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {project.role}
                  </p>
                </div>
              )}

              {project.focus && (
                <div>
                  <p className="text-[9px] font-mono tracking-[0.25em] text-gray-700">
                    FOCUS
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {project.focus}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT IMAGE
        ====================================================== */}

        <section className="max-w-300 mx-auto px-6 md:px-10">
          <div className="border-y border-white/15">
            <div className="aspect-16/8 bg-[#0b0c0e] overflow-hidden">
              {project.image ||
              project.previewImageUrl ? (
                <img
                  src={
                    project.image ||
                    project.previewImageUrl
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-gray-700">
                    NO PROJECT IMAGE
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            PROBLEM / SOLUTION
        ====================================================== */}

        {(project.problem ||
          project.solution) && (
          <section className="max-w-300 mx-auto px-6 md:px-10 py-28">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <p className="text-[9px] font-mono tracking-[0.25em] text-blue-500">
                  01
                </p>

                <h2 className="mt-5 text-2xl md:text-3xl font-bold tracking-[-0.03em]">
                  THE PROBLEM
                </h2>

                <p className="mt-7 text-[15px] leading-[1.85] text-gray-500 whitespace-pre-line">
                  {project.problem}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-mono tracking-[0.25em] text-blue-500">
                  02
                </p>

                <h2 className="mt-5 text-2xl md:text-3xl font-bold tracking-[-0.03em]">
                  THE SOLUTION
                </h2>

                <p className="mt-7 text-[15px] leading-[1.85] text-gray-500 whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            KEY FEATURES
        ====================================================== */}

        {keyFeatures.length > 0 && (
          <section className="max-w-300 mx-auto px-6 md:px-10 py-28 border-t border-white/10">
            <div className="mb-14">
              <p className="text-[9px] font-mono tracking-[0.25em] text-blue-500">
                03
              </p>

              <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-[-0.04em]">
                KEY FEATURES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/10">
              {keyFeatures.map(
                (feature, index) => (
                  <div
                    key={`${feature.title}-${index}`}
                    className="bg-[#08090a] min-h-47.5 p-7"
                  >
                    <span className="text-[9px] font-mono tracking-[0.2em] text-gray-700">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <h3 className="mt-7 text-lg font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            TECHNOLOGY STACK
        ====================================================== */}

        <section className="max-w-300 mx-auto px-6 md:px-10 py-28 border-t border-white/10">
          <div className="mb-14">
            <p className="text-[9px] font-mono tracking-[0.25em] text-blue-500">
              04
            </p>

            <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-[-0.04em]">
              TECHNOLOGY STACK
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-y border-white/10">
            {[
              {
                title: "FRONTEND",
                items:
                  technologyStack.frontend ||
                  [],
              },
              {
                title: "BACKEND",
                items:
                  technologyStack.backend ||
                  [],
              },
              {
                title: "DATA",
                items:
                  technologyStack.data ||
                  [],
              },
              {
                title: "SERVICES",
                items:
                  technologyStack.services ||
                  [],
              },
            ].map((category) => (
              <div
                key={category.title}
                className="p-6 md:p-8 border-b sm:border-b-0 sm:border-r border-white/10 last:border-b-0 sm:last:border-r-0"
              >
                <p className="text-[9px] font-mono tracking-[0.2em] text-gray-700">
                  {category.title}
                </p>

                <div className="mt-6 space-y-3">
                  {category.items.map(
                    (item) => (
                      <p
                        key={item}
                        className="text-sm text-gray-400"
                      >
                        {item}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            DEVELOPMENT PROCESS
        ====================================================== */}

        {developmentSteps.length > 0 && (
          <section className="max-w-300 mx-auto px-6 md:px-10 py-28 border-t border-white/10">
            <div className="mb-14">
              <p className="text-[9px] font-mono tracking-[0.25em] text-blue-500">
                05
              </p>

              <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-[-0.04em]">
                DEVELOPMENT PROCESS
              </h2>
            </div>

            <div className="border-t border-white/10">
              {developmentSteps.map(
                (step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="grid md:grid-cols-[100px_260px_1fr] gap-6 md:gap-10 py-7 border-b border-white/10"
                  >
                    <span className="text-[9px] font-mono tracking-[0.2em] text-gray-700">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <h3 className="text-sm font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            CHALLENGES
        ====================================================== */}

        {project.challenges?.length > 0 && (
          <section className="max-w-300 mx-auto px-6 md:px-10 py-28 border-t border-white/10">
            <div className="mb-14">
              <p className="text-[9px] font-mono tracking-[0.25em] text-blue-500">
                06
              </p>

              <h2 className="mt-5 text-3xl md:text-4xl font-bold tracking-[-0.04em]">
                CHALLENGES
              </h2>
            </div>

            <div className="max-w-212.5">
              {project.challenges.map(
                (challenge, index) => (
                  <div
                    key={`${challenge}-${index}`}
                    className="flex gap-6 py-6 border-t border-white/10"
                  >
                    <span className="shrink-0 text-[9px] font-mono tracking-[0.2em] text-gray-700">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <p className="text-[15px] leading-7 text-gray-500">
                      {challenge}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            NEXT PROJECT
        ====================================================== */}

        {nextProject && (
          <section className="border-t border-white/15">
            <div className="max-w-300 mx-auto px-6 md:px-10 py-24">
              <p className="text-[9px] font-mono tracking-[0.25em] text-gray-700">
                NEXT PROJECT
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/projects/${nextProject.slug}`
                  )
                }
                className="group mt-8 block text-left"
              >
                <span className="text-[9px] font-mono tracking-[0.2em] text-blue-500">
                  PROJECT{" "}
                  {String(
                    (currentIndex + 1) %
                      projects.length +
                      1
                  ).padStart(2, "0")}
                </span>

                <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.07em] font-black uppercase text-white group-hover:text-gray-500 transition">
                  {nextProject.title}
                </h2>

                <span className="mt-7 inline-block text-[9px] font-mono tracking-[0.2em] text-gray-600 group-hover:text-white">
                  VIEW PROJECT ↗
                </span>
              </button>
            </div>
          </section>
        )}
      </motion.main>
    </div>
  );
};

export default ProjectDetail;
