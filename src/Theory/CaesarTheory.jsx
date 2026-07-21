import React from "react";

export default function CaesarTheory() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Caesar Cipher Theory</h2>
      <p className="mb-4">
        The Caesar cipher is a substitution cipher where each letter in the plaintext
        is shifted by a fixed number of positions in the alphabet.
      </p>
      <h3 className="text-xl font-semibold mb-2">Steps</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Choose a shift value (k).</li>
        <li>For each letter, compute: ( C = (P + k) mod 26 ).</li>
        <li>Decrypt by reversing: ( P = (C - k) mod 26 ).</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Example</h3>
      <div className="bg-slate-800 p-4 rounded-lg font-mono">
        Plaintext: HELLO <br />
        Shift: 3 <br />
        Ciphertext: KHOOR
      </div>
    </div>
  );
}
