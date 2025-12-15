import React from "react";

const Footer = () => {
  return (
    <footer className="bg-rose-200 px-4 py-6 animate-footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <h2 className="font-semibold text-lg">WeddingFlow</h2>

        {/* Links */}
        <ul className="flex gap-6 text-sm">
          <li>
            <a href="/about" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-sm text-gray-700 text-center">
          © {new Date().getFullYear()} WeddingFlow. All rights reserved.
          <br className="md:hidden" />
          <span className="ml-1">
            Developed by <span className="font-medium">JM Raita</span>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
