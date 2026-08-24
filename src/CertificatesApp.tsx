import React, { useState, useEffect, useCallback } from 'react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  src: string;
  url?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   CERTIFICATES MANIFEST
───────────────────────────────────────────────────────────────────────────── */
const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Back-End Web Development',
    issuer: 'Scaler Topics',
    date: '2024',
    src: 'https://ik.imagekit.io/hzvbqwpg8/image_h5BFKkRRI.png',
    url: 'https://ik.imagekit.io/hzvbqwpg8/image_h5BFKkRRI.png',
  },
  {
    id: 'cert-2',
    title: 'Full-Stack Web Development',
    issuer: 'Code with Harry',
    date: '2025',
    src: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202025-12-06%20231418.png',
    url: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202025-12-06%20231418.png',
  },
  {
    id: 'cert-3',
    title: 'Data Science Course',
    issuer: 'Code with Harry',
    date: '2026',
    src: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202026-04-08%20235229.png',
    url: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202026-04-08%20235229.png',
  },
  {
    id: 'cert-4',
    title: 'Python Bootcamp',
    issuer: 'Code with Harry',
    date: '2026',
    src: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202026-04-08%20235207.png',
    url: 'https://ik.imagekit.io/hzvbqwpg8/Screenshot%202026-04-08%20235207.png',
  },
];

