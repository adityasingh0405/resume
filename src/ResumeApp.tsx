import React, { useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   RESUME APP
   Displays Aditya_Resume.pdf inside the window.
   Location: public/Aditya_Resume.pdf
   Supports: view inside window, open in new tab, download PDF.
───────────────────────────────────────────────────────────────────────────── */

const RESUME_SRC = '/Aditya_Resume.pdf';
const RESUME_FILENAME = 'Aditya_Resume.pdf';

const ResumeApp: React.FC = () => {
  const [pdfError, setPdfError] = useState(false);

  const openInNewTab = () => {
    window.open(RESUME_SRC, '_blank', 'noopener,noreferrer');
  };

  const download = () => {
    const link = document.createElement('a');
    link.href = RESUME_SRC;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--neos-bg)',
        fontFamily: 'var(--font-mono)',
        overflow: 'hidden',
      }}
    >
      {/* ── Top Address Bar ────────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0a1e0c 0%, #061008 100%)',
          borderBottom: '1px solid var(--bevel-dark)',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '9px', color: 'var(--phosphor-dim)', letterSpacing: '2px' }}>
            RÉSUMÉ VIEWER
          </span>
          <span style={{ fontSize: '8px', color: 'var(--phosphor-dark)', borderLeft: '1px solid var(--bevel-dark)', paddingLeft: '10px' }}>
            Aditya_Resume.pdf
          </span>
        </div>
        <span style={{ fontSize: '8px', color: 'var(--phosphor-dark)', letterSpacing: '1px' }}>
          C:\PEGASUS\DOCS\RESUME.PDF
        </span>
      </div>

      {/* ── Toolbar ────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#080f08',
          borderBottom: '2px solid var(--bevel-dark)',
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        {/* Open in new tab */}
        <ToolBtn
          onClick={openInNewTab}
          icon={
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="2" y="4" width="10" height="10" rx="1" />
              <path d="M6 2h8v8" />
              <line x1="9" y1="7" x2="14" y2="2" />
            </svg>
          }
          label="OPEN IN TAB"
          title="Open resume in a new browser tab"
        />

        {/* Download */}
        <ToolBtn
          onClick={download}
          icon={
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="8" y1="2" x2="8" y2="11" />
              <polyline points="4,7 8,11 12,7" />
              <line x1="2" y1="14" x2="14" y2="14" />
            </svg>
          }
          label="DOWNLOAD PDF"
          title="Download Aditya_Resume.pdf"
        />
      </div>

      {/* ── Document View ──────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          background: '#050c05',
          position: 'relative',
        }}
      >
        {pdfError ? (
          /* Placeholder when file not found */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              color: 'var(--phosphor-dim)',
            }}
          >
            <svg width="80" height="100" viewBox="0 0 64 80" fill="none">
              <rect x="2" y="2" width="52" height="76" rx="2" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M38 2 L62 26 L52 26 L52 2 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
              <line x1="10" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
              <line x1="10" y1="44" x2="48" y2="44" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
              <line x1="10" y1="52" x2="38" y2="52" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
            </svg>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '2px',
                color: 'var(--phosphor-dim)',
              }}
            >
              RESUME NOT FOUND
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={openInNewTab}
                className="retro-btn"
                style={{ fontSize: '9px', letterSpacing: '1px', padding: '6px 14px' }}
              >
                ↗ OPEN IN TAB
              </button>
              <button
                onClick={download}
                className="retro-btn"
                style={{ fontSize: '9px', letterSpacing: '1px', padding: '6px 14px' }}
              >
                ↓ DOWNLOAD PDF
              </button>
            </div>
          </div>
        ) : (
          <iframe
            src={RESUME_SRC}
            title="Aditya Singh Resume"
            onError={() => setPdfError(true)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#ffffff',
            }}
          />
        )}
      </div>

      {/* ── Status Bar ────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#060c06',
          borderTop: '2px solid var(--bevel-dark)',
          padding: '3px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '9px', color: 'var(--phosphor-dim)' }}>
          {pdfError ? '✕ FILE NOT FOUND' : '● RESUME PDF LOADED'}
        </span>
        <div style={{ display: 'flex', gap: '14px' }}>
          <span style={{ fontSize: '9px', color: 'var(--phosphor-dark)' }}>
            Format: PDF · /Aditya_Resume.pdf
          </span>
        </div>
      </div>
    </div>
  );
};

/* ── Toolbar Button Helper ─────────────────────────────────────────────────── */
const ToolBtn: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  title: string;
}> = ({ onClick, icon, label, title }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 10px',
        background: hovered ? '#122016' : '#0a1a0c',
        border: '1px solid',
        borderColor: hovered
          ? 'var(--bevel-light) var(--bevel-dark) var(--bevel-dark) var(--bevel-light)'
          : 'var(--bevel-dark)',
        color: hovered ? 'var(--phosphor)' : 'var(--phosphor-dim)',
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.8px',
        cursor: 'pointer',
        transition: 'all 0.08s ease',
        flexShrink: 0,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', opacity: hovered ? 1 : 0.7 }}>
        {icon}
      </span>
      {label && <span>{label}</span>}
    </button>
  );
};

export default ResumeApp;
