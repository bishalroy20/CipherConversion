


# 🔐 Cipher Conversion Website

A modern React-based web application for learning and experimenting with classical cryptography algorithms.  
Supports **Caesar**, **Vigenère**, **Playfair**, and **Hill** ciphers with file upload, instant conversion, and educational theory sections.

---

## 🌐 Live Demo

👉 [View Live Website](http://cipher-conversion20.netlify.app/)

---

## 🚀 Features

- **Multiple Ciphers**:  
  - Caesar — simple shift substitution.  
  - Vigenère — keyword-based polyalphabetic substitution.  
  - Playfair — digraph encryption using a 5×5 matrix.  
  - Hill — matrix-based polygraphic substitution.

- **File Upload Support**:  
  - Upload `.txt`, `.pdf`, or `.jpg/.png` files.  
  - PDF parsing via `pdfjs-dist`.  
  - OCR for images via `tesseract.js`.

- **Instant Conversion**: Encrypt or decrypt text with real-time feedback.

- **Download Results**: Save output as `.txt`.

- **Educational Theory Sections**: Each cipher page includes:  
  - Algorithm explanation.  
  - Step-by-step rules.  
  - Equations.  
  - Example conversions.

- **Modern UI**:  
  - Dark theme with gradient accents.  
  - Responsive design using Tailwind CSS.  
  - Toast notifications for feedback.

---

## 📂 Project Structure

```
cipher-conversion/
 ├── src/
 │    ├── components/         
 │    │    ├── Navbar.jsx
 │    │    ├── Footer.jsx
 │    │    ├── Hero.jsx
 │    │    ├── About.jsx
 │    │    ├── Contact.jsx
 │    │    ├── CipherBlocks.jsx   
 │    │    ├── CipherFAQ.jsx
 │    │    └── RootLayout.jsx
 │    │
 │    ├── convert/           
 │    │    ├── CaesarPage.jsx
 │    │    ├── VigenerePage.jsx
 │    │    ├── PlayfairPage.jsx
 │    │    └── HillCipherPage.jsx
 │    │
 │    ├── theory/            
 │    │    ├── CaesarTheory.jsx
 │    │    ├── VigenereTheory.jsx
 │    │    ├── PlayfairTheory.jsx
 │    │    └── HillTheory.jsx
 │    │
 │    ├── App.jsx             
 │    ├── App.css             
 │    └── index.css          
 │
 ├── public/                 
 │    └── favicon.ico
 │
 ├── package.json
 └── README.md
```

---


```markdown
---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bishalroy20/cipher-conversion.git
   cd cipher-conversion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

---

## 🧑‍💻 Usage

1. Navigate to the homepage.  
2. Select a cipher (Caesar, Vigenère, Playfair, Hill).  
3. Enter text manually or upload a file.  
4. Choose **Encrypt** or **Decrypt** mode.  
5. Click **Convert** to see results instantly.  
6. Download output as `.txt`.  
7. Read the **Theory + Example** section to understand the algorithm.

---

## 📖 Example Equations

- **Caesar**:  
  ( C = (P + k) mod 26 )  
  ( P = (C - k) mod 26 )

- **Vigenère**:  
  ( C_i = (P_i + K_i) mod 26 )  
  ( P_i = (C_i - K_i) mod 26 )

- **Playfair**:  
  Digraph substitution rules (row, column, rectangle).

- **Hill**:  
  ( C = K cdot P mod 26 )  
  ( P = K^{-1} cdot C mod 26 )

---

## 🌟 Future Enhancements

- Add more classical ciphers (Affine, Rail Fence).  
- Export results as PDF.  
- User accounts to save cipher history.  
- Interactive matrix/key visualizations.

---

## 📜 License

License — free to use, modify, and distribute.

---

## 👨‍💻 Author

Developed by Bishal — built with React, Tailwind and a passion for cryptography.
```

---
