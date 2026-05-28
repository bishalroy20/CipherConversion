import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-xl font-bold text-cyan-400">
            CipherTool
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="hover:text-cyan-400 transition">Home</a>

            {/* Convert Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="hover:text-cyan-400 transition flex items-center gap-1"
              >
                Convert ▼
              </button>

              {dropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg z-50">
                  <a href="/caesar" className="block px-4 py-2 hover:bg-slate-700 transition">
                    Caesar Cipher
                  </a>
                  <a href="/playfair" className="block px-4 py-2 hover:bg-slate-700 transition">
                    Playfair Cipher
                  </a>
                  <a href="/vigenere" className="block px-4 py-2 hover:bg-slate-700 transition">
                    Vigenère Cipher
                  </a>
                  <a href="/hill" className="block px-4 py-2 hover:bg-slate-700 transition">
                    Hill Cipher
                  </a>
                  
                </div>
              )}
            </div>

            <a href="/about" className="hover:text-cyan-400 transition">About</a>
            {/* <a href="/contact" className="hover:text-cyan-400 transition">Contact</a> */}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 px-4 pb-4 space-y-3">
          <a href="/" className="block hover:text-cyan-400">Home</a>

          {/* Mobile Dropdown */}
          <div>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center justify-between w-full hover:text-cyan-400 transition"
            >
              Convert    ▼
            </button>
            {dropdown && (
              <div className="pl-4 mt-2  space-y-1">
                <a href="/caesar" className="block pt-2 hover:text-cyan-400">Caesar Cipher</a>
                <a href="/playfair" className="block pt-2 hover:text-cyan-400">Playfair Cipher</a>
                <a href="vigenere" className="block pt-2 hover:text-cyan-400">Vigenère Cipher</a>
                
              </div>
            )}
          </div>

          <a href="/about" className="block hover:text-cyan-400">About</a>
          <a href="/contact" className="block hover:text-cyan-400">Contact</a>
        </div>
      )}
    </nav>
  );
}