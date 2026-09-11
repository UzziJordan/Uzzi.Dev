import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";
import { motion, useReducedMotion } from "framer-motion";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return (
      <section
        id="home"
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

  const technologies = profile?.heroTechnologyLabels || [];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#08090a] text-white"
    >
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "88px 88px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(30,60,110,0.12),transparent_35%)]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen max-w-300 mx-auto px-6 md:px-10 pt-25 pb-16 flex items-center">
        <div className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">

          {/* LEFT */}
          <motion.div
            className="max-w-170"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* LOCATION / AVAILABILITY */}
            <div className="flex items-center gap-3 mb-9">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />

              <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.32em] text-gray-500">
                {profile?.portraitCaption ||
                  "LAGOS, NIGERIA — OPEN TO WORK"}
              </span>
            </div>

            {/* ROLE */}
            <motion.h1
              className="
                max-w-162.5
                text-[clamp(3.6rem,7.7vw,7.8rem)]
                leading-[0.82]
                tracking-[-0.075em]
                font-black
                uppercase
                text-white
              "
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile?.role || "FULL-STACK DEVELOPER"}
            </motion.h1>

            {/* INTRO */}
            <p className="mt-10 max-w-142.5 text-[17px] md:text-[19px] leading-normal text-gray-500">
              {profile?.heroIntro ||
                "I build modern, scalable web applications — from intuitive interfaces to powerful backend systems."}
            </p>

            {/* TECHNOLOGIES */}
            {technologies.length > 0 && (
              <div className="mt-9 border-y border-white/20 py-4">
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {technologies.map((technology, index) => (
                    <motion.span
                      key={`${technology}-${index}`}
                      className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduceMotion ? 0 : 0.35 + index * 0.06 }}
                    >
                      {technology}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="
                  group
                  w-full
                  sm:w-48.25
                  bg-white
                  text-black
                  px-6
                  py-4
                  flex
                  items-center
                  justify-between
                  text-[9px]
                  font-mono
                  tracking-[0.25em]
                  uppercase
                  transition
                  hover:bg-gray-200
                "
              >
                <span>View My Work</span>

                <span className="text-base transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="
                  group
                  w-full
                  sm:w-44.25
                  border
                  border-white/15
                  text-white
                  px-6
                  py-4
                  flex
                  items-center
                  justify-between
                  text-[9px]
                  font-mono
                  tracking-[0.25em]
                  uppercase
                  transition
                  hover:border-white/40
                "
              >
                <span>Let's Talk</span>

                <span className="text-base text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-white">
                  ↗
                </span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT — PORTRAIT */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* BLUE CORNER DETAIL */}
            <div className="absolute -top-7 left-4 lg:-left-3 w-16 h-16 border-l border-t border-blue-500/50" />

            <div className="relative w-full max-w-91.25 border border-white/15 bg-[#0b0c0e]">

              {/* IMAGE HEADER */}
              <div className="h-13 px-4 flex items-center justify-between border-b border-white/15">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-600">
                  UZZI — PORTRAIT.JPG
                </span>

                <span className="text-[9px] font-mono text-gray-600">
                  01
                </span>
              </div>

              {/* PORTRAIT */}
              <div className="aspect-[0.83] overflow-hidden bg-black">
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile?.name || "Profile portrait"}
                    className="w-full h-full object-cover grayscale transition duration-700 hover:scale-[1.03] hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-gray-700">
                      NO PORTRAIT
                    </span>
                  </div>
                )}
              </div>

              {/* CARD FOOTER */}
              <div className="grid grid-cols-2 border-t border-white/15">

                <div className="p-4 border-r border-white/15">
                  <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-gray-600">
                    Rule
                  </p>

                  <p className="mt-2 text-xs text-gray-300">
                    Full-Stack
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-gray-600">
                    Focus
                  </p>

                  <p className="mt-2 text-xs text-gray-300">
                    Web Products
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className=" bg-bg-white/15 h-[0.5px] justify-center flex items-center mx-auto ">

      </div>

    </section>
  );
};

export default Home;
