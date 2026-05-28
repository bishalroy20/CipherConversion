import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

// ✅ Configure pdf.js worker
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// Generate full key
const generateKey = (text, key) => {
  key = key.toUpperCase().replace(/[^A-Z]/g, "");
  let fullKey = "";
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/.test(text[i])) {
      fullKey += key[j % key.length];
      j++;
    } else {
      fullKey += text[i];
    }
  }
  return fullKey;
};

// Encrypt
const vigenereEncrypt = (text, key) => {
  text = text.toUpperCase();
  key = generateKey(text, key);
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/.test(text[i])) {
      let shift = key.charCodeAt(i) - 65;
      result += String.fromCharCode(((text.charCodeAt(i) - 65 + shift) % 26) + 65);
    } else {
      result += text[i];
    }
  }
  return result;
};

// Decrypt
const vigenereDecrypt = (text, key) => {
  text = text.toUpperCase();
  key = generateKey(text, key);
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (/[A-Z]/.test(text[i])) {
      let shift = key.charCodeAt(i) - 65;
      result += String.fromCharCode(((text.charCodeAt(i) - 65 - shift + 26) % 26) + 65);
    } else {
      result += text[i];
    }
  }
  return result;
};

function VigenerePage() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [key, setKey] = useState("KEYWORD");
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
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let textContent = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          textContent += strings.join(" ") + "\n";
        }
        if (!textContent.trim()) {
          toast.error("No text found in PDF (likely scanned).");
          return;
        }
        extractedText = textContent;
      } catch (err) {
        console.error("PDF extraction error:", err);
        toast.error("Failed to extract text from PDF.");
        return;
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
    if (!key.trim()) {
      toast.error("Please enter a key.");
      return;
    }

    let result;
    if (mode === "encrypt") {
      if (!plainText.trim()) {
        toast.error("Please enter plain text or upload a file.");
        return;
      }
      result = vigenereEncrypt(plainText, key);
      setCipherText(result);
      setOutput(result);
      toast.success("Encryption successful!");
    } else {
      if (!cipherText.trim()) {
        toast.error("Please enter cipher text or upload a file.");
        return;
      }
      result = vigenereDecrypt(cipherText, key);
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
          Vigenère Cipher Converter
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

        {/* Key Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-400">Cipher Key (Keyword)</label>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3"
            placeholder="Enter keyword..."
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


export default VigenerePage;
