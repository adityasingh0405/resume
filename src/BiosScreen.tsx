import React, { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: 'PHOSPHOR RETRO BIOS v4.02 (C) 1984-2026 PEGASUS CORP.', delay: 0 },
  { text: 'CPU: INTEL 8086 @ 4.77 MHz [REAL MODE 16-BIT]', delay: 200 },
  { text: 'MEMORY TEST: 16384KB OK   MONOCHROME CRT: MONO-GREEN (P1)', delay: 450 },
  { text: 'PRIMARY MASTER  : 64MB VIRTUAL SSD [IDE FAST TIMING]', delay: 750 },
  { text: 'PRIMARY SLAVE   : NONE DETECTED', delay: 950 },
  { text: 'SECONDARY MASTER: CD-ROM DRIVE [READY]', delay: 1150 },
  { text: 'PCI DEVICE SCAN : 4 CONTROLLERS FOUND', delay: 1400 },
  { text: '  - IRQ 03: AUDIO RELAY MATRIX      [ OK ]', delay: 1650 },
  { text: '  - IRQ 07: PHOSPHOR DISPLAY ADAPTER [ OK ]', delay: 1900 },
  { text: '---------------------------------------------------------', delay: 2100 },
  { text: '> INITIALIZING KERNEL SYSTEM...', delay: 2300, ok: true },
  { text: '> MOUNTING VIRTUAL DRIVE C:...', delay: 2600, ok: true },
  { text: '> LOADING GRAPHICS & WINDOW MANAGER Engine...', delay: 2900, ok: true },
  { text: '> VERIFYING SYSTEM INTEGRITY...', delay: 3200, ok: true },
  { text: '> LOADING USER PROFILE & SETTINGS...', delay: 3500, ok: true },
  { text: '> LAUNCHING WORKSTATION DESKTOP...', delay: 3800, ok: true },
];

interface Props {
  onComplete: () => void;
}

export const BiosScreen: React.FC<Props> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [memCount, setMemCount] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Memory count animation up to 16384KB
    const memInterval = setInterval(() => {
      setMemCount(prev => {
        if (prev >= 16384) {
          clearInterval(memInterval);
          return 16384;
        }
        return prev + 1024;
      });
    }, 40);

    // Boot lines display timers
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    // Segmented progress bar timer (total ~4.2s)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 160);

    const finishTimer = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 300);
    }, 4600);

    timers.push(finishTimer);

    return () => {
      clearInterval(memInterval);
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`absolute inset-0 z-[9000] flex flex-col justify-between p-5 cursor-pointer select-none transition-opacity duration-300 ${done ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      style={{ background: '#040804' }}
      onClick={() => {
        setDone(true);
        onComplete();
      }}
    >
      {/* Top Header & Detailed BIOS POST Messages */}
      <div className="max-w-3xl">
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--phosphor-dim)',
            marginBottom: '8px',
            borderBottom: '1px dashed var(--bevel-mid)',
            paddingBottom: '4px',
            letterSpacing: '0.5px',
          }}
        >
          ▲ ENERGY STAR COMPLIANT RETRO BIOS v4.02 — CLICK ANYWHERE TO SKIP BOOT
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              className={`transition-opacity duration-100 ${visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                lineHeight: '1.3',
                minHeight: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {line.text && (
                <>
                  <span style={{ color: line.text.startsWith('  -') ? 'var(--phosphor-dim)' : 'var(--phosphor)' }}>
                    {line.text.includes('16384KB')
                      ? line.text.replace('16384KB', `${memCount}KB`)
                      : line.text}
                  </span>
                  {line.ok && visibleLines.includes(i) && (
                    <span
                      style={{
                        color: 'var(--phosphor-hot)',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-mono)',
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

      {/* Bottom Progress Bar */}
      <div
        style={{
          borderTop: '1px solid var(--bevel-mid)',
          paddingTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: 'var(--phosphor-dim)',
            letterSpacing: '0.5px',
          }}
        >
          <span>SYSTEM LOADING...</span>
          <span>{progress}%</span>
        </div>

        {/* WinXP style segmented progress bar */}
        <div
          style={{
            width: '100%',
            height: '12px',
            border: '1px solid var(--bevel-light)',
            background: '#020502',
            padding: '2px',
            display: 'flex',
            gap: '2px',
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
                  boxShadow: isFilled ? '0 0 4px var(--phosphor)' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BiosScreen;
