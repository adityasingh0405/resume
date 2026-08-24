import React from 'react';

// ─── Authentic Retro-Realistic High-Fidelity SVG Icons ─────────────────────
// Custom-designed vector graphics using rich gradients, 3D shadows, and micro-details
// to give a realistic premium vintage look to NEON_OS desktop apps.

interface PixelIconProps {
  size?: number;
  primaryColor?: string;
  dimColor?: string;
  highlightColor?: string;
}

// ─── ABOUT.EXE — Glowing green retro CRT Terminal monitor ──────────────────
export const IconTerminal: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="termGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#022c22" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Stand pedestal */}
    <path d="M16 38h16l2 4H14l2-4z" fill="#374151" stroke="#1f2937" strokeWidth="1.5" />
    <rect x="20" y="32" width="8" height="6" fill="#4b5563" stroke="#1f2937" strokeWidth="1.5" />
    {/* Outer Cabinet */}
    <rect x="6" y="6" width="36" height="28" rx="4" fill="url(#termGrad)" stroke="#111827" strokeWidth="2" />
    <rect x="7" y="7" width="34" height="26" rx="3" fill="none" stroke="#9ca3af" strokeWidth="1" strokeOpacity="0.15" />
    {/* CRT Bezel Inner Screen Frame */}
    <rect x="9" y="9" width="30" height="22" rx="2" fill="#111827" stroke="#1f2937" strokeWidth="1" />
    {/* Phosphor Glowing Screen */}
    <rect x="11" y="11" width="26" height="18" rx="1" fill="url(#screenGrad)" />
    <rect x="11" y="11" width="26" height="18" rx="1" fill="none" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
    {/* Scanlines overlay */}
    <path d="M11 13h26M11 16h26M11 19h26M11 22h26M11 25h26M11 28h26" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
    {/* Prompt code lines */}
    <path d="M14 16l3 2-3 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
    <rect x="19" y="17" width="5" height="2.5" fill="#10b981" filter="url(#glow)" />
    {/* LED Indicator */}
    <circle cx="36" cy="30" r="1.2" fill="#10b981" />
  </svg>
);

// ─── ABOUT.EXE — 3D ID Badge Card ─────────────────────────────────────────
export const IconAboutCard: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="cardBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="photoGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* Badge Card body */}
    <rect x="4" y="8" width="40" height="32" rx="3" fill="url(#cardBg)" stroke="#475569" strokeWidth="2" />
    <rect x="5" y="9" width="38" height="30" rx="2" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
    {/* Clip slot at top */}
    <rect x="19" y="11" width="10" height="2" rx="1" fill="#475569" />
    {/* Profile Photo frame */}
    <rect x="8" y="16" width="12" height="16" rx="1.5" fill="url(#photoGrad)" stroke="#065f46" strokeWidth="1.5" />
    <circle cx="14" cy="21" r="3" fill="#a7f3d0" />
    <path d="M9 29.5c0-2.5 2-3.5 5-3.5s5 1 5 3.5H9z" fill="#a7f3d0" />
    {/* Fake text details */}
    <rect x="24" y="17" width="16" height="2.5" rx="1" fill="#64748b" />
    <rect x="24" y="22" width="12" height="2" rx="1" fill="#94a3b8" />
    <rect x="24" y="26" width="14" height="2" rx="1" fill="#94a3b8" />
    {/* Smart chip gold patch */}
    <rect x="8" y="34" width="6" height="4" rx="0.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
    {/* Barcode representation */}
    <path d="M23 32h2v5h-2zm3 0h1v5h-1zm2 0h2v5h-2zm3 0h1v5h-1zm2 0h3v5h-3z" fill="#1e293b" />
  </svg>
);

