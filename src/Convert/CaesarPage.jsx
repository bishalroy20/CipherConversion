import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

// ✅ Configure pdf.js worker for React/Vite/CRA
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
    } else {
      result += text[i];
    }
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
    } else {
      result += text[i];
    }
  }
  return result;
};

function CaesarPage() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  // Handle file upload
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
        const { data: { text } } = await Tesseract.recognize(reader.result, "eng");
        if (mode === "encrypt") {
          setPlainText(text);
        } else {
          setCipherText(text);
        }
      };
      reader.readAsDataURL(file);
      return; // exit early because OCR is async
    } else {
      toast.error("Unsupported file type. Please upload txt, pdf, or jpg/png.");
      return;
    }

    // ✅ Assign text to correct field depending on mode
    if (mode === "encrypt") {
      setPlainText(extractedText);
    } else {
      setCipherText(extractedText);
    }
  };

  // Convert text
  const handleConvert = () => {
    if (!shift || isNaN(shift)) {
      toast.error("Please enter a valid shift number.");
      return;
    }

    let result;
    if (mode === "encrypt") {
      if (!plainText.trim()) {
        toast.error("Please enter plain text or upload a file.");
        return;
      }
      result = caesarEncrypt(plainText, parseInt(shift));
      setCipherText(result);
      setOutput(result);
      toast.success("Encryption successful!");
    } else {
      if (!cipherText.trim()) {
        toast.error("Please enter cipher text or upload a file.");
        return;
      }
      result = caesarDecrypt(cipherText, parseInt(shift));
      setPlainText(result);
      setOutput(result);
      toast.success("Decryption successful!");
    }
  };

  // Download output
  const handleDownload = () => {
    if (!output) {
      toast.error("No output to download.");
      return;
    }
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";
    link.click();
  };

  const handleSwap = () => {
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    setPlainText("");
    setCipherText("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Caesar Cipher Converter
        </h1>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-400">Upload File (txt, pdf, jpg/png)</label>
          <input
            type="file"
            accept=".txt,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3"
          />
        </div>

        {/* Shift Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-400">Shift Value</label>
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3"
            placeholder="Enter shift (0-25)..."
          />
        </div>

        {/* Text Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Plain Text</label>
            <textarea
              placeholder="Enter plain text..."
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              rows={6}
              disabled={mode !== "encrypt"}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Cipher Text</label>
            <textarea
              placeholder="Cipher result..."
              value={cipherText}
              onChange={(e) => setCipherText(e.target.value)}
              rows={6}
              disabled={mode !== "decrypt"}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleSwap}
            className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          >
            ⇄ Swap Mode ({mode})
          </button>
          <button
            onClick={handleConvert}
            className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
          >
            Convert
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-400 text-black font-semibold transition"
          >
            Download TXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaesarPage;
