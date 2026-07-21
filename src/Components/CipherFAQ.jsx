import React from "react";

function CipherFAQ() {
  return (
    <div className="bg-slate-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        {/* Caesar Cipher */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
            Caesar Cipher
          </h3>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What is the Caesar cipher?
            </summary>
            <p className="mt-3 text-gray-400">
              The Caesar cipher is a substitution cipher that shifts each letter
              of the alphabet by a fixed number of positions.
            </p>
          </details>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How does the Caesar cipher work?
            </summary>
            <p className="mt-3 text-gray-400">
              Each plaintext letter is replaced with another letter by moving a
              fixed number of positions forward or backward in the alphabet.
            </p>
          </details>

          <details className="bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Is the Caesar cipher secure?
            </summary>
            <p className="mt-3 text-gray-400">
              No. It has only 25 possible shifts and can be easily broken using
              brute force.
            </p>
          </details>
        </div>

        {/* Playfair Cipher */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
            Playfair Cipher
          </h3>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What is the Playfair cipher?
            </summary>
            <p className="mt-3 text-gray-400">
              Playfair is a digraph substitution cipher that encrypts pairs of
              letters using a 5×5 key matrix.
            </p>
          </details>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How does the Playfair cipher encrypt text?
            </summary>
            <p className="mt-3 text-gray-400">
              It divides text into letter pairs and encrypts each pair according
              to their positions in the key matrix.
            </p>
          </details>

          <details className="bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How do you break a Playfair cipher?
            </summary>
            <p className="mt-3 text-gray-400">
              It is commonly broken using frequency analysis of digraphs and
              known-plaintext techniques.
            </p>
          </details>
        </div>

        {/* Vigenère Cipher */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
            Vigenère Cipher
          </h3>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What is the Vigenère cipher?
            </summary>
            <p className="mt-3 text-gray-400">
              The Vigenère cipher is a polyalphabetic substitution cipher that
              uses a repeating keyword.
            </p>
          </details>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How does the Vigenère cipher work?
            </summary>
            <p className="mt-3 text-gray-400">
              Each plaintext letter is shifted according to the corresponding
              letter of the repeating keyword.
            </p>
          </details>

          <details className="bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Is the Vigenère cipher secure?
            </summary>
            <p className="mt-3 text-gray-400">
              It is stronger than Caesar but can be broken using techniques such
              as the Kasiski examination.
            </p>
          </details>
        </div>

        {/* Hill Cipher */}
        <div>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
            Hill Cipher
          </h3>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What is the Hill cipher?
            </summary>
            <p className="mt-3 text-gray-400">
              Hill Cipher is a block cipher that encrypts letters using matrix
              multiplication and modular arithmetic.
            </p>
          </details>

          <details className="mb-3 bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How does the Hill cipher encrypt text?
            </summary>
            <p className="mt-3 text-gray-400">
              It converts letters into numbers, groups them into blocks, and
              multiplies them by a key matrix modulo 26.
            </p>
          </details>

          <details className="bg-slate-900 rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What makes a Hill cipher key valid?
            </summary>
            <p className="mt-3 text-gray-400">
              The key matrix must have a modular inverse modulo 26 so the
              ciphertext can be decrypted.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

export default CipherFAQ;