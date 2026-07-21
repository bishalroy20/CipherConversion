import React from "react";

export default function VigenereTheory() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Vigenère Cipher Theory</h2>
      <p className="mb-4">
        The Vigenère cipher is a polyalphabetic substitution cipher that uses a keyword
        to determine the shift for each letter.
      </p>
      <h3 className="text-xl font-semibold mb-2">Steps</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Repeat the keyword to match the plaintext length.</li>
        <li>For each letter: ( C_i = (P_i + K_i) mod 26 ).</li>
        <li>Decrypt: ( P_i = (C_i - K_i) mod 26 ).</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Example</h3>
      <div className="bg-slate-800 p-4 rounded-lg font-mono">
        Plaintext: HELLO <br />
        Key: KEY <br />
        Ciphertext: RIJVS
      </div>
    </div>
  );
}