// ─── PROJECTS/ — Detailed 3D Folder with Documents ─────────────────────────
export const IconFolder: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <linearGradient id="paperGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>
    </defs>
    {/* Folder Back body + tab */}
    <path d="M4 10h13.5l4 4H44v25H4V10z" fill="url(#folderBack)" stroke="#854d0e" strokeWidth="2" strokeLinejoin="round" />
    {/* Document sheet 1 */}
    <rect x="9" y="11" width="30" height="21" rx="1" fill="url(#paperGrad)" stroke="#cbd5e1" strokeWidth="1" transform="rotate(-3 24 21.5)" />
    <path d="M13 15h14M13 18h10M13 21h12" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-3 24 21.5)" />
    {/* Document sheet 2 */}
    <rect x="10" y="10" width="30" height="21" rx="1" fill="url(#paperGrad)" stroke="#cbd5e1" strokeWidth="1" transform="rotate(2 25 20.5)" />
    <path d="M14 14h16M14 17h12M14 20h14" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" transform="rotate(2 25 20.5)" />
    {/* Folder Front Flap (curved forward) */}
    <path d="M4 17h40l-4 22H8L4 17z" fill="url(#folderFront)" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// ─── SKILLS.DLL — Hardware Microprocessor CPU Chip ─────────────────────────
export const IconChip: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="siliconGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    {/* Gold metal connection pins */}
    {/* Top Pins */}
    <path d="M12 4v4M16 4v4M20 4v4M24 4v4M28 4v4M32 4v4M36 4v4" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bottom Pins */}
    <path d="M12 40v4M16 40v4M20 40v4M24 40v4M28 40v4M32 40v4M36 40v4" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Left Pins */}
    <path d="M4 12h4M4 16h4M4 20h4M4 24h4M4 28h4M4 32h4M4 36h4" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right Pins */}
    <path d="M40 12h4M40 16h4M40 20h4M40 24h4M40 28h4M40 32h4M40 36h4" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Silicon Body */}
    <rect x="8" y="8" width="32" height="32" rx="4" fill="url(#siliconGrad)" stroke="#020617" strokeWidth="2" />
    <rect x="10" y="10" width="28" height="28" rx="2" fill="none" stroke="#475569" strokeWidth="1" strokeOpacity="0.3" />
    {/* Aluminum Heat Spreader Die */}
    <rect x="14" y="14" width="20" height="20" rx="2.5" fill="url(#metalGrad)" stroke="#1e293b" strokeWidth="1.5" />
    <rect x="16" y="16" width="16" height="16" rx="1.5" fill="none" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />
    {/* Corner marker dot */}
    <circle cx="11.5" cy="11.5" r="1" fill="#f59e0b" />
  </svg>
);

// ─── XPRIENCE.LOG — Weathered Manuscript Scroll ───────────────────────────
export const IconScroll: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="scrollGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="rollGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#713f12" />
      </linearGradient>
    </defs>
    {/* Scroll paper backing */}
    <rect x="10" y="8" width="28" height="32" rx="1" fill="url(#scrollGrad)" stroke="#854d0e" strokeWidth="1.5" />
    {/* Top rolled edge scroll bar */}
    <rect x="6" y="5" width="36" height="5.5" rx="2.5" fill="url(#rollGrad)" stroke="#451a03" strokeWidth="1.5" />
    {/* Bottom rolled edge scroll bar */}
    <rect x="6" y="38" width="36" height="5.5" rx="2.5" fill="url(#rollGrad)" stroke="#451a03" strokeWidth="1.5" />
    {/* Leather string / Ribbon tie */}
    <rect x="22" y="21" width="4" height="6.5" fill="#e11d48" rx="0.5" />
    <path d="M22 27.5l-2.5 3h9l-2.5-3" fill="#e11d48" stroke="#9f1239" strokeWidth="0.5" />
    {/* Calligraphy ink text lines */}
    <path d="M14 14h20M14 18h14M14 26h20M14 30h16M14 34h8" stroke="#451a03" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.75" />
    {/* Bullets/Indicators */}
    <circle cx="14" cy="14" r="1" fill="#ea580c" />
    <circle cx="14" cy="26" r="1" fill="#ea580c" />
  </svg>
);

