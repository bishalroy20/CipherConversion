import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import PlayfairTheory from "../Theory/PlayfairTheory";

// ✅ Configure pdf.js worker
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

/* Generate 5x5 matrix */
const generateMatrix = (key) => {
  key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let matrix = [];
  let used = new Set();

  for (let char of key + "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
    if (!used.has(char)) {
      used.add(char);
      matrix.push(char);
    }
  }

  let grid = [];
  for (let i = 0; i < 5; i++) {
    grid.push(matrix.slice(i * 5, i * 5 + 5));
  }
  return grid;
};

/* Find letter position */
const findPosition = (matrix, char) => {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (matrix[r][c] === char) return [r, c];
    }
  }
};

/* Prepare text for encryption */
const prepareText = (text) => {
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let a = text[i];
    let b = text[i + 1];

    if (a === b) {
      result += a + "X";
    } else {
      result += a;
      if (b) {
        result += b;
        i++;
      }
    }
  }

  if (result.length % 2 !== 0) result += "X";
  return result;
};

/* Encrypt */
const playfairEncrypt = (text, key) => {
  const matrix = generateMatrix(key);
  text = prepareText(text);
  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    let a = text[i];
    let b = text[i + 1];
    let [r1, c1] = findPosition(matrix, a);
    let [r2, c2] = findPosition(matrix, b);

    if (r1 === r2) {
      result += matrix[r1][(c1 + 1) % 5];
      result += matrix[r2][(c2 + 1) % 5];
    } else if (c1 === c2) {
      result += matrix[(r1 + 1) % 5][c1];
      result += matrix[(r2 + 1) % 5][c2];
    } else {
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    }
  }
  return result;
};

/* Decrypt */
const playfairDecrypt = (text, key) => {
  const matrix = generateMatrix(key);
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    let a = text[i];
    let b = text[i + 1];
    let [r1, c1] = findPosition(matrix, a);
    let [r2, c2] = findPosition(matrix, b);

    if (r1 === r2) {
      result += matrix[r1][(c1 + 4) % 5];
      result += matrix[r2][(c2 + 4) % 5];
    } else if (c1 === c2) {
      result += matrix[(r1 + 4) % 5][c1];
      result += matrix[(r2 + 4) % 5][c2];
    } else {
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    }
  }
  return result;
};

export default function PlayfairPage() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [key, setKey] = useState("KEYWORD");
  const [mode, setMode] = useState("encrypt");
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
      return;
    } else {
      toast.error("Unsupported file type. Please upload txt, pdf, or jpg/png.");
      return;
    }

    if (mode === "encrypt") {
      setPlainText(extractedText);
    } else {
      setCipherText(extractedText);
    }
  };

  const handleConvert = () => {
    if (!key.trim()) {
      toast.error("Please enter a key.");
      return;
    }

    let result;
    if (mode === "encrypt") {
      if (!plainText.trim()) {
        toast.error("Enter plain text or upload a file.");
        return;
      }
      result = playfairEncrypt(plainText, key);
      setCipherText(result);
      setOutput(result);
      toast.success("Encryption complete!");
    } else {
      if (!cipherText.trim()) {
        toast.error("Enter cipher text or upload a file.");
        return;
      }
      result = playfairDecrypt(cipherText, key);
      setPlainText(result);
      setOutput(result);
      toast.success("Decryption complete!");
    }
  };

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

      <PlayfairTheory />
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Playfair Cipher Converter
        </h1>

        {/* File Upload */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm">Upload File (txt, pdf, jpg/png)</label>
          <input
            type="file"
            accept=".txt,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 mt-2"
          />
        </div>



        {/* Key */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm">Cipher Key</label>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 mt-2"
            placeholder="Enter keyword..."
          />
        </div>

        {/* Text Areas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <textarea
            placeholder="Plain Text"
            value={plainText}
            maxLength={500}
            onChange={(e) => setPlainText(e.target.value)}
            rows={6}
            disabled={mode !== "encrypt"}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          />
          <textarea
            placeholder="Cipher Text"
            value={cipherText}
            maxLength={500}
            onChange={(e) => setCipherText(e.target.value)}
            rows={6}
            disabled={mode !== "decrypt"}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSwap}
            className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            ⇄ Swap Mode ({mode})
          </button>
          <button
            onClick={handleConvert}
            className="px-6 py-3 bg-cyan-500 text-black rounded-lg font-semibold hover:bg-cyan-400"
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



        {/* Matrix Display */}
<div className="mt-10">
  <h2 className="text-xl font-semibold mb-4 text-center">Playfair Matrix</h2>
  <div className="grid grid-cols-5 gap-2 justify-center max-w-xs mx-auto">
    {generateMatrix(key).map((row, rIndex) =>
      row.map((char, cIndex) => (
        <div
          key={`${rIndex}-${cIndex}`}
          className="flex items-center justify-center bg-slate-800 border border-slate-600 rounded-md h-12 w-12 text-lg font-bold"
        >
          {char}
        </div>
      ))
    )}
  </div>
</div>

      </div>
      <ToastContainer theme="dark" />
    </div>
  );
}
