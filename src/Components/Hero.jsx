import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-slate-950 text-white min-h-[85vh] flex items-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left">

        {/* Badge */}
        <div className="inline-block px-4 py-1 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm">
          🔐 Modern Cryptography Tool
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Cipher Conversion{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
            Made Simple
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto md:mx-0">
          Encrypt, decrypt, and explore classical ciphers like Caesar, Playfair,
          Vigenère, and Hill with a fast, modern and interactive interface.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

          <a
            href="/caesar"
            className="px-7 py-3 rounded-lg font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
          >
            Start Converting
          </a>

          <a
            href="/about"
            className="px-7 py-3 rounded-lg border border-slate-600 hover:border-cyan-400 text-white hover:text-cyan-300 transition"
          >
            Learn More
          </a>

        </div>

        {/* Small hint text */}
        <p className="mt-6 text-sm text-gray-500">
          No signup required • Instant encryption & decryption
        </p>

      </div>
    </section>
  );
}