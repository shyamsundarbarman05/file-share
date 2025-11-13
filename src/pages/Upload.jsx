import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import QRCode from "qrcode.react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileId, setFileId] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Reset state for new upload
      setFile(acceptedFiles[0]);
      setFileId(null);
      setUploadProgress(0);
      setError("");

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      axios
        .post("/api/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        })
        .then((res) => {
          if (res.data && res.data.fileId) {
            setFileId(res.data.fileId);
          } else {
            setError("Could not get share code from server.");
          }
        })
        .catch((err) => {
          console.error("Upload failed:", err);
          setError("File upload failed. Please try again.");
        });
    },
    []

    // eslint-disable-next-line react-hooks/exhaustive-deps
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const shareLink = fileId
    ? `${window.location.origin}/download/${fileId}`
    : "";

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Upload Files</h1>
      <div className="max-w-2xl mx-auto">
        <motion.div
          {...getRootProps()}
          className={`p-12 border-4 border-dashed rounded-2xl text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-accent-purple bg-accent-purple/10"
              : "border-gray-300 dark:border-gray-600"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop a file here, or click to select a file</p>
        </motion.div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {file && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Selected File:</h3>
            <div className="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg mb-2 shadow-md">
              {file.path} - {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <motion.div
                    className="bg-gradient-to-r from-accent-blue to-accent-purple h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  />
                </div>
                <p className="text-center mt-2">{uploadProgress}%</p>
              </div>
            )}
          </div>
        )}

        {fileId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-secondary-light dark:bg-secondary-dark rounded-2xl shadow-neumorphic-light dark:shadow-neumorphic-dark text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">
              File ready to share!
            </h3>
            <p className="mb-2">Your Share Code is:</p>
            <p className="text-4xl font-bold text-accent-purple mb-4">
              {fileId}
            </p>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="w-full p-2 border rounded bg-primary-light dark:bg-primary-dark"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="bg-accent-blue text-white px-4 py-2 rounded-lg"
              >
                Copy Link
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <QRCode value={shareLink} size={128} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Upload;
