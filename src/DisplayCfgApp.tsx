import React from 'react';

export type ThemeMode = 'green' | 'amber' | 'paper' | 'red';

interface DisplayCfgAppProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

const THEMES = [
  { id: 'green', label: 'IBM 5151 PHOSPHOR GREEN', desc: 'Classic 1981 Muted Green Phosphor', color: '#4ede5a' },
  { id: 'amber', label: 'VT100 AMBER MONITOR', desc: 'Warm 1978 Orange Amber Glow', color: '#e09a2a' },
  { id: 'paper', label: 'PAPER WHITE CRT', desc: '1990s High Contrast White Tube', color: '#c4d8c8' },
  { id: 'red', label: 'VIRTUAL BOY RED', desc: '1995 Deep Crimson Targeting', color: '#dc3c38' },
] as const;

const SYSINFO = [
  ['PIXEL WIDTH', '1024 px'],
  ['PIXEL HEIGHT', '768 px'],
  ['COLOR DEPTH', '8-BIT (256 COLOR)'],
  ['SCAN RATE', '60 Hz'],
  ['H-FREQUENCY', '15.75 kHz'],
  ['TUBE SIZE', '12-INCH CATHODE RAY'],
  ['PERSISTENCE', 'P31 — MED GREEN'],
  ['BEAM CURRENT', '120 µA NOMINAL'],
] as const;

const DisplayCfgApp: React.FC<DisplayCfgAppProps> = ({
  currentTheme,
  onThemeChange,
  soundEnabled,
  onSoundToggle,
}) => {
  return (
    <div className="h-full flex flex-col font-mono bg-void" style={{ padding: '12px', gap: '10px' }}>

      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--bevel-dark)',
        paddingBottom: '10px',
        flexShrink: 0,
      }}>
        <div className="font-vt323" style={{ fontSize: '22px', color: 'var(--phosphor)', textShadow: 'var(--glow-soft)', letterSpacing: '2px' }}>
          DISPLAY.CFG — SYSTEM CONFIG
        </div>
        <div style={{ fontSize: '10px', color: 'var(--phosphor-dim)', letterSpacing: '1px', marginTop: '2px' }}>
          C:\PEGASUS\SYS\DISPLAY.CFG · Configure Phosphor Tubes &amp; Hardware Relays
        </div>
      </div>

      {/* Section: Monitor Color Mode */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          fontSize: '9px',
          color: 'var(--phosphor-dim)',
          letterSpacing: '2px',
          marginBottom: '6px',
          borderLeft: '2px solid var(--bevel-mid)',
          paddingLeft: '6px',
        }}>
          PHOSPHOR MONITOR COLOR MODE:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {THEMES.map(item => {
            const isActive = currentTheme === item.id;
            return (
              <button
                key={item.id}
                style={{
                  padding: '8px 10px',
                  border: '2px solid',
                  borderColor: isActive
                    ? `var(--bevel-light) var(--bevel-dark) var(--bevel-dark) var(--bevel-light)`
                    : `var(--bevel-dark) var(--bevel-mid) var(--bevel-mid) var(--bevel-dark)`,
                  background: isActive ? '#0e2e12' : 'var(--neos-window-dark)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'none',
                  boxShadow: isActive ? `0 0 8px rgba(78,222,90,0.15)` : 'none',
                }}
                onClick={() => onThemeChange(item.id as ThemeMode)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                  {/* Color swatch */}
                  <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: item.color,
                    border: '1px solid rgba(0,0,0,0.5)',
                    flexShrink: 0,
                    boxShadow: isActive ? `0 0 5px ${item.color}` : 'none',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-vt323)',
                    fontSize: '14px',
                    color: isActive ? 'var(--phosphor-hot)' : 'var(--phosphor-dim)',
                    letterSpacing: '1px',
                    lineHeight: 1,
                  }}>
                    {item.label}
                  </span>
                </div>
                <span style={{ fontSize: '9px', color: 'var(--phosphor-dark)', letterSpacing: '0.5px' }}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section: Audio Relay */}
      <div style={{ flexShrink: 0 }}>
        <div style={{
          fontSize: '9px',
          color: 'var(--phosphor-dim)',
          letterSpacing: '2px',
          marginBottom: '6px',
          borderLeft: '2px solid var(--bevel-mid)',
          paddingLeft: '6px',
        }}>
          HARDWARE AUDIO &amp; RELAYS:
        </div>
        <div className="sunken-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--phosphor)', fontWeight: 'bold' }}>MECHANICAL CLICK SOUNDS</div>
            <div style={{ fontSize: '9px', color: 'var(--phosphor-dark)', marginTop: '2px' }}>Simulates mechanical key switches &amp; floppy drive motors</div>
          </div>
          <button
            className={`retro-btn ${soundEnabled ? '' : 'retro-btn-amber'}`}
            onClick={onSoundToggle}
            style={{ flexShrink: 0, marginLeft: '12px' }}
          >
            {soundEnabled ? '[ ENABLED ]' : '[ DISABLED ]'}
          </button>
        </div>
      </div>

      {/* Section: System Specs — two-column readable table */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <div style={{
          fontSize: '9px',
          color: 'var(--phosphor-dim)',
          letterSpacing: '2px',
          marginBottom: '6px',
          borderLeft: '2px solid var(--bevel-mid)',
          paddingLeft: '6px',
        }}>
          SYSTEM SPECIFICATIONS:
        </div>
        <div className="sunken-panel" style={{ padding: '8px 10px' }}>
          {SYSINFO.map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '8px',
                padding: '3px 0',
                borderBottom: '1px solid var(--bevel-dark)',
                fontSize: '10px',
              }}
            >
              <span style={{ color: 'var(--phosphor-dim)', letterSpacing: '0.5px' }}>{key}</span>
              <span style={{ color: 'var(--phosphor)', fontWeight: 'bold' }}>{val}</span>
            </div>
          ))}
          <div style={{ marginTop: '8px', fontSize: '9px', color: 'var(--bevel-mid)', letterSpacing: '1px' }}>
            STATUS: ALL SYSTEMS NOMINAL · TUBE INTEGRITY 100%
          </div>
        </div>
      </div>

    </div>
  );
};

export default DisplayCfgApp;
