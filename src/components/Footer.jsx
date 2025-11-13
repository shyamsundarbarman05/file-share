import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary-light dark:bg-secondary-dark mt-12 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 ShareFlow. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-accent-blue">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-accent-blue">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