// ─── SNAKE.EXE — Retro Arcade Gamepad Controller ───────────────────────────
export const IconSnake: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="ctrlGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
    </defs>
    {/* Gamepad shape */}
    <rect x="4" y="14" width="40" height="22" rx="11" fill="url(#ctrlGrad)" stroke="#111827" strokeWidth="2.5" />
    <rect x="5" y="15" width="38" height="20" rx="10" fill="none" stroke="#9ca3af" strokeWidth="1" strokeOpacity="0.2" />
    {/* Left Directional D-Pad */}
    <path d="M12 20h4v10h-4zM9 23h10v4H9z" fill="#111827" stroke="#374151" strokeWidth="1" strokeLinejoin="round" />
    {/* Right Action buttons (red and yellow) */}
    <circle cx="34" cy="22" r="3" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
    <circle cx="39" cy="27" r="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
    {/* Center start/select buttons */}
    <rect x="20" y="24" width="3.5" height="1.5" rx="0.5" fill="#111827" transform="rotate(-15 20 24)" />
    <rect x="25" y="24" width="3.5" height="1.5" rx="0.5" fill="#111827" transform="rotate(-15 25 24)" />
    {/* Wire connection */}
    <path d="M24 14v-6c0-1.5-3-1.5-3-3.5" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── SYNTH.EXE — Professional Music Synthesizer Keyboard ──────────────────
export const IconSynth: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="synthGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
    </defs>
    {/* Synth main deck */}
    <rect x="4" y="12" width="40" height="26" rx="2" fill="url(#synthGrad)" stroke="#030712" strokeWidth="2" />
    {/* Knob controls panel */}
    <rect x="7" y="15" width="34" height="8" rx="1" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
    {/* Indicator LEDs & controls */}
    <circle cx="10" cy="19" r="1.2" fill="#ef4444" />
    <circle cx="14" cy="19" r="1.2" fill="#eab308" />
    <circle cx="18" cy="19" r="1.2" fill="#10b981" />
    {/* Pitch bend & Mod wheels */}
    <rect x="7" y="27" width="2" height="7" fill="#111827" rx="0.5" />
    <rect x="10" y="27" width="2" height="7" fill="#111827" rx="0.5" />
    {/* LCD Parameter Screen */}
    <rect x="24" y="16.5" width="10" height="5" rx="0.5" fill="#064e3b" stroke="#047857" strokeWidth="0.5" />
    <path d="M26 19h6" stroke="#10b981" strokeWidth="0.8" />
    {/* White keyboard keys */}
    <path d="M14 26h3v10h-3zm3.5 0h3v10h-3zm3.5 0h3v10h-3zm3.5 0h3v10h-3zm3.5 0h3v10h-3zm3.5 0h3v10h-3zm3.5 0h3v10h-3zm3.5 0h3v10h-3z" fill="#ffffff" stroke="#1e293b" strokeWidth="0.8" />
    {/* Black keys */}
    <rect x="16" y="26" width="1.5" height="6.5" fill="#000000" />
    <rect x="19.5" y="26" width="1.5" height="6.5" fill="#000000" />
    <rect x="26.5" y="26" width="1.5" height="6.5" fill="#000000" />
    <rect x="30" y="26" width="1.5" height="6.5" fill="#000000" />
    <rect x="33.5" y="26" width="1.5" height="6.5" fill="#000000" />
  </svg>
);

// ─── DISPLAY.CFG — Graphic Monitor Tuning ─────────────────────────────────
export const IconDisplay: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="dispCabinet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
    </defs>
    {/* Monitor Stand */}
    <path d="M18 38h12l1 3H17l1-3z" fill="#374151" stroke="#1f2937" strokeWidth="1" />
    <rect x="22" y="32" width="4" height="6" fill="#4b5563" stroke="#1f2937" />
    {/* CRT outer shell casing */}
    <rect x="8" y="10" width="32" height="24" rx="3.5" fill="url(#dispCabinet)" stroke="#111827" strokeWidth="2" />
    <rect x="10" y="12" width="28" height="18" rx="1.5" fill="#111827" stroke="#1f2937" strokeWidth="1" />
    {/* SMPTE color bars display configuration test pattern */}
    <rect x="11" y="13" width="6.5" height="16" fill="#ef4444" />
    <rect x="17.5" y="13" width="6.5" height="16" fill="#10b981" />
    <rect x="24" y="13" width="6.5" height="16" fill="#f59e0b" />
    <rect x="30.5" y="13" width="6.5" height="16" fill="#3b82f6" />
    {/* Adjust knobs */}
    <circle cx="13" cy="32" r="0.8" fill="#9ca3af" />
    <circle cx="16" cy="32" r="0.8" fill="#9ca3af" />
    <circle cx="19" cy="32" r="0.8" fill="#9ca3af" />
  </svg>
);

