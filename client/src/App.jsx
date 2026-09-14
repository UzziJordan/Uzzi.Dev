import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AppRoutes from "./routes/AppRoutes";
import WelcomeScreen from "./components/public/WelcomeScreen";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPage, setShowPage] = useState(false);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
  }, []);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          opacity: showPage ? 1 : 0,
          scale: showPage ? 1 : 1.035,
          clipPath: showPage
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`min-h-screen bg-[#08090a] ${
          showPage ? "" : "pointer-events-none"
        }`}
      >
        <AppRoutes />
      </motion.div>

      <AnimatePresence onExitComplete={() => setShowPage(true)}>
        {showWelcome && (
          <WelcomeScreen
            onComplete={handleWelcomeComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
