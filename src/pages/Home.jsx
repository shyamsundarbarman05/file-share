import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleFindFile = (e) => {
    e.preventDefault();
    if (code) {
      navigate(`/download/${code}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Send Files Instantly, Beautifully.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          A modern, colorful, and dynamic file transfer experience.
        </p>
        <Link to="/upload">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-accent-blue font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Have a code?</h2>
        <form
          onSubmit={handleFindFile}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter share code"
            className="w-full px-4 py-3 rounded-full text-text-light dark:text-text-dark bg-secondary-light/80 dark:bg-secondary-dark/80 focus:outline-none focus:ring-2 focus:ring-accent-purple"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-accent-pink text-white font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Find File
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;