// ─── NOTES.TXT — Sticky Note with Pushpin ──────────────────────────────────
export const IconNotes: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="noteGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <filter id="noteShadow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Angled Sticky note */}
    <g filter="url(#noteShadow)" transform="rotate(-3 24 24)">
      {/* Paper page */}
      <path d="M8 8h32v24l-8 8H8V8z" fill="url(#noteGrad)" stroke="#ca8a04" strokeWidth="1.5" />
      {/* Bent corner fold */}
      <path d="M32 32h8l-8 8v-8z" fill="#ca8a04" stroke="#a16207" strokeWidth="1" />
      {/* Simulated content text lines */}
      <path d="M12 14h24M12 19h20M12 24h22M12 29h16" stroke="#854d0e" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.55" />
    </g>
    {/* Red realistic pushpin pinning it down */}
    <g transform="translate(20, 2)">
      <line x1="6" y1="10" x2="1" y2="16" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 5l5 5-2 2-5-5z" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <path d="M5 2c3.5 3.5 0 7-1 8L1 7c1-1 4.5-4.5 4-5z" fill="#f87171" />
      <circle cx="5" cy="5" r="1.5" fill="#ffffff" fillOpacity="0.8" />
    </g>
  </svg>
);

// ─── CONTACT.BAT — Realistic Paper Mail Envelope ───────────────────────────
export const IconMail: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="envGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
    </defs>
    {/* Back letter paper poking out */}
    <rect x="9" y="8" width="30" height="20" rx="1.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
    <path d="M13 13h22M13 17h16M13 21h20" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
    {/* Envelope Main Pocket */}
    <path d="M4 20h40v20H4V20z" fill="url(#envGrad)" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Outer envelope fold lines */}
    <path d="M4 20l20 12 20-12" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M4 40l15-13M44 40L29 27" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    {/* Realistic postage stamp */}
    <rect x="33" y="24" width="7" height="9" fill="#f43f5e" rx="0.5" stroke="#be123c" strokeWidth="0.5" />
    <circle cx="36.5" cy="28.5" r="1.5" fill="#ffffff" fillOpacity="0.8" />
  </svg>
);

// ─── HEX DUMP viewer icon ──────────────────────────────────────────────────
export const IconHex: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="hexGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    {/* Binder card index block */}
    <rect x="4" y="6" width="40" height="36" rx="3" fill="url(#hexGrad)" stroke="#475569" strokeWidth="2" />
    {/* Columns of detailed hexadecimal mock dump bytes */}
    <path d="M8 12h8M20 12h8M32 12h8M8 18h8M20 18h8M32 18h8M8 24h8M20 24h8M32 24h8M8 30h8M20 30h8M32 30h8M8 36h8M20 36h8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
    <path d="M12 12h2M24 12h2M36 12h2M12 18h2M24 18h2M36 18h2M12 24h2M24 24h2M36 24h2" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ─── GITHUB.URL — High-Fidelity Metallic GitHub Octocat ───────────────────
