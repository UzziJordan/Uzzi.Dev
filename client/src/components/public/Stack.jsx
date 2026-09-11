import { useEffect, useState } from "react";
import { getStack } from "../../services/stackService";
import Reveal from "./Reveal";

const Stack = () => {
  const [stack, setStack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStack = async () => {
      try {
        const data = await getStack();
        setStack(data);
      } catch (err) {
        console.error("Load public stack error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load stack."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStack();
  }, []);

  const categories = [
    {
      key: "frontend",
      number: "01",
    },
    {
      key: "backend",
      number: "02",
    },
    {
      key: "database",
      number: "03",
    },
    {
      key: "tools",
      number: "04",
    },
  ];

  if (loading) {
    return (
      <section
        id="stack"
        className="relative overflow-hidden bg-[#050607] px-6 py-24 text-white md:px-10 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1640px]">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[#52677c]">
            LOADING STACK...
          </p>
        </div>
      </section>
    );
  }

  if (error || !stack) {
    return (
      <section
        id="stack"
        className="relative overflow-hidden bg-[#050607] px-6 py-24 text-white md:px-10 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1640px]">
          <p className="font-mono text-[10px] tracking-[0.35em] text-red-400">
            {error || "STACK UNAVAILABLE"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-[#050607] text-white"
    >
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1640px] px-6 md:px-10 lg:px-14">
        {/* SECTION HEADER */}
        <Reveal className="border-t border-white/10 pt-4">
          <div className="flex items-center gap-7 mb-10 mt-10">
            <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
              /04
            </span>

            <span className="text-[10px] font-mono tracking-[0.35em] text-gray-600 uppercase">
              MY TOOLBOX
            </span>
          </div>

          <h2 className="mt-10 border-b border-white/10 pb-10 text-[66px] font-semibold leading-[0.82] tracking-[-0.07em] text-white">
            MY TOOLBOX
          </h2>
        </Reveal>

        {/* CATEGORIES */}
        <div>
          {categories.map((category) => {
            const categoryData = stack[category.key];

            if (!categoryData) return null;

            const tools = Array.isArray(categoryData.tools)
              ? categoryData.tools
              : [];

            return (
              <StackCategory
                key={category.key}
                category={categoryData}
                tools={tools}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StackCategory = ({ category, tools }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Reveal className="border-b border-white/10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[27%_73%] lg:gap-0">
        {/* CATEGORY INFO */}
        <div className="">
          <h3 className="font-mono text-[15px] mt-10 font-semibold tracking-[0.35em] text-white">
            {category.categoryName}
          </h3>

          <p className="mt-5 font-mono text-[10px] tracking-[0.3em] text-[#52677c]">
            {String(tools.length).padStart(2, "0")} TOOLS
          </p>
        </div>

        {/* TOOLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={`${tool.name}-${index}`}
                className="relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  className={`relative min-h-29 border-l border-white/10 px-7 py-7 transition-all duration-300 md:min-h-25 ${
                    isActive
                      ? "bg-[#0a0c0f]"
                      : "bg-transparent"
                  }`}
                >
                  {/* TOOL NAME */}
                  <div className="flex items-start justify-between gap-5">
                    <h4
                      className={`text-[20px] font-medium tracking-[-0.04em] transition-colors duration-300 md:text-[22px] ${
                        isActive
                          ? "text-white"
                          : "text-white"
                      }`}
                    >
                      {tool.name}
                    </h4>

                    {/* DOT */}
                    <span
                      className={`mt-2 h-1.25 w-1.25 shrink-0 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#6ea8ff]"
                          : "bg-white/15"
                      }`}
                    />
                  </div>

                  {/* HOVER NOTE */}
                  <div
                    className={`grid transition-all duration-300 ${
                      isActive && tool.hoverNote
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-6 text-[#52677c]">
                        {tool.hoverNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
};

export default Stack;
