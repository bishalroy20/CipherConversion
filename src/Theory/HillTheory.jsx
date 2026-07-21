import React from "react";

export default function HillTheory() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Hill Cipher Theory</h2>
      <p className="mb-4">
        The Hill cipher is a polygraphic substitution cipher based on linear algebra.
        It uses matrix multiplication modulo 26.
      </p>
      <h3 className="text-xl font-semibold mb-2">Steps</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Choose an invertible (n times n) key matrix (K).</li>
        <li>Convert plaintext into vectors of length (n).</li>
        <li>Encrypt: ( C = K cdot P mod 26 ).</li>
        <li>Decrypt: ( P = K^{-1} cdot C mod 26 ).</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Example</h3>
      <div className="bg-slate-800 p-4 rounded-lg font-mono">
        Plaintext: HI <br />
        Key Matrix: [[3,3],[2,5]] <br />
        Ciphertext: MP
      </div>
    </div>
  );
}