const CertificatesApp: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const [imgLoaded, setImgLoaded] = useState<Set<string>>(new Set());

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % CERTIFICATES.length
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const activeCert = lightboxIndex !== null ? CERTIFICATES[lightboxIndex] : null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--neos-bg)',
        fontFamily: 'var(--font-mono)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Address / Path Bar ────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0a1e0c 0%, #061008 100%)',
          borderBottom: '1px solid var(--bevel-dark)',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '9px', color: 'var(--phosphor-dim)', letterSpacing: '2px' }}>
            CERTIFICATIONS
          </span>
          <span style={{ fontSize: '8px', color: 'var(--phosphor-dark)', borderLeft: '1px solid var(--bevel-dark)', paddingLeft: '10px' }}>
            {CERTIFICATES.length} OBJECT{CERTIFICATES.length !== 1 ? 'S' : ''}
          </span>
        </div>
        <span style={{ fontSize: '8px', color: 'var(--phosphor-dark)', letterSpacing: '1px' }}>
          C:\PEGASUS\CERTS\
        </span>
      </div>

      {/* ── Toolbar ────────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#080f08',
          borderBottom: '2px solid var(--bevel-dark)',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flexShrink: 0,
        }}
      >
        {['VIEW', 'SORT', 'HELP'].map((label) => (
          <span
            key={label}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--phosphor-dark)',
              padding: '2px 6px',
              letterSpacing: '0.5px',
              cursor: 'default',
            }}
          >
            {label}
          </span>
        ))}
        <div style={{ flex: 1, height: '1px', background: 'var(--bevel-dark)', margin: '0 6px' }} />
        <span style={{ fontSize: '8px', color: 'var(--phosphor-dark)', opacity: 0.7 }}>
          CLICK CARD TO VIEW · ← → TO NAVIGATE IN VIEWER
        </span>
      </div>

      {/* ── Certificate Grid ──────────────────────────────────────────── */}
      <div
        className="retro-scroll"
        style={{
          flex: 1,
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
          alignContent: 'start',
          overflowY: 'auto',
        }}
      >
        {CERTIFICATES.map((cert, index) => (
          <CertCard
            key={cert.id}
            cert={cert}
            index={index}
            hasError={imgErrors.has(cert.id)}
            isLoaded={imgLoaded.has(cert.id)}
            onOpen={() => setLightboxIndex(index)}
            onError={() => setImgErrors((prev) => new Set([...prev, cert.id]))}
            onLoad={() => setImgLoaded((prev) => new Set([...prev, cert.id]))}
          />
        ))}
      </div>

      {/* ── Status Bar ────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#060c06',
          borderTop: '2px solid var(--bevel-dark)',
          padding: '3px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '9px', color: 'var(--phosphor-dim)' }}>
          {CERTIFICATES.length} certificate(s) loaded
        </span>
        <span style={{ fontSize: '9px', color: 'var(--phosphor-dark)' }}>
          Click to open · Keyboard: ← → ESC
        </span>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {activeCert !== null && lightboxIndex !== null && (
        <Lightbox
          cert={activeCert}
          index={lightboxIndex}
          total={CERTIFICATES.length}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
          onJump={setLightboxIndex}
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Certificate Card
───────────────────────────────────────────────────────────────────────────── */
interface CertCardProps {
  cert: Certificate;
  index: number;
  hasError: boolean;
  isLoaded: boolean;
  onOpen: () => void;
  onError: () => void;
  onLoad: () => void;
}

const CertCard: React.FC<CertCardProps> = ({
  cert, index, hasError, isLoaded, onOpen, onError, onLoad,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '2px solid',
        borderColor: hovered ? 'var(--bevel-light)' : 'var(--bevel-dark)',
        background: hovered ? '#0a1e0c' : '#070e07',
        transition: 'border-color 0.1s ease, background 0.1s ease',
        boxShadow: hovered
          ? 'inset 1px 1px 0 var(--bevel-mid), 0 0 8px rgba(78,222,90,0.08)'
          : 'inset 1px 1px 0 var(--bevel-xdark)',
        overflow: 'hidden',
        position: 'relative',
      }}
      title={`Click to open: ${cert.title}`}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1.41 / 1',
          background: '#040804',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--bevel-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hasError ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'var(--phosphor-dim)', padding: '10px', textAlign: 'center' }}>
            <svg width="40" height="32" viewBox="0 0 48 38" fill="none">
              <rect x="1" y="1" width="46" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
              <path d="M18 20 L30 20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            </svg>
            <span style={{ fontSize: '8px', letterSpacing: '1px', color: 'var(--phosphor-hot)', fontWeight: 'bold' }}>CERTIFICATE LINK ↗</span>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--phosphor-dark)', fontSize: '8px', letterSpacing: '1px' }}>
                LOADING...
              </div>
            )}
            <img
              src={cert.src}
              alt={cert.title}
              onError={onError}
              onLoad={onLoad}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: isLoaded ? 'block' : 'none',
                filter: hovered ? 'brightness(1.05)' : 'brightness(0.88)',
                transition: 'filter 0.1s ease',
              }}
            />
          </>
        )}

        {/* Index badge */}
        <div
          style={{
            position: 'absolute', top: '4px', left: '4px',
            background: 'rgba(0,0,0,0.78)',
            border: '1px solid var(--bevel-dark)',
            color: 'var(--phosphor-dark)',
            fontSize: '7px',
            fontFamily: 'var(--font-mono)',
            padding: '1px 4px',
            letterSpacing: '0.5px',
          }}
        >
          #{String(index + 1).padStart(2, '0')}
        </div>

        {/* Hover overlay */}
        {hovered && (
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,20,4,0.4)',
            }}
          >
            <span
              style={{
                fontSize: '9px', letterSpacing: '2px',
                color: 'var(--phosphor)',
                border: '1px solid var(--bevel-light)',
                padding: '3px 8px',
                background: 'rgba(0,0,0,0.65)',
              }}
            >
              VIEW
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{ padding: '7px 8px 6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div
          style={{
            fontSize: '10px', fontWeight: 'bold',
            color: hovered ? 'var(--phosphor)' : 'var(--phosphor-dim)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            letterSpacing: '0.3px',
          }}
        >
          {cert.title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '8px', color: 'var(--phosphor-dark)', letterSpacing: '0.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {cert.issuer}
          </div>
          <div style={{ fontSize: '7px', color: 'var(--phosphor-dark)', opacity: 0.6 }}>
            {cert.date}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   Lightbox — renders inside the window, not browser fullscreen
───────────────────────────────────────────────────────────────────────────── */
interface LightboxProps {
  cert: Certificate;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJump: (i: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  cert, index, total, onClose, onNext, onPrev, onJump,
}) => {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset on cert change
  useEffect(() => {
    setImgError(false);
    setLoaded(false);
  }, [cert.src]);

  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 9999,
        background: 'rgba(0,3,0,0.97)',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--title-active-start) 0%, var(--title-active-end) 60%, var(--title-active-start) 100%)',
          borderBottom: '1px solid var(--bevel-dark)',
          padding: '5px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="14" height="11" viewBox="0 0 48 38" fill="none" style={{ opacity: 0.85, flexShrink: 0 }}>
            <rect x="1" y="1" width="46" height="36" rx="2" stroke="var(--phosphor)" strokeWidth="3" fill="none" />
            <circle cx="24" cy="31" r="4" stroke="var(--phosphor)" strokeWidth="3" fill="none" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--title-text-active)', letterSpacing: '0.8px' }}>
            {cert.title}
          </span>
          <span style={{ fontSize: '9px', color: 'var(--phosphor-dim)', opacity: 0.7 }}>
            {cert.issuer} · {cert.date}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {cert.url && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn"
              style={{ fontSize: '8px', padding: '2px 7px', letterSpacing: '0.5px', textDecoration: 'none' }}
              title="Open external certificate link"
            >
              VERIFY LINK ↗
            </a>
          )}
          <span style={{ fontSize: '9px', color: 'var(--phosphor-dark)', letterSpacing: '1px' }}>
            [{index + 1}/{total}]
          </span>
          <button
            onClick={onClose}
            className="win-ctrl win-ctrl-close"
            style={{ fontSize: '11px', fontWeight: 'bold' }}
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden', padding: '20px 60px',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {imgError ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', color: 'var(--phosphor-dim)' }}>
            <svg width="80" height="64" viewBox="0 0 48 38" fill="none">
              <rect x="1" y="1" width="46" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
            </svg>
            <div style={{ fontSize: '11px', letterSpacing: '2px' }}>VERIFIABLE CREDENTIAL LINK</div>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn"
                style={{ fontSize: '10px', padding: '8px 16px', letterSpacing: '1px', textDecoration: 'none' }}
              >
                ↗ OPEN CERTIFICATE AT ISSUER SITE
              </a>
            )}
          </div>
        ) : (
          <>
            {!loaded && (
              <div style={{ position: 'absolute', color: 'var(--phosphor-dark)', fontSize: '10px', letterSpacing: '2px' }}>
                LOADING...
              </div>
            )}
            <img
              key={cert.src}
              src={cert.src}
              alt={cert.title}
              onError={() => setImgError(true)}
              onLoad={() => setLoaded(true)}
              style={{
                maxWidth: '100%', maxHeight: '100%', objectFit: 'contain',
                border: '1px solid var(--bevel-dark)',
                boxShadow: '0 0 50px rgba(0,0,0,0.98), 0 0 0 1px var(--bevel-xdark)',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.2s ease',
                display: 'block',
              }}
            />
          </>
        )}

        {/* Prev */}
        {total > 1 && (
          <NavBtn side="left" onClick={onPrev} label="◀" title="Previous (←)" />
        )}

        {/* Next */}
        {total > 1 && (
          <NavBtn side="right" onClick={onNext} label="▶" title="Next (→)" />
        )}
      </div>

      {/* Dot navigation + footer */}
      <div
        style={{
          background: '#040804',
          borderTop: '1px solid var(--bevel-dark)',
          padding: '8px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, gap: '12px',
        }}
      >
        {/* Dots */}
        {total > 1 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {CERTIFICATES.map((_, i) => (
              <div
                key={i}
                onClick={() => onJump(i)}
                style={{
                  width: i === index ? '18px' : '6px',
                  height: '4px',
                  background: i === index ? 'var(--phosphor)' : 'var(--bevel-dark)',
                  borderRadius: '2px',
                  transition: 'width 0.15s ease, background 0.15s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        ) : (
          <div />
        )}

        {/* Key hints */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {[['← →', 'Navigate'], ['ESC', 'Close']].map(([k, d]) => (
            <span key={k} style={{ fontSize: '8px', color: 'var(--phosphor-dark)' }}>
              <span style={{ color: 'var(--phosphor-dim)' }}>[{k}]</span>{' '}{d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Nav button helper */
const NavBtn: React.FC<{
  side: 'left' | 'right';
  onClick: () => void;
  label: string;
  title: string;
}> = ({ side, onClick, label, title }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      position: 'absolute',
      [side]: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '36px',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,15,4,0.82)',
      border: '1px solid var(--bevel-mid)',
      color: 'var(--phosphor)',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: 'var(--font-mono)',
      borderRadius: '2px',
      transition: 'background 0.1s ease, border-color 0.1s ease, color 0.1s ease',
      zIndex: 10,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#0e3016';
      e.currentTarget.style.borderColor = 'var(--bevel-light)';
      e.currentTarget.style.color = 'var(--phosphor-hot)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(0,15,4,0.82)';
      e.currentTarget.style.borderColor = 'var(--bevel-mid)';
      e.currentTarget.style.color = 'var(--phosphor)';
    }}
  >
    {label}
  </button>
);

export default CertificatesApp;
