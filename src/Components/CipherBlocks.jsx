import React from "react";

export default function CipherBlocks() {
  const ciphers = [
    {
      title: "Caesar Cipher",
      description:
        "A simple substitution cipher that shifts letters by a fixed number in the alphabet.",
      link: "/caesar",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Playfair Cipher",
      description:
        "A digraph substitution cipher using a 5x5 matrix based on a keyword.",
      link: "/playfair",
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Vigenère Cipher",
      description:
        "A polyalphabetic cipher using a keyword to encrypt alphabetic text.",
      link: "/vigenere",
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Hill Cipher",
      description:
        "A polyalphabetic cipher based on linear algebra and matrix transformations.",
      link: "/hill",
      color: "from-indigo-400 to-cyan-500",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-24 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16">
          Cipher Conversion{" "}
          <span className="text-cyan-400">Tools</span>
        </h2>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {ciphers.map((cipher, index) => (
            <div
              key={index}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 hover:from-cyan-500 hover:to-purple-500 transition"
            >
              <div className="h-full bg-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition duration-300">

                {/* Top Accent Bar */}
                <div
                  className={`h-1 w-16 rounded-full bg-gradient-to-r ${cipher.color} mb-5`}
                ></div>

                {/* Icon */}
                <div className="text-2xl mb-4">🔐</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white">
                  {cipher.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {cipher.description}
                </p>

                {/* Button */}
                <a
                  href={cipher.link}
                  className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition"
                >
                  Open Tool
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}