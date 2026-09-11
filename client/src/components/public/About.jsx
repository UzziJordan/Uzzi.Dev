import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";
import Reveal from "./Reveal";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <section
        id="about"
        className="min-h-screen bg-[#08090a] text-white flex items-center"
      >
        <div className="px-6 md:px-10">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gray-700">
            LOADING...
          </span>
        </div>
      </section>
    );
  }

  const statistics = profile?.statistics || [];

  const philosophyLines = profile?.philosophyTitle
    ? profile.philosophyTitle
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <section
      id="about"
      className="relative bg-[#08090a] text-white overflow-hidden"
    >
      {/* =========================
          ABOUT INTRO
      ========================== */}

      <div className="relative max-w-300 mx-auto px-6 md:px-10 pt-32 md:pt-15 pb-10">
        {/* Section heading */}
        <Reveal className="flex items-center gap-7 mb-15">
          <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
            /01
          </span>

          <span className="text-[10px] font-mono tracking-[0.35em] text-gray-600 uppercase">
            {profile?.sectionKicker || "A LITTLE ABOUT ME"}
          </span>
        </Reveal>

        {/* Main About content */}
        <div className="grid lg:grid-cols-[1.45fr_0.85fr] gap-16 lg:gap-10">
          {/* Large statement */}
          <Reveal className="max-w-300">
            <div className="space-y-2 md:space-y-2">
              {(profile?.largeStatement || "")
                .split(".")
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p
                    key={`${paragraph}-${index}`}
                    className={`
                      text-[clamp(2.4rem,2.5vw,4.8rem)]
                      leading-[0.9]
                      tracking-[-0.065em]
                      font-black
                      uppercase
                      ${
                        index === 0
                          ? "text-white"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {paragraph}.
                  </p>
                ))}
            </div>
          </Reveal>

          {/* Description */}
          <Reveal className="lg:pt-1" delay={0.12}>
            <div className="max-w-67.5">
              <div className="space-y-2">
                {(profile?.description || "")
                  .split(".")
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, index, paragraphs) => (
                    <p
                      key={`${paragraph}-${index}`}
                      className={`
                        text-[14px]
                        md:text-[15px]
                        leading-[1.75]
                        ${
                          index === paragraphs.length - 1
                            ? "text-white"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {paragraph}.
                    </p>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="max-w-300 mx-auto px-6 md:px-10">
        <Reveal className="border-t border-white/20 border-b ">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {statistics.map((stat, index) => (
              <div
                key={`${stat.value}-${index}`}
                className={`
                  min-h-37.5
                  px-6
                  md:px-8
                  py-8
                  flex
                  flex-col
                  justify-center
                  ${
                    index !== statistics.length - 1
                      ? "border-b md:border-b-0 md:border-r border-white/15"
                      : ""
                  }
                `}
              >
                <div className="text-[clamp(2.5rem,4vw,4.5rem)] leading-none tracking-[-0.06em] font-bold text-white">
                  {stat.value}
                </div>

                <div className="mt-4 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Empty fallback structure if no statistics exist */}
            {statistics.length === 0 && (
              <>
                <div className="min-h-37.5 px-6 md:px-8 py-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/15">
                  <div className="text-[clamp(2.5rem,4vw,4.5rem)] leading-none tracking-[-0.06em] font-bold">
                    05+
                  </div>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.22em] text-gray-600">
                    Projects built
                  </div>
                </div>

                <div className="min-h-37.5 px-6 md:px-8 py-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/15">
                  <div className="text-[clamp(2.5rem,4vw,4.5rem)] leading-none tracking-[-0.06em] font-bold">
                    Full Stack
                  </div>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.22em] text-gray-600">
                    development
                  </div>
                </div>

                <div className="min-h-37.5 px-6 md:px-8 py-8 flex flex-col justify-center">
                  <div className="text-[clamp(2.5rem,4vw,4.5rem)] leading-none tracking-[-0.06em] font-bold">
                    ∞
                  </div>
                  <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.22em] text-gray-600">
                    things still learning
                  </div>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>



      {/* =========================
          PHILOSOPHY
      ========================== */}

      <div className="max-w-300 mx-auto px-6 md:px-10 pt-32 md:pt-15 pb-15">
        <Reveal className="flex items-center gap-7 mb-10">
          <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500">
            /02
          </span>

          <span className="text-[10px] font-mono tracking-[0.35em] text-gray-600 uppercase">
            PHILOSOPHY
          </span>
        </Reveal>

        <div className="">
          {/* Staggered philosophy titles */}
          <div className="space-y-10 md:space-y-3 md:max-w-212.5">
            {philosophyLines.map((line, index) => {
              const textColor =
                index === 0
                  ? "text-white"
                  : index === 1
                  ? "text-gray-600"
                  : "text-blue-500/70";

              const indent =
                index === 0
                  ? "ml-0"
                  : index === 1
                  ? "ml-[8%] md:ml-[12%]"
                  : "ml-[16%] md:ml-[24%]";

              return (
                <Reveal
                  key={`${line}-${index}`}
                  className={`${indent} transition-all duration-500`}
                  delay={index * 0.08}
                >
                  <h3
                    className={`
                      max-w-212.5
                      text-[clamp(2.4rem,5.7vw,6rem)]
                      leading-[0.9]
                      tracking-[-0.065em]
                      font-black
                      uppercase
                      ${textColor}
                    `}
                  >
                    {line}.
                  </h3>
                </Reveal>
              );
            })}
          </div>

          {/* Philosophy paragraph */}
          <Reveal className="mt-20 md:mt-10 ml-[20%] md:ml-[60%] max-w-125" delay={0.12}>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-gray-500 whitespace-pre-line">
              {profile?.philosophyParagraph ||
                "I care about building products that are clear, useful and built to last."}
            </p>
          </Reveal>
        </div>
      </div>

      <div className=" bg-white/15 h-px flex mx-auto "> </div>
    </section>
  );
};

export default About;
