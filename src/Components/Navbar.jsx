import React from 'react';
import '../App.css';

export default function Navbar({ setPage }) {
  return (
    <nav
      style={{
        boxShadow: `2px 6px 3px #000000,
                    3px 6px 2px #2b5b3c,
                    0 0 100px rgb(47, 94, 78)`,
      }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-[#111111] border-green-400 rounded-lg shadow-lg z-50 px-8 py-4 flex gap-4 items-center border-2 backdrop-blur-md"
    >
      <button
        onClick={() => setPage('hero')}
        className="text-white text-xl font-medium pixelify-sans-800 hover:text-green-400 transition-all"
      >
        Home
      </button>
      <button
        onClick={() => setPage('about')}
        className="text-white text-xl font-medium pixelify-sans-800 hover:text-green-400 transition-all"
      >
        About
      </button>
      <button
        onClick={() => setPage('projects')}
        className="text-white text-xl -mr-0.5 font-medium pixelify-sans-800 hover:text-green-400 transition-all"
      >
        Projects
      </button>
    </nav>
  );
}
