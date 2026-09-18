import React, { useEffect, useState, useRef } from 'react';
import { playClick, playAccessGranted, playAccessDenied } from './sound';

const BOOT_LINES = [
  { text: 'S.H.I.E.L.D. MAINFRAME BIOS v4.02 (C) 1949-2026 STRATEGIC SCIENTIFIC RESERVE', delay: 0 },
  { text: 'CPU: QUANTUM-HYPERION 8086 @ 4.77 MHz [ENCRYPTED REAL-MODE 16-BIT]', delay: 150 },
  { text: 'MEMORY TEST: 65536KB OK   MONOCHROME CRT: TACTICAL-GREEN (P1)', delay: 350 },
  { text: 'PRIMARY MASTER  : 512MB CLASSIFIED ARCHIVE DRIVE [SSR SECURE FAST BUS]', delay: 550 },
  { text: 'NETWORK ADAPTER : HELICARRIER SATCOM RELAY 07 [CONNECTED]', delay: 750 },
  { text: 'SUBSYSTEM RELAY : TRISKELION ENCRYPTION MATRIX [ONLINE]', delay: 950 },
  { text: 'SECURITY MODULE : HYDRA-FIREWALL INFILTRATION DETECTOR [CLEAR]', delay: 1150 },
  { text: '------------------------------------------------------------------', delay: 1350 },
  { text: '> INITIALIZING KERNEL SYSTEM...', delay: 1500, ok: true },
  { text: '> MOUNTING VIRTUAL SECURE DRIVE C:\\SHIELD...', delay: 1750, ok: true },
  { text: '> VERIFYING S.H.I.E.L.D. AGENT DOSSIER...', delay: 2000, ok: true },
  { text: '> SECURITY LEVEL CHECK: LEVEL 5 AUTHORIZATION REQUIRED', delay: 2250, ok: true },
  { text: '> HALTING: AWAITING CLEARANCE KEYCODE...', delay: 2500, ok: true },
];

const CORRECT_PASSWORD = '8539';

interface Props {
  onComplete: () => void;
  soundEnabled?: boolean;
}

