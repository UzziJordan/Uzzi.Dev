import Navbar from "../components/public/Navbar";
import Home from "../components/public/Home";
import About from "../components/public/About";
import Projects from "../components/public/Projects";
import Stack from "../components/public/Stack";
import Contact from "../components/public/Contact";
import { motion } from "framer-motion";

const PublicHome = () => {
  return (
    <div className="bg-[#08090a] text-white">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Home />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </motion.main>
    </div>
  );
};

export default PublicHome;
