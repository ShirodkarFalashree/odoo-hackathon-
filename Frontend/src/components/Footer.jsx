import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-10 py-6 border-t border-gray-800 text-gray-400 text-center">
      <p className="text-sm tracking-wide">
        © {new Date().getFullYear()} <span className="text-white font-semibold">IMS Lite</span>. 
        All rights reserved.
      </p>
      <p className="text-xs mt-1 opacity-70">
        Built for seamless inventory management.
      </p>
    </footer>
  );
};

export default Footer;
