import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#030712] text-gray-100 py-12 px-6 sm:px-12">
      <div className="container mx-auto max-w-[90rem]">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="/" className="hover:text-gray-400">
                  Introduction
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@example.com"
                  className="hover:text-gray-400"
                >
                  support@example.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-gray-400">
                  +1 234 567 890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 border-t border-gray-600"></div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-400">
          <div>© CERTIFY SUPRIYA SAHA - 2024</div>
          <div className="flex gap-4">
            <a href="/" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="/" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