export const IconGithub: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>
    {/* Metallic shield backdrop */}
    <circle cx="24" cy="24" r="21" fill="url(#shieldGrad)" stroke="#334155" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="18" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />
    {/* High-fidelity Octocat silhouette */}
    <path d="M24 8c-8.8 0-16 7.2-16 16 0 7 4.6 13 11 15.2.8.1 1.1-.3 1.1-.8v-3c-4.5 1-5.4-2.2-5.4-2.2-.7-1.8-1.8-2.3-1.8-2.3-1.5-1 .1-1 .1-1 1.6.1 2.5 1.7 2.5 1.7 1.5 2.5 3.8 1.8 4.7 1.4.1-1 .6-1.8 1-2.2-3.6-.4-7.4-1.8-7.4-8 0-1.8.6-3.2 1.7-4.3-.2-.4-.7-2.1.2-4.2 0 0 1.4-.4 4.5 1.7a15.6 15.6 0 0 1 8 0c3.1-2.1 4.5-1.7 4.5-1.7.9 2.1.4 3.8.2 4.2 1.1 1.1 1.7 2.5 1.7 4.3 0 6.2-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3v4.5c0 .5.3.9 1.1.8 6.4-2.2 11-8.2 11-15.2 0-8.8-7.2-16-16-16z" fill="url(#logoGrad)" />
  </svg>
);

// ─── LEETCODE.EXE — Orange glowing bracket with checkmark ───────────────
export const IconLeetcode: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="lcGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    {/* Bracket housing box */}
    <rect x="6" y="6" width="36" height="36" rx="9" fill="#1c1917" stroke="url(#lcGrad)" strokeWidth="3" />
    {/* Glow bracket symbols */}
    <path d="M18 16l-8 8 8 8M30 16l8 8-8 8" stroke="url(#lcGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Solved green checkmark badge overlay */}
    <path d="M20 25l3 3 7-7" stroke="#22c55e" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 25l3 3 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── RESEARCH.PDF — Official technical paper log ──────────────────────────
export const IconResearch: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="pdfGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
    </defs>
    {/* Document sheet */}
    <path d="M6 4h26l10 10v30H6V4z" fill="url(#pdfGrad)" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
    {/* Folded paper corner page tab */}
    <path d="M32 4v10h10" fill="#cbd5e1" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
    {/* Red PDF banner header */}
    <rect x="6" y="10" width="26" height="6.5" fill="#ef4444" />
    <rect x="9" y="12" width="10" height="2" rx="0.5" fill="#ffffff" />
    {/* Paper lines representing technical write-up study */}
    <path d="M10 20h28M10 24h28M10 28h18M10 32h14" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    {/* Green certified circular medal seal */}
    <circle cx="34" cy="32" r="5" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
    <path d="M32 32l1.5 1.5 3-3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── HACKATHON.EXE — Detailed 3D Golden Trophy Cup ────────────────────────
export const IconHackathon: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="goldTrophy" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>
    {/* Trophy handles */}
    <path d="M12 12c-4 0-6 4-6 9s4 8 6 8M36 12c4 0 6 4 6 9s-4 8-6 8" stroke="url(#goldTrophy)" strokeWidth="3" strokeLinecap="round" />
    {/* Golden Trophy Cup cup container body */}
    <path d="M12 10h24v12c0 6-5 11-12 11S12 28 12 22V10z" fill="url(#goldTrophy)" stroke="#854d0e" strokeWidth="2" />
    {/* Trophy stem */}
    <rect x="22" y="33" width="4" height="5" fill="url(#goldTrophy)" stroke="#854d0e" strokeWidth="1.5" />
    {/* Sturdy dark stone pedestal base */}
    <rect x="14" y="38" width="20" height="4.5" rx="1" fill="#374151" stroke="#1f2937" strokeWidth="1.5" />
    {/* Sparkle star marker */}
    <path d="M24 13l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#ffffff" opacity="0.95" />
  </svg>
);

