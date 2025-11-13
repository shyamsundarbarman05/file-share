import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Download from "./pages/Download";
import History from "./pages/History";
import About from "./pages/About";
import Footer from "./components/Footer";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : ""
      } bg-primary-light dark:bg-primary-dark min-h-screen text-text-light dark:text-text-dark`}
    >
      <Router>
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/download/:fileId" element={<Download />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
