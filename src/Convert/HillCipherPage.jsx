import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import HillTheory from "../Theory/HillTheory";

// PDF Worker
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

/* =========================
   HILL CIPHER LOGIC
========================= */

// Matrix inverse mod 26
const modInverse = (a, m) => {
  a = ((a % m) + m) % m;

  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }

  return null;
};

// Generate key matrix
const generateKeyMatrix = (key) => {
  key = key.toUpperCase().replace(/[^A-Z]/g, "");

  if (key.length < 4) {
    key = key.padEnd(4, "X");
  }

  key = key.slice(0, 4);

  return [
    [
      key.charCodeAt(0) - 65,
      key.charCodeAt(1) - 65,
    ],
    [
      key.charCodeAt(2) - 65,
      key.charCodeAt(3) - 65,
    ],
  ];
};

// Validate matrix
const isValidMatrix = (matrix) => {
  const det =
    matrix[0][0] * matrix[1][1] -
    matrix[0][1] * matrix[1][0];

  const determinant = ((det % 26) + 26) % 26;

  return modInverse(determinant, 26) !== null;
};

// Prepare text
const prepareText = (text) => {
  text = text
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  if (text.length % 2 !== 0) {
    text += "X";
  }

  return text;
};

// Encrypt
const hillEncrypt = (text, key) => {
  const matrix = generateKeyMatrix(key);

  if (!isValidMatrix(matrix)) {
    return "INVALID_MATRIX";
  }

  text = prepareText(text);

  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    const p1 = text.charCodeAt(i) - 65;
    const p2 = text.charCodeAt(i + 1) - 65;

    const c1 =
      (matrix[0][0] * p1 +
        matrix[0][1] * p2) %
      26;

    const c2 =
      (matrix[1][0] * p1 +
        matrix[1][1] * p2) %
      26;

    result += String.fromCharCode(c1 + 65);
    result += String.fromCharCode(c2 + 65);
  }

  return result;
};

// Decrypt
const hillDecrypt = (text, key) => {
  const matrix = generateKeyMatrix(key);

  if (!isValidMatrix(matrix)) {
    return "INVALID_MATRIX";
  }

  const det =
    matrix[0][0] * matrix[1][1] -
    matrix[0][1] * matrix[1][0];

  const determinant = ((det % 26) + 26) % 26;

  const detInverse = modInverse(determinant, 26);

  const inverseMatrix = [
    [
      (matrix[1][1] * detInverse) % 26,
      ((-matrix[0][1] + 26) * detInverse) % 26,
    ],
    [
      ((-matrix[1][0] + 26) * detInverse) % 26,
      (matrix[0][0] * detInverse) % 26,
    ],
  ];

  text = text
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  let result = "";

  for (let i = 0; i < text.length; i += 2) {
    const c1 = text.charCodeAt(i) - 65;
    const c2 = text.charCodeAt(i + 1) - 65;

    const p1 =
      (inverseMatrix[0][0] * c1 +
        inverseMatrix[0][1] * c2) % 26;

    const p2 =
      (inverseMatrix[1][0] * c1 +
        inverseMatrix[1][1] * c2) % 26;

    result += String.fromCharCode(
      ((p1 + 26) % 26) + 65
    );

    result += String.fromCharCode(
      ((p2 + 26) % 26) + 65
    );
  }

  // Remove only the padding X added during encryption
  if (result.endsWith("X")) {
    result = result.slice(0, -1);
  }

  return result;
};

