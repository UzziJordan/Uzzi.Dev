import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((current) => {
        const next = current + increment;

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }

        return next;
      });
    }, intervalTime);

    const timeout = setTimeout(() => {
      onComplete();
    }, 3100);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex min-h-screen items-center overflow-hidden bg-[#050607] text-white"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Blue glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950/20 blur-[140px]" />

      {/* Content */}
      <div className="relative w-full px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1650px]">
          {/* Small label */}
          <div className="mb-8 flex items-center gap-5 sm:mb-10">
            <span className="h-px w-16 bg-white/30" />

            <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-blue-300/70 sm:text-xs">
              System Initializing...
            </span>
          </div>

          {/* Main title */}
          <div>
            <p className="animate-[fadeIn_0.7s_ease-out] text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.06em] text-white/80">
              WELCOME TO
            </p>

            <h1 className="mt-2 text-[clamp(4rem,12vw,11rem)] font-black leading-[0.78] tracking-[-0.075em] text-white">
              UZZI.DEV
            </h1>
          </div>

          {/* Descriptor */}
          <div className="mt-8 sm:mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gray-500 sm:text-xs">
              IDEAS{" "}
              <span className="text-blue-500">/</span>{" "}
              CODE{" "}
              <span className="text-blue-500">/</span>{" "}
              PRODUCTS{" "}
              <span className="text-blue-500">/</span>{" "}
              IMPACT
            </p>
          </div>

          {/* Loading line */}
          <div className="mt-10 flex items-center gap-5 sm:mt-12 sm:gap-8">
            <div className="relative h-px flex-1 bg-white/10">
              <div
                className="absolute left-0 top-0 h-px bg-blue-500 transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />

              <div
                className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]"
                style={{
                  left: `${progress}%`,
                }}
              />
            </div>

            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600 sm:text-xs">
              Loading Portfolio...
            </span>
          </div>

          {/* Percentage */}
          <div className="mt-3 flex justify-end">
            <span className="font-mono text-[9px] tracking-[0.25em] text-gray-700">
              {Math.round(progress)
                .toString()
                .padStart(3, "0")}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Corner details */}
      <div className="absolute bottom-6 left-6 font-mono text-[8px] uppercase tracking-[0.3em] text-gray-800 sm:left-10">
        UZZI.DEV / 001
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[8px] uppercase tracking-[0.3em] text-gray-800 sm:right-10">
        Full-Stack Developer
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
