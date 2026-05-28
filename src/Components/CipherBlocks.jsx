import React from "react";

export default function CipherBlocks() {
  const ciphers = [
    {
      title: "Caesar Cipher",
      description:
        "A simple substitution cipher that shifts letters by a fixed number in the alphabet.",
      link: "/caesar",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Playfair Cipher",
      description:
        "A digraph substitution cipher using a 5x5 matrix based on a keyword.",
      link: "/playfair",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Vigenère Cipher",
      description:
        "A polyalphabetic cipher using a keyword to encrypt alphabetic text.",
      link: "/vigenere",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Hill Cipher",
      description:
        "A polyalphabetic cipher using a keyword to encrypt alphabetic text.",
      link: "/hill",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Cipher Conversion Tools
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {ciphers.map((cipher, index) => (
            <div
              key={index}
              className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-cyan-400 transition duration-300 hover:-translate-y-2"
            >
              
              {/* Icon Circle */}
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-r ${cipher.color} flex items-center justify-center text-xl font-bold`}
              >
                🔐
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mt-5">
                {cipher.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mt-3 text-sm">
                {cipher.description}
              </p>

              {/* Button */}
              <a
                href={cipher.link}
                className="inline-block mt-5 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Open Tool →
              </a>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}