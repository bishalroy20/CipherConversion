import React from "react";

export default function Hero() {
  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Cipher Conversion
            <span className="text-cyan-400"> Made Simple</span>
          </h1>

          <p className="mt-6 text-gray-400">
            Encrypt, decrypt, and convert ciphers instantly. 
            Our tool helps you explore cryptography with an easy 
            and modern interface.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/convert"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold transition"
            >
              Start Converting
            </a>

            <a
              href="/about"
              className="border border-gray-600 hover:border-cyan-400 px-6 py-3 rounded-lg transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Grid Design */}
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-cyan-500/20 rounded-xl"></div>
          <div className="h-24 bg-purple-500/20 rounded-xl"></div>
          <div className="h-24 bg-blue-500/20 rounded-xl"></div>

          <div className="h-24 bg-green-500/20 rounded-xl"></div>
          <div className="h-24 bg-cyan-400/30 rounded-xl"></div>
          <div className="h-24 bg-indigo-500/20 rounded-xl"></div>

          <div className="h-24 bg-pink-500/20 rounded-xl"></div>
          <div className="h-24 bg-blue-500/20 rounded-xl"></div>
          <div className="h-24 bg-cyan-500/20 rounded-xl"></div>
        </div>

      </div>
    </section>
  );
}