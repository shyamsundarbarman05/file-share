import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl bg-secondary-light/30 dark:bg-secondary-dark/30 backdrop-blur-lg rounded-full shadow-lg z-50"
    >
      <div className="flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-accent-blue">
          ShareFlow
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-accent-purple transition-colors">
            Home
          </Link>
          <Link
            to="/upload"
            className="hover:text-accent-purple transition-colors"
          >
            Upload
          </Link>
          <Link
            to="/history"
            className="hover:text-accent-purple transition-colors"
          >
            History
          </Link>
          <Link
            to="/about"
            className="hover:text-accent-purple transition-colors"
          >
            About
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
