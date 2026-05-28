import React from "react";

function About() {
  return (
    <div className=" bg-slate-950 text-white py-6 px-6">
      <div className="max-w-full mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          About Cipher Conversions
        </h1>

        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          This project provides three classic cipher conversion methods —
          <span className="font-semibold text-cyan-400"> Caesar, Playfair, and Vigenère</span>.
          Each cipher demonstrates a different approach to encryption and decryption,
          helping you understand the evolution of cryptography and how text can be
          secured or transformed.
        </p>

        <div className="space-y-6">
          {/* Caesar Cipher */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">Caesar Cipher</h2>
            <p className="text-gray-400">
              One of the simplest substitution ciphers, Caesar shifts each letter
              by a fixed number of positions in the alphabet. It’s easy to implement
              and demonstrates the basics of encryption, though it’s not secure by
              modern standards.
            </p>
          </div>

          {/* Playfair Cipher */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">Playfair Cipher</h2>
            <p className="text-gray-400">
              Playfair uses a 5×5 matrix of letters based on a keyword. It encrypts
              pairs of letters (digraphs) instead of single characters, making it
              stronger than simple substitution. It was historically used for military
              communication.
            </p>
          </div>

          {/* Vigenère Cipher */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">Vigenère Cipher</h2>
            <p className="text-gray-400">
              Vigenère applies a repeating keyword to shift letters by varying amounts.
              This polyalphabetic cipher resists frequency analysis better than Caesar,
              and represents a significant step forward in classical cryptography.
            </p>
          </div>
        </div>

        <p className="text-gray-300 mt-8 text-lg leading-relaxed">
          Together, these ciphers illustrate how encryption techniques evolved from
          simple shifts to more complex polyalphabetic systems. They provide a hands-on
          way to learn about the foundations of secure communication.
        </p>
      </div>
    </div>
  );
}

export default About;
