import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            CipherTool
          </h2>
          <p className="mt-3 text-sm">
            A simple web tool for cipher encryption,
            decryption and cryptography learning.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-cyan-400">Home</a></li>
            <li><a href="/caesar" className="hover:text-cyan-400">Convert</a></li>
            <li><a href="/about" className="hover:text-cyan-400">About</a></li>
            <li><a href="/contact" className="hover:text-cyan-400">Contact</a></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            About
          </h3>
          <p className="text-sm">
            Explore different cipher techniques and learn 
            cryptography with an interactive conversion tool.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
        © {new Date().getFullYear()} CipherTool. All rights reserved.
      </div>
    </footer>
  );
}