// ─── Sub-Project Folder Icons ──────────────────────────────────────────────
export const IconProjectBiome: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="folderBackB" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="folderFrontB" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path d="M4 10h13.5l4 4H44v25H4V10z" fill="url(#folderBackB)" stroke="#065f46" strokeWidth="2" strokeLinejoin="round" />
    {/* Inner AI network graphic nodes */}
    <circle cx="24" cy="22" r="3.5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
    <circle cx="16" cy="28" r="2.5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
    <circle cx="32" cy="28" r="2.5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
    <path d="M18.5 26.5l3.5-3M29.5 26.5l-3.5-3" stroke="#a7f3d0" strokeWidth="1.2" />
    <path d="M4 17h40l-4 22H8L4 17z" fill="url(#folderFrontB)" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconProjectAxiom: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="folderBackA" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="folderFrontA" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M4 10h13.5l4 4H44v25H4V10z" fill="url(#folderBackA)" stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round" />
    {/* Sound waves representation */}
    <path d="M16 25c2-3 6-3 8 0m-12 3c3.5-5 10.5-5 14 0" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 17h40l-4 22H8L4 17z" fill="url(#folderFrontA)" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconProjectStream: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="folderBackS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="folderFrontS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <path d="M4 10h13.5l4 4H44v25H4V10z" fill="url(#folderBackS)" stroke="#4c1d95" strokeWidth="2" strokeLinejoin="round" />
    {/* Ether diamond */}
    <path d="M24 16l5 6-5 6-5-6z" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
    <path d="M4 17h40l-4 22H8L4 17z" fill="url(#folderFrontS)" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconProjectWeb: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="folderBackW" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="folderFrontW" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <path d="M4 10h13.5l4 4H44v25H4V10z" fill="url(#folderBackW)" stroke="#9f1239" strokeWidth="2" strokeLinejoin="round" />
    {/* Browser layout indicator */}
    <rect x="15" y="19" width="18" height="12" rx="1" fill="#fce7f3" stroke="#be123c" strokeWidth="1" />
    <path d="M15 23h18M18 21.5h1" stroke="#be123c" strokeWidth="1" />
    <path d="M4 17h40l-4 22H8L4 17z" fill="url(#folderFrontW)" stroke="#ec4899" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconSpotify: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ display: 'block' }}
  >
    <circle cx="12" cy="12" r="10" fill="#1DB954" />
    <path
      d="M17.25 15.1c-.2.3-.5.4-.8.2-2.2-1.3-5-1.6-8.3-.9-.35.1-.7-.1-.8-.45-.1-.35.1-.7.45-.8 3.6-.8 6.7-.5 9.2 1 .3.2.4.6.25.95zm1.1-2.5c-.25.4-.75.5-1.15.25-2.5-1.55-6.3-2-9.25-1.1-.45.15-.9-.1-.95-.55-.1-.45.15-.9.55-.95 3.4-1.05 7.6-.55 10.5 1.25.4.2.5.75.25 1.15zm.1-2.65c-3-1.8-8-1.95-10.85-1.1-.55.15-1.1-.15-1.25-.65-.15-.55.15-1.1.65-1.25 3.3-1 8.85-.8 12.35 1.3.5.3.65.95.35 1.45-.3.45-.95.65-1.25.25z"
      fill="#000000"
    />
  </svg>
);

// ─── MINESWEEPER Icon ──────────────────────────────────────────────────────
export const IconMinesweeper: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <rect x="6" y="6" width="36" height="36" rx="6" fill="#1e293b" stroke="#f87171" strokeWidth="2" />
    <rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="#7f1d1d" strokeWidth="1" strokeOpacity="0.4" />
    {/* Mine body */}
    <circle cx="24" cy="24" r="8" fill="#1c1917" stroke="#f87171" strokeWidth="2" />
    <circle cx="24" cy="24" r="5" fill="#292524" />
    {/* Spikes */}
    <path d="M24 10v5M24 33v5M10 24h5M33 24h5M14.5 14.5l3.5 3.5M30 30l3.5 3.5M33.5 14.5l-3.5 3.5M18 30l-3.5 3.5" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
    {/* Shine dot */}
    <circle cx="21" cy="21" r="1.5" fill="#fca5a5" opacity="0.7" />
  </svg>
);

