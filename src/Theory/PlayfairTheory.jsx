import React from "react";

export default function PlayfairTheory() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Playfair Cipher Theory</h2>
      <p className="mb-4">
        The Playfair cipher encrypts digraphs (pairs of letters) using a 5×5 matrix
        generated from a keyword.
      </p>
      <h3 className="text-xl font-semibold mb-2">Steps</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Prepare text: replace J with I, split into pairs.</li>
        <li>Build 5×5 matrix from keyword.</li>
        <li>Encryption rules:
          <ul className="list-disc list-inside ml-6">
            <li>Same row → replace with right neighbor.</li>
            <li>Same column → replace with below neighbor.</li>
            <li>Rectangle → swap columns.</li>
          </ul>
        </li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Example</h3>
      <div className="bg-slate-800 p-4 rounded-lg font-mono">
        Plaintext: HELLO → HE LX LO <br />
        Key: KEYWORD <br />
        Ciphertext: BM ND ZO
      </div>
    </div>
  );
}
