import React, { useState, useEffect, useRef } from 'react';
import { playClick, playClose } from './sound';

interface RetroMonitorFrameProps {
  children: React.ReactNode;
  soundEnabled?: boolean;
  onOpenTerminal?: () => void;
}

export const RetroMonitorFrame: React.FC<RetroMonitorFrameProps> = ({
  children,
  soundEnabled = true,
  onOpenTerminal,
}) => {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [brightnessLevel, setBrightnessLevel] = useState<number>(2);
  const [isFramedMode, setIsFramedMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isGlitching, setIsGlitching] = useState(false);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  const brightnessLevels = [100, 125, 75, 90];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isPoweredOn) return;

    let glitchTimeoutId: ReturnType<typeof setTimeout>;
    let nextGlitchTimerId: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      setIsGlitching(true);
      glitchTimeoutId = setTimeout(() => {
        setIsGlitching(false);
      }, 600);
    };

    const scheduleNextGlitch = () => {
      // Exact 20-second loop interval
      nextGlitchTimerId = setTimeout(() => {
        triggerGlitch();

        // Spider-Verse signature double-snap echo pop 320ms later
        setTimeout(triggerGlitch, 320);

        scheduleNextGlitch();
      }, 20000);
    };

    scheduleNextGlitch();

    return () => {
      clearTimeout(glitchTimeoutId);
      clearTimeout(nextGlitchTimerId);
    };
  }, [isPoweredOn]);

  const toggleBrightness = () => {
    try { playClick(soundEnabled); } catch (e) { }
    const nextLevel = (brightnessLevel + 5) % brightnessLevels.length;
    setBrightnessLevel(nextLevel);
    setBrightness(brightnessLevels[nextLevel]);
  };

  const togglePower = () => {
    try {
      if (isPoweredOn) { playClose(soundEnabled); } else { playClick(soundEnabled); }
    } catch (e) { }
    setIsPoweredOn(!isPoweredOn);
  };
  const toggleFrameMode = () => {
    try { playClick(soundEnabled); } catch (e) { }
    setIsFramedMode(!isFramedMode);
  };

  // Listen for Escape key in fullscreen mode to switch back to frame view
  useEffect(() => {
    if (isFramedMode || isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        try { playClick(soundEnabled); } catch (err) { }
        setIsFramedMode(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFramedMode, isMobile, soundEnabled]);

  useEffect(() => {
    if (!isFramedMode || isMobile) return;
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const targetW = 1120;
      const targetH = 800;
      const sx = (windowWidth * 0.96) / targetW;
      const sy = (windowHeight * 0.96) / targetH;
      setScale(Math.min(Math.max(Math.min(sx, sy), 0.45), 1.3));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFramedMode, isMobile]);

  // On mobile devices, always render full-screen view directly without monitor bezel
  if (!isFramedMode || isMobile) {
    return (
      <div className={`relative w-full h-full ${isGlitching ? 'crt-glitching' : ''}`}>
        {/* Helper text above taskbar on bottom right (Desktop non-framed mode only) */}
        {!isMobile && (
          <div
            onClick={() => {
              try { playClick(soundEnabled); } catch (err) { }
              setIsFramedMode(true);
            }}
            style={{
              position: 'fixed',
              bottom: '54px',
              right: '16px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '1px',
              color: 'var(--phosphor-dim, #22c55e)',
              opacity: 0.65,
              zIndex: 9999,
              cursor: 'pointer',
              userSelect: 'none',
              textTransform: 'lowercase',
              background: 'rgba(0, 0, 0, 0.45)',
              padding: '3px 8px',
              borderRadius: '3px',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.65')}
            title="Click or press ESC to return to Frame View"
          >
            press esc for frame view
          </div>
        )}

        {children}
      </div>
    );
  }

  return (
    <div className="crt-wrapper">
      <button onClick={toggleFrameMode} className="frame-toggle-btn" title="Toggle Fullscreen">
        🔲 FULLSCREEN
      </button>

      <div ref={containerRef} className="crt-scaler" style={{ transform: `scale(${scale})` }}>
        {/* ─────── Solid Retro CRT Monitor Body ─────── */}
        <div className="crt-housing">
          {/* Main Ivory/Beige Front Cabinet Face */}
          <div className="crt-faceplate" style={{ position: 'relative' }}>

            {/* Dark Graphite Screen Inset Frame */}
            <div className="crt-screen-inset">
              {/* Glass Tube Viewport */}
              <div
                className={`crt-glass-tube ${!isPoweredOn ? 'crt-powered-off' : ''} ${isGlitching ? 'crt-glitching' : ''}`}
                style={{ filter: isPoweredOn ? `brightness(${brightness}%)` : 'none' }}
              >
                {/* Scanline overlay */}
                <div className="crt-scanlines" />
                {/* Curved glass glare overlay */}
                <div className="crt-glass-glare" />
                {/* Aged glass smudges & fingerprint overlay */}
                <div className="crt-glass-smudges" />

                {/* Ultra-fine natural glass hairline scratches & micro-refractions */}
                <svg
                  className="crt-glass-scratches"
                  viewBox="0 0 1000 600"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 9003,
                  }}
                >
                  <defs>
                    <linearGradient id="scratchFade1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
                      <stop offset="30%" stopColor="#ffffff" stopOpacity="0.08" />
                      <stop offset="70%" stopColor="#ffffff" stopOpacity="0.07" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="scratchFade2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
                      <stop offset="40%" stopColor="#ffffff" stopOpacity="0.09" />
                      <stop offset="80%" stopColor="#ffffff" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="scratchFade3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.075" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Scratch 1: Ultra-fine organic arc near upper-left light bloom */}
                  <path
                    d="M 275,128 C 300,122 335,134 365,148"
                    fill="none"
                    stroke="url(#scratchFade1)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                  />

                  {/* Scratch 2: Delicate wavy hairline across upper center */}
                  <path
                    d="M 510,105 C 530,118 555,122 580,115"
                    fill="none"
                    stroke="url(#scratchFade2)"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                  />

                  {/* Scratch 3: Faint double scuff near top-right glare */}
                  <path
                    d="M 705,160 C 720,168 735,180 748,192"
                    fill="none"
                    stroke="url(#scratchFade3)"
                    strokeWidth="0.38"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 714,166 C 728,174 742,185 754,198"
                    fill="none"
                    stroke="url(#scratchFade3)"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                  />

                  {/* Scratch 4: Faint vertical fingernail brush on mid-left */}
                  <path
                    d="M 205,275 C 212,290 216,305 220,320"
                    fill="none"
                    stroke="url(#scratchFade1)"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                  />

                  {/* Scratch 5: Minor faint micro-abrasion lower-right */}
                  <path
                    d="M 785,370 C 798,376 812,379 824,374"
                    fill="none"
                    stroke="url(#scratchFade2)"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                  />

                  {/* Scratch 6: Faint diagonal micro-tick near top-left bezel */}
                  <path
                    d="M 140,95 C 160,110 178,125 195,142"
                    fill="none"
                    stroke="url(#scratchFade1)"
                    strokeWidth="0.32"
                    strokeLinecap="round"
                  />

                  {/* Scratch 7: Fine organic curve lower-left center */}
                  <path
                    d="M 310,440 C 335,455 365,462 395,458"
                    fill="none"
                    stroke="url(#scratchFade2)"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                  />

                  {/* Scratch 8: Delicate vertical wipe scratch near mid-right */}
                  <path
                    d="M 845,210 C 848,235 842,260 838,285"
                    fill="none"
                    stroke="url(#scratchFade3)"
                    strokeWidth="0.34"
                    strokeLinecap="round"
                  />

                  {/* Scratch 9: Faint micro hairline arc bottom-center */}
                  <path
                    d="M 460,510 C 490,522 525,518 555,505"
                    fill="none"
                    stroke="url(#scratchFade1)"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                  />

                  {/* Scratch 10: Subtle double hairline scuff upper-center-right */}
                  <path
                    d="M 620,85 C 640,92 662,102 680,115"
                    fill="none"
                    stroke="url(#scratchFade2)"
                    strokeWidth="0.33"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 626,92 C 645,99 667,108 684,120"
                    fill="none"
                    stroke="url(#scratchFade2)"
                    strokeWidth="0.28"
                    strokeLinecap="round"
                  />
                </svg>

                {/* CRT Vignette */}
                <div className="crt-barrel-vignette" />

                {/* Desktop Content */}
                {children}

                {/* Power-off Standby Overlay */}
                {!isPoweredOn && (
                  <div className="crt-off-overlay">
                    <div className="crt-off-line" />
                    <p className="crt-off-text">MONITOR STANDBY · PRESS POWER KNOB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls & Branding Chin */}
            <div className="crt-chin">
              {/* Brand label */}
              <div className="crt-brand">
                <span className="crt-brand-name">PEGASUS-1001</span>
                <span className="crt-brand-model">VIDEO MONITOR · MODEL 1984C</span>
              </div>

              {/* Status LEDs (Red, Green, Blue) */}
              <div className="crt-led-strip">
                <div className={`crt-led crt-led-r ${isPoweredOn ? 'on' : ''}`} title="POWER LED" />
                <div className={`crt-led crt-led-g ${isPoweredOn ? 'on' : ''}`} title="SIGNAL LED" />
                <div className={`crt-led crt-led-b ${isPoweredOn ? 'on' : ''}`} title="HDD BUSY LED" />
              </div>

              {/* Hardware Rotary Control Dials */}
              <div className="crt-dial-cluster">
                {/* Brightness Knob */}
                <div className="crt-dial-wrap">
                  <button
                    className="crt-dial-knob"
                    onClick={toggleBrightness}
                    style={{ transform: `rotate(${(brightnessLevel) * 45}deg)` }}
                    title={`Adjust Screen Brightness (${brightness}%)`}
                  >
                    <span className="crt-dial-mark" />
                  </button>
                  <span className="crt-dial-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  </span>
                </div>

                {/* Power Knob */}
                <div className="crt-dial-wrap">
                  <button
                    className={`crt-dial-knob ${!isPoweredOn ? 'knob-off' : ''}`}
                    onClick={togglePower}
                    style={{ transform: isPoweredOn ? 'rotate(0deg)' : 'rotate(-65deg)' }}
                    title={isPoweredOn ? 'Turn Monitor OFF' : 'Turn Monitor ON'}
                  >
                    <span className="crt-dial-mark" />
                  </button>
                  <span className="crt-dial-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* ─────── Yellow Post-It Sticky Note (Taped to Bottom Bezel, Left-Center) ─────── */}
            <div
              className="retro-sticky-note"
              onClick={() => {
                try {
                  playClick(soundEnabled);
                } catch (e) { }
                onOpenTerminal?.();
              }}
              title="Click to open Secret Terminal! (Or press Ctrl + `)"
              style={{
                position: 'absolute',
                bottom: '-45px',
                left: '30%',
                transform: 'translateX(-50%) rotate(2.5deg)',
                transformOrigin: 'top center',
                width: '160px',
                cursor: 'pointer',
                zIndex: 300,
                transition: 'transform 0.15s ease',
              }}
            >
              {/* REALISTIC FROSTED TAPE (Placed outside paper so top isn't clipped) */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  width: '56px',
                  height: '22px',
                  transform: 'translateX(-50%) rotate(-1.5deg)',
                  backgroundColor: 'rgba(254, 248, 215, 0.42)',
                  backgroundImage: `
                    linear-gradient(
                      90deg,
                      rgba(255,255,255,0.15) 0%,
                      rgba(255,255,255,0.48) 50%,
                      rgba(255,255,255,0.15) 100%
                    ),
                    repeating-linear-gradient(
                      90deg,
                      rgba(160, 130, 60, 0.035) 0px,
                      rgba(160, 130, 60, 0.035) 2px,
                      transparent 2px,
                      transparent 4px
                    )
                  `,
                  backdropFilter: 'blur(1.5px)',
                  WebkitBackdropFilter: 'blur(1.5px)',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0,0,0,0.08)',
                  borderLeft: '1.5px dashed rgba(120, 100, 40, 0.25)',
                  borderRight: '1.5px dashed rgba(120, 100, 40, 0.25)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              />

              {/* PAPER BODY */}
              <div
                style={{
                  position: 'relative',
                  padding: '15px 13px 13px',
                  backgroundColor: '#f4e58a',
                  backgroundImage: `
                    radial-gradient(
                      ellipse at 20% 15%,
                      rgba(255,255,255,0.28) 0%,
                      transparent 45%
                    ),
                    radial-gradient(
                      ellipse at 80% 90%,
                      rgba(110,85,10,0.08) 0%,
                      transparent 50%
                    ),
                    repeating-linear-gradient(
                      0deg,
                      rgba(70,55,10,0.025) 0px,
                      rgba(70,55,10,0.025) 1px,
                      transparent 1px,
                      transparent 3px
                    ),
                    repeating-linear-gradient(
                      91deg,
                      rgba(255,255,255,0.025) 0px,
                      rgba(255,255,255,0.025) 1px,
                      transparent 1px,
                      transparent 5px
                    )
                  `,
                  color: '#292711',
                  boxShadow: `
                    2px 3px 4px rgba(0,0,0,0.18),
                    7px 12px 20px rgba(0,0,0,0.38),
                    inset 0 0 15px rgba(120,95,20,0.08)
                  `,
                  borderRadius: '1px 2px 1px 0',
                  borderBottomRightRadius: '16px 4px',
                  clipPath:
                    'polygon(0.5% 1%, 98% 0%, 99.5% 98%, 92% 99%, 74% 98.5%, 57% 100%, 37% 98.5%, 18% 100%, 0% 98%)',
                }}
              >

                {/* HANDWRITTEN CONTENT */}
                <div
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',

                    fontWeight: 500,
                    letterSpacing: '0.15px',

                    /* Ink isn't pure black */
                    color: '#302d19',

                    /* Slight ink softness */
                    textShadow: '0.15px 0 rgba(40,35,15,0.35)',

                    lineHeight: '1.55',
                  }}
                >
                  {/* Header written by hand */}
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      transform: 'rotate(-0.8deg)',
                    }}
                  >
                    📌 Secret terminal
                  </div>

                  {/* Main shortcut */}
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      marginLeft: '4px',
                      transform: 'rotate(0.7deg)',
                    }}
                  >
                    Ctrl + `
                  </div>

                  {/* Hand drawn divider */}
                  <div
                    style={{
                      width: '82%',
                      height: '1px',
                      margin: '7px 0 6px 2px',
                      background:
                        'repeating-linear-gradient(90deg, #514c27 0 5px, transparent 5px 8px)',
                      opacity: 0.55,
                      transform: 'rotate(-1deg)',
                    }}
                  />

                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      transform: 'rotate(-0.5deg)',
                      marginLeft: '3px',
                    }}
                  >
                    click me...
                  </div>

                  <div
                    style={{
                      fontSize: '9px',
                      marginTop: '2px',
                      marginLeft: '8px',
                      opacity: 0.7,
                      transform: 'rotate(1deg)',
                    }}
                  >
                    opens the terminal :)
                  </div>
                </div>

                {/* Faint pen mark */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '7px',
                    right: '9px',
                    fontFamily: '"Segoe Print", cursive',
                    fontSize: '8px',
                    color: 'rgba(55,50,25,0.28)',
                    transform: 'rotate(-7deg)',
                  }}
                >
                  — A
                </div>
              </div>
            </div>

          </div>

          {/* Monitor Pedestal Base Stand */}
          <div className="crt-stand-neck" />
          <div className="crt-stand-foot" />
        </div>
      </div>
    </div>
  );
};

export default RetroMonitorFrame;