export const BiosScreen: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [phase, setPhase] = useState<'bios' | 'auth'>('bios');
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [memCount, setMemCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Auth terminal state
  const [password, setPassword] = useState('');
  const [authStatus, setAuthStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Memory count animation
    const memInterval = setInterval(() => {
      setMemCount(prev => {
        if (prev >= 65536) {
          clearInterval(memInterval);
          return 65536;
        }
        return prev + 4096;
      });
    }, 35);

    // Boot lines display timers
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    // Segmented progress bar timer (total ~2.8s)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 6;
      });
    }, 150);

    // After BIOS sequence ends, prompt for S.H.I.E.L.D. clearance password
    const transitionTimer = setTimeout(() => {
      setPhase('auth');
    }, 2800);

    timers.push(transitionTimer);

    return () => {
      clearInterval(memInterval);
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Focus input automatically when entering auth phase
  useEffect(() => {
    if (phase === 'auth') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [phase]);

  const handleSkipBios = () => {
    if (phase === 'bios') {
      setPhase('auth');
    }
  };

  const handleAuthSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (authStatus === 'granted') return;

    const cleanInput = password.trim().toUpperCase();

    if (cleanInput === CORRECT_PASSWORD) {
      setAuthStatus('granted');
      setErrorMessage('');
      playAccessGranted(soundEnabled);
      setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 300);
      }, 750);
    } else {
      setAuthStatus('denied');
      setErrorMessage('INVALID KEYCODE // ACCESS DENIED');
      playAccessDenied(soundEnabled);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setTimeout(() => {
        setAuthStatus('idle');
      }, 1500);
    }
  };

  return (
    <div
      className={`absolute inset-0 z-[9000] flex flex-col justify-between p-6 select-none transition-opacity duration-300 font-mono ${done ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      style={{
        background: '#040804',
        color: 'var(--phosphor)',
      }}
      onClick={() => {
        if (phase === 'auth') {
          inputRef.current?.focus();
        }
      }}
    >
      {phase === 'bios' ? (
        /* ════════════════ BIOS POST PHASE ════════════════ */
        <div
          className="flex-1 flex flex-col justify-between cursor-pointer"
          onClick={handleSkipBios}
        >
          <div className="max-w-3xl">
            <div
              style={{
                fontSize: '9px',
                color: 'var(--phosphor-dim)',
                marginBottom: '10px',
                borderBottom: '1px dashed var(--bevel-mid)',
                paddingBottom: '4px',
                letterSpacing: '0.5px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>S.H.I.E.L.D. SECURE GATEWAY v4.02</span>
              <span className="animate-pulse">CLICK TO SKIP POST ▶</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {BOOT_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`transition-opacity duration-100 ${visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{
                    fontSize: '10px',
                    lineHeight: '1.35',
                    minHeight: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {line.text && (
                    <>
                      <span
                        style={{
                          color: line.text.startsWith('  -')
                            ? 'var(--phosphor-dim)'
                            : line.text.includes('LEVEL 5')
                              ? 'var(--amber)'
                              : 'var(--phosphor)',
                        }}
                      >
                        {line.text.includes('65536KB')
                          ? line.text.replace('65536KB', `${memCount}KB`)
                          : line.text}
                      </span>
                      {line.ok && visibleLines.includes(i) && (
                        <span
                          style={{
                            color: 'var(--phosphor-hot)',
                            fontWeight: 'bold',
                            fontSize: '9px',
                          }}
                        >
                          [ OK ]
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Progress */}
          <div style={{ borderTop: '1px solid var(--bevel-mid)', paddingTop: '6px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '9px',
                color: 'var(--phosphor-dim)',
                marginBottom: '4px',
              }}
            >
              <span>TRISKELION GATEWAY SYNC</span>
              <span>{progress}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                border: '1px solid var(--bevel-light)',
                background: '#020502',
                display: 'flex',
                gap: '2px',
                padding: '1px',
              }}
            >
              {Array.from({ length: 25 }).map((_, idx) => {
                const isFilled = idx < Math.floor((progress / 100) * 25);
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: '100%',
                      background: isFilled ? 'var(--phosphor)' : 'transparent',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ════════════════ SIMPLE, CLASSIFIED S.H.I.E.L.D. AUTH ════════════════ */
        <div
          className={`flex-1 flex flex-col justify-center max-w-xl mx-auto w-full transition-transform duration-100 ${shake ? 'translate-x-1' : ''
            }`}
        >
          {/* Subtle classified header */}
          <div className="text-[10px] text-[var(--phosphor-dim)] border-b border-[var(--bevel-mid)] pb-2 mb-4 tracking-wider flex justify-between">
            <span>S.H.I.E.L.D. // LEVEL 5 CLEARANCE GATEWAY</span>
            <span>SSR-TRISKELION-74</span>
          </div>

          <div className="space-y-2 text-xs leading-relaxed mb-5">
            <div className="flex gap-2">
              <span className="text-[var(--phosphor-dim)] min-w-[110px]">OPERATOR:</span>
              <span className="text-[var(--phosphor-hot)] font-bold">SPECIAL AGENT ADITYA SINGH</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[var(--phosphor-dim)] min-w-[110px]">SECURITY:</span>
              <span className="text-[var(--amber)]">LEVEL 5 REQUIRED</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[var(--phosphor-dim)] min-w-[110px]">STATUS:</span>
              <span className="text-[var(--phosphor-dim)]">AUTHENTICATION PENDING</span>
            </div>
          </div>

          {/* Clean terminal input line */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--phosphor-mid)] pb-1.5 focus-within:border-[var(--phosphor-hot)]">
              <span className="text-[var(--phosphor)] text-sm font-bold">&gt;</span>
              <span className="text-xs text-[var(--phosphor-dim)] whitespace-nowrap">ENTER KEYCODE:</span>
              <input
                ref={inputRef}
                type="password"
                autoComplete="off"
                spellCheck="false"
                value={password}
                disabled={authStatus === 'granted'}
                onChange={(e) => {
                  setPassword(e.target.value);
                  playClick(soundEnabled);
                  if (authStatus === 'denied') setAuthStatus('idle');
                }}
                placeholder="•••••"
                className="bg-transparent text-sm text-[var(--phosphor-hot)] tracking-widest uppercase focus:outline-none flex-1 font-mono"
              />
              <span className="animate-pulse text-xs text-[var(--phosphor)]">█</span>
            </div>

            {/* Subtle status line */}
            <div className="min-h-[18px] text-[11px]">
              {authStatus === 'denied' && (
                <span className="text-[var(--red-alert)] font-bold">
                  [!] {errorMessage}
                </span>
              )}
              {authStatus === 'granted' && (
                <span className="text-[var(--phosphor-hot)] font-bold">
                  [✓] IDENTITY CONFIRMED. ACCESS GRANTED.
                </span>
              )}
              {authStatus === 'idle' && (
                <span className="text-[9px] text-[var(--phosphor-dim)]">
                  PRESS [ENTER] TO AUTHENTICATE · KEYCODE: <button type="button" onClick={() => { setPassword('8539'); playClick(soundEnabled); inputRef.current?.focus(); }} className="underline hover:text-[var(--phosphor)] cursor-pointer">8539</button>
                </span>
              )}
            </div>
          </form>

          {/* Minimal footer line */}
          <div className="text-[9px] text-[var(--phosphor-dark)] border-t border-[var(--bevel-mid)] pt-2 mt-6">
            STRATEGIC HOMELAND INTERVENTION, ENFORCEMENT AND LOGISTICS DIVISION
          </div>
        </div>
      )}
    </div>
  );
};

export default BiosScreen;
