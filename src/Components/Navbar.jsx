import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 text-white bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 border-b border-slate-800 shadow-lg backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="text-2xl font-extrabold tracking-wide text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
              CipherTool
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">

              {/* Home */}
              <a
                href="/"
                className="relative text-white hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all"
              >
                Home
              </a>

              {/* Convert Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-1 text-white hover:text-cyan-400 transition"
                >
                  Convert
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      dropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdown && (
                  <div className="absolute top-12 left-0 w-56 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur-lg shadow-2xl overflow-hidden">

                    <a
                      href="/caesar"
                      className="block px-4 py-3 text-white hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                    >
                      Caesar Cipher
                    </a>

                    <a
                      href="/playfair"
                      className="block px-4 py-3 text-white hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                    >
                      Playfair Cipher
                    </a>

                    <a
                      href="/vigenere"
                      className="block px-4 py-3 text-white hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                    >
                      Vigenère Cipher
                    </a>

                    <a
                      href="/hill"
                      className="block px-4 py-3 text-white hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                    >
                      Hill Cipher
                    </a>
                  </div>
                )}
              </div>

              {/* About */}
              <a
                href="/about"
                className="relative text-white hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all"
              >
                About
              </a>

              {/* Contact */}
              <a
                href="/contact"
                className="relative text-white hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all"
              >
                Contact
              </a>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setOpen(true)}
            >
              <Menu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 text-white bg-slate-950 border-r border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-800">

          <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
            CipherTool
          </h1>

          <button onClick={() => setOpen(false)}>
            <X size={30} className="text-white" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-5 space-y-5">

          {/* Home */}
          <a
            href="/"
            className="text-white hover:text-cyan-400 transition text-lg"
          >
            Home
          </a>

          {/* Mobile Dropdown */}
          <div>

            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center justify-between w-full text-lg text-white hover:text-cyan-400 transition"
            >
              Convert

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  dropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdown && (
              <div className="mt-3 ml-3 flex flex-col space-y-3 border-l border-slate-700 pl-4">

                <a
                  href="/caesar"
                  className="text-white hover:text-cyan-400 transition"
                >
                  Caesar Cipher
                </a>

                <a
                  href="/playfair"
                  className="text-white hover:text-cyan-400 transition"
                >
                  Playfair Cipher
                </a>

                <a
                  href="/vigenere"
                  className="text-white hover:text-cyan-400 transition"
                >
                  Vigenère Cipher
                </a>

                <a
                  href="/hill"
                  className="text-white hover:text-cyan-400 transition"
                >
                  Hill Cipher
                </a>
              </div>
            )}
          </div>

          {/* About */}
          <a
            href="/about"
            className="text-white hover:text-cyan-400 transition text-lg"
          >
            About
          </a>

          {/* Contact */}
          <a
            href="/contact"
            className="text-white hover:text-cyan-400 transition text-lg"
          >
            Contact
          </a>

          
        </div>
      </div>
    </>
  );
}