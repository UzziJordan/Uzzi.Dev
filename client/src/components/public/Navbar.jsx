import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navItems = [
  { label: "HOME", id: "home" },
  { label: "ABOUT", id: "about" },
  { label: "PROJECTS", id: "projects" },
  { label: "STACK", id: "stack" },
  { label: "CONTACT", id: "contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 140;

      let currentSection = "home";

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const handleNavigation = (id) => {
    setMenuOpen(false);
    // Already on homepage
    if (isHomePage) {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // Coming from another public page
    navigate(`/#${id}`);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090a]/90 backdrop-blur-md"
          : "bg-[#08090a]/60"
      }`}
    >
      <div className="h-18 border-b border-white/10">
        <div className="h-full max-w-300 mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => handleNavigation("home")}
            className="shrink-0 text-white text-[16px] font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            UZZI.DEV
          </button>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-10 absolute left-1/2 -translate-x-1/2 h-full">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.id)
                  }
                  className={`relative h-full flex items-center text-[10px] font-mono tracking-[0.3em] transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-300"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-4.5 left-0 right-0 h-px bg-blue-500 transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* AVAILABLE */}
          <div className="hidden sm:flex items-center shrink-0 border border-white/15 h-9 px-4 md:px-5">
            <span className="text-[9px] md:text-[10px] font-mono font-semibold tracking-[0.24em] text-gray-300 whitespace-nowrap">
              AVAILABLE FOR WORK
            </span>
          </div>

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden w-10 h-10 border border-white/15 flex flex-col items-center justify-center gap-1.5 transition-colors hover:border-white/40"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-4 h-px bg-gray-400 transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block w-4 h-px bg-gray-400 transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-white/10 bg-[#08090a] md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item.id)}
                  className={`flex w-full items-center justify-between border-b border-white/10 py-4 text-left font-mono text-[10px] tracking-[0.28em] transition-colors ${activeSection === item.id ? "text-white" : "text-gray-500 hover:text-white"}`}
                >
                  {item.label}
                  <span className="text-blue-400">↗</span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
