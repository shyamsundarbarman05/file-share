import React from "react";

const History = () => {
  // Dummy data
  const fileHistory = [
    { id: 1, name: "document.pdf", date: "2024-01-01", link: "/download/1" },
    { id: 2, name: "image.jpg", date: "2024-01-02", link: "/download/2" },
    { id: 3, name: "archive.zip", date: "2024-01-03", link: "/download/3" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">File History</h1>
      <div className="max-w-3xl mx-auto">
        {fileHistory.map((file) => (
          <div
            key={file.id}
            className="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg mb-4 flex justify-between items-center shadow-md"
          >
            <div>
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file.date}
              </p>
            </div>
            <a href={file.link} className="text-accent-blue hover:underline">
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