// ─── CERTIFICATES Icon — Diploma scroll with gold seal ──────────────────────
export const IconCertificate: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="certPaperGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
      <linearGradient id="certSealGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="certRibbonGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
    </defs>
    {/* Scroll rollers top & bottom */}
    <rect x="3" y="5" width="42" height="6" rx="3" fill="#92400e" stroke="#78350f" strokeWidth="1" />
    <rect x="3" y="37" width="42" height="6" rx="3" fill="#92400e" stroke="#78350f" strokeWidth="1" />
    {/* Paper body */}
    <rect x="6" y="8" width="36" height="32" fill="url(#certPaperGrad)" stroke="#d97706" strokeWidth="1" />
    <rect x="6" y="8" width="36" height="32" fill="none" stroke="#fef3c7" strokeWidth="0.8" strokeOpacity="0.5" />
    {/* Text lines */}
    <rect x="12" y="13" width="24" height="2.5" rx="1" fill="#b45309" opacity="0.5" />
    <rect x="14" y="18" width="20" height="1.8" rx="0.8" fill="#78350f" opacity="0.35" />
    <rect x="14" y="22" width="20" height="1.8" rx="0.8" fill="#78350f" opacity="0.35" />
    {/* Gold seal */}
    <circle cx="24" cy="33" r="6" fill="url(#certSealGrad)" stroke="#92400e" strokeWidth="1.5" />
    <circle cx="24" cy="33" r="4" fill="none" stroke="#fef3c7" strokeWidth="0.8" strokeOpacity="0.8" />
    <text x="24" y="36" fontSize="4" fill="#7c2d12" textAnchor="middle" fontWeight="bold">★</text>
    {/* Ribbon tails */}
    <path d="M21 39 L18 44 M27 39 L30 44" stroke="url(#certRibbonGrad)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Roller end caps */}
    <circle cx="3" cy="8" r="3" fill="#78350f" stroke="#57230b" strokeWidth="1" />
    <circle cx="45" cy="8" r="3" fill="#78350f" stroke="#57230b" strokeWidth="1" />
    <circle cx="3" cy="40" r="3" fill="#78350f" stroke="#57230b" strokeWidth="1" />
    <circle cx="45" cy="40" r="3" fill="#78350f" stroke="#57230b" strokeWidth="1" />
  </svg>
);

// ─── RESUME Icon — Document with folded corner ──────────────────────────────
export const IconResume: React.FC<PixelIconProps> = ({ size = 32 }) => (
  <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
    <defs>
      <linearGradient id="resumeDocGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <linearGradient id="resumeFoldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <linearGradient id="resumeAccentGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
    </defs>
    {/* Document body */}
    <path d="M8 4 L34 4 L44 14 L44 46 L8 46 Z" fill="url(#resumeDocGrad)" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Corner fold */}
    <path d="M34 4 L34 14 L44 14 Z" fill="url(#resumeFoldGrad)" stroke="#94a3b8" strokeWidth="1" />
    {/* Green accent bar */}
    <rect x="8" y="18" width="36" height="3" fill="url(#resumeAccentGrad)" opacity="0.8" />
    {/* Photo placeholder */}
    <rect x="11" y="24" width="10" height="12" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
    <circle cx="16" cy="28" r="2.5" fill="#94a3b8" />
    <path d="M11.5 35c0-2 2-3 4.5-3s4.5 1 4.5 3H11.5z" fill="#94a3b8" />
    {/* Text lines */}
    <rect x="24" y="25" width="17" height="2" rx="1" fill="#64748b" opacity="0.7" />
    <rect x="24" y="29" width="13" height="1.5" rx="0.7" fill="#94a3b8" opacity="0.6" />
    <rect x="24" y="32" width="15" height="1.5" rx="0.7" fill="#94a3b8" opacity="0.6" />
    {/* Separator */}
    <line x1="11" y1="39" x2="37" y2="39" stroke="#94a3b8" strokeWidth="0.8" strokeOpacity="0.5" />
    <rect x="11" y="41" width="26" height="1.5" rx="0.7" fill="#cbd5e1" opacity="0.5" />
  </svg>
);
