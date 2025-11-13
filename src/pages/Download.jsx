import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Download = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/file/${fileId}`)
      .then((res) => {
        setFile(res.data);
      })
      .catch((err) => {
        setError("File not found or has expired.");
        console.error(err);
      });
  }, [fileId]);

  const handleDownload = () => {
    window.location.href = `/api/download/${fileId}`;
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-secondary-light dark:bg-secondary-dark rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Your file is ready!</h2>
        <p className="mb-2">File ID: {file.fileId}</p>
        <p className="mb-6">File Name: {file.originalName}</p>
        <p className="mb-6">
          File Size: {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold py-3 px-8 rounded-full shadow-lg"
        >
          Download Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Download;