export default function HillCipherPage() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [key, setKey] = useState("HILL");
  const [mode, setMode] = useState("encrypt");
  const [output, setOutput] = useState("");

  // FILE STATES
  const [selectedFile, setSelectedFile] =
    useState(null);

  const [fileType, setFileType] =
    useState("text/plain");

  /* =========================
     FILE UPLOAD
  ========================= */

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const ext = file.name
      .split(".")
      .pop()
      .toLowerCase();

    let extractedText = "";

    // TXT
    if (ext === "txt") {
      extractedText = await file.text();
      setFileType("text/plain");
    }

    // PDF
    else if (ext === "pdf") {
      try {
        const arrayBuffer =
          await file.arrayBuffer();

        const pdf =
          await pdfjsLib.getDocument({
            data: arrayBuffer,
          }).promise;

        let textContent = "";

        for (
          let i = 1;
          i <= pdf.numPages;
          i++
        ) {
          const page = await pdf.getPage(i);

          const content =
            await page.getTextContent();

          const strings = content.items.map(
            (item) => item.str
          );

          textContent +=
            strings.join(" ") + "\n";
        }

        if (!textContent.trim()) {
          toast.error(
            "No readable text found in PDF."
          );

          return;
        }

        extractedText = textContent;

        setFileType("application/pdf");

        toast.success(
          "PDF text extracted successfully!"
        );
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to read PDF file."
        );

        return;
      }
    }

    // IMAGE OCR
    else if (
      ["jpg", "jpeg", "png"].includes(ext)
    ) {
      try {
        const reader = new FileReader();

        reader.onload = async () => {
          toast.info(
            "Extracting text from image..."
          );

          const {
            data: { text },
          } = await Tesseract.recognize(
            reader.result,
            "eng"
          );

          if (mode === "encrypt") {
            setPlainText(text);
          } else {
            setCipherText(text);
          }

          setFileType("image/png");

          toast.success(
            "Text extracted from image!"
          );
        };

        reader.readAsDataURL(file);
      } catch (err) {
        toast.error(
          "Failed to process image."
        );
      }

      return;
    }

    else {
      toast.error(
        "Only txt, pdf, jpg, jpeg, png allowed."
      );

      return;
    }

    if (mode === "encrypt") {
      setPlainText(extractedText);
    } else {
      setCipherText(extractedText);
    }
  };

  /* =========================
     CONVERT
  ========================= */

  const handleConvert = () => {
    if (!key.trim()) {
      toast.error("Please enter key.");
      return;
    }

    const matrix = generateKeyMatrix(key);

    if (!isValidMatrix(matrix)) {
      toast.error(
        "Invalid Hill Cipher key matrix."
      );

      return;
    }

    let result = "";

    if (mode === "encrypt") {
      if (!plainText.trim()) {
        toast.error(
          "Enter plain text or upload file."
        );

        return;
      }

      result = hillEncrypt(plainText, key);

      setCipherText(result);
    } else {
      if (!cipherText.trim()) {
        toast.error(
          "Enter cipher text or upload file."
        );

        return;
      }

      result = hillDecrypt(cipherText, key);

      setPlainText(result);
    }

    setOutput(result);

    toast.success(
      `${
        mode === "encrypt"
          ? "Encryption"
          : "Decryption"
      } successful!`
    );
  };

  /* =========================
     DOWNLOAD
  ========================= */

  const handleDownload = () => {
    if (!output) {
      toast.error("No output available.");
      return;
    }

    let extension = "txt";

    if (selectedFile) {
      extension =
        selectedFile.name
          .split(".")
          .pop()
          .toLowerCase() || "txt";
    }

    const blob = new Blob([output], {
      type: "text/plain",
    });

    const link =
      document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download =
      mode === "encrypt"
        ? `encrypted_output.${extension}`
        : `decrypted_output.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    toast.success("File downloaded!");
  };

  /* =========================
     SWAP
  ========================= */

  const handleSwap = () => {
    setMode(
      mode === "encrypt"
        ? "decrypt"
        : "encrypt"
    );

    setPlainText("");
    setCipherText("");
    setOutput("");
  };

  const matrix = generateKeyMatrix(key);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <HillTheory/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Hill Cipher Converter
        </h1>

        {/* FILE UPLOAD */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm">
            Upload File (txt, pdf, jpg/png)
          </label>

          <input
            type="file"
            accept=".txt,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 mt-2"
          />
        </div>

        {/* KEY */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm">
            Cipher Key (4 letters)
          </label>

          <input
            value={key}
            onChange={(e) =>
              setKey(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 mt-2"
            placeholder="Example: HILL"
          />
        </div>

        {/* TEXT AREAS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <textarea
            placeholder="Plain Text"
            value={plainText}
            maxLength={5000}
            onChange={(e) =>
              setPlainText(e.target.value)
            }
            rows={8}
            disabled={mode !== "encrypt"}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          />

          <textarea
            placeholder="Cipher Text"
            value={cipherText}
            maxLength={5000}
            onChange={(e) =>
              setCipherText(e.target.value)
            }
            rows={8}
            disabled={mode !== "decrypt"}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 justify-center">
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
            Download File
          </button>
        </div>

        {/* MATRIX DISPLAY */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Hill Cipher Matrix
          </h2>

          <div className="grid grid-cols-2 gap-2 justify-center max-w-[120px] mx-auto">
            {matrix.map((row, rIndex) =>
              row.map((num, cIndex) => (
                <div
                  key={`${rIndex}-${cIndex}`}
                  className="flex items-center justify-center bg-slate-800 border border-slate-600 rounded-md h-14 w-14 text-lg font-bold"
                >
                  {num}
                </div>
              ))
            )}
          </div>

          {!isValidMatrix(matrix) && (
            <p className="text-red-400 text-center mt-4">
              Invalid key matrix.
              Determinant has no modular inverse mod 26.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}