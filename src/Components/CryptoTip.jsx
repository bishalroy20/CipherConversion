import React, { useEffect, useState } from "react";

function CryptoTip() {
  const tips = [
    "Caesar Cipher shifts each letter by a fixed number.",
    "Playfair Cipher encrypts letters in pairs (digraphs).",
    "Vigenère Cipher uses a repeating keyword.",
    "Hill Cipher uses matrix multiplication for encryption.",
    "A Hill Cipher key matrix must have a modular inverse modulo 26.",
    "Classical ciphers are great for learning cryptography but are not secure for modern use.",
    "Always use the correct key to decrypt ciphertext.",
    "Removing spaces before encryption is common in classical ciphers.",
  ];

  const [tip, setTip] = useState("");

  const randomTip = () => {
    const index = Math.floor(Math.random() * tips.length);
    setTip(tips[index]);
  };

  useEffect(() => {
    randomTip();
  }, []);

  return (
    <div className="bg-slate-950 text-white py-10 px-40  mx-auto p-6 ">
    {/* <div className="bg-slate-950 rounded-2xl p-6 border  max-w-4xl  my-10"> */}
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        💡 Crypto Tip
      </h2>

      <p className="text-gray-300 text-lg mb-6">{tip}</p>

      <button
        onClick={randomTip}
        className="px-5 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400"
      >
        Show Another Tip
      </button>
    </div>
  );
}

export default CryptoTip;