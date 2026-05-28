import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// Encrypt
const caesarEncrypt = (text, shift) => {
  text = text.toUpperCase();
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/.test(text[i])) {
      result += String.fromCharCode(((text.charCodeAt(i) - 65 + shift) % 26) + 65);
    } else result += text[i];
  }
  return result;
};

// Decrypt
const caesarDecrypt = (text, shift) => {
  text = text.toUpperCase();
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/.test(text[i])) {
      result += String.fromCharCode(((text.charCodeAt(i) - 65 - shift + 26) % 26) + 65);
    } else result += text[i];
  }
  return result;
};

export default function CaesarPage() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    let extractedText = "";

    if (ext === "txt") {
      extractedText = await file.text();
    } else if (ext === "pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        extractedText += content.items.map((item) => item.str).join(" ") + "\n";
      }
    } else if (["jpg", "jpeg", "png"].includes(ext)) {
      const reader = new FileReader();
      reader.onload = async () => {
        const {
          data: { text },
        } = await Tesseract.recognize(reader.result, "eng");

        mode === "encrypt" ? setPlainText(text) : setCipherText(text);
      };
      reader.readAsDataURL(file);
      return;
    } else {
      toast.error("Unsupported file type");
      return;
    }

    mode === "encrypt"
      ? setPlainText(extractedText)
      : setCipherText(extractedText);
  };

  const handleConvert = () => {
    if (!shift || isNaN(shift)) return toast.error("Invalid shift");

    let result;

    if (mode === "encrypt") {
      if (!plainText.trim()) return toast.error("Enter text");
      result = caesarEncrypt(plainText, Number(shift));
      setCipherText(result);
    } else {
      if (!cipherText.trim()) return toast.error("Enter cipher text");
      result = caesarDecrypt(cipherText, Number(shift));
      setPlainText(result);
    }

    setOutput(result);
    toast.success("Success!");
  };

  const handleDownload = () => {
    if (!output) return toast.error("No output");
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <ToastContainer theme="dark" position="top-right" autoClose={2000} />

      {/* Card */}
      <div className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-xl p-4 sm:p-8">

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-white">
          Caesar Cipher Converter
        </h1>

        <p className="text-center text-gray-400 mt-2 text-sm sm:text-base">
          Encrypt & Decrypt text instantly
        </p>

        {/* Upload */}
        <div className="mt-6">
          <label className="text-gray-400 text-sm">Upload File</label>
          <input
            type="file"
            accept=".txt,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="mt-2 w-full text-sm bg-slate-800 border border-slate-700 rounded-lg p-3"
          />
        </div>

        {/* Shift */}
        <div className="mt-5">
          <label className="text-gray-400 text-sm">Shift Value</label>
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Text Areas */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          <textarea
            placeholder="Plain text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            disabled={mode !== "encrypt"}
            className="w-full h-40 sm:h-48 bg-slate-800 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          />

          <textarea
            placeholder="Cipher text"
            value={cipherText}
            onChange={(e) => setCipherText(e.target.value)}
            disabled={mode !== "decrypt"}
            className="w-full h-40 sm:h-48 bg-slate-800 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Buttons (mobile-friendly wrap) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">

          <button
            onClick={() => setMode(mode === "encrypt" ? "decrypt" : "encrypt")}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          >
            ⇄ Switch ({mode})
          </button>

          <button
            onClick={handleConvert}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
          >
            Convert
          </button>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-green-500 hover:bg-green-400 text-black font-semibold transition"
          >
            Download
          </button>

        </div>
      </div>
    </div>
  );
}