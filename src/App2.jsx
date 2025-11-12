// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

function AnimatedLoginLayout() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };

  const pageTransition = {
    duration: 0.3,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
      >
        <Outlet /> 
      </motion.div>
    </AnimatePresence>
  );
}

export default function App2() {
  return <AnimatedLoginLayout />;
}