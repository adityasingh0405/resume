import React, { useState } from 'react';
import { playBeep } from './sound';

interface Note {
  label: string;
  key: string;
  freq: number;
}

const NOTES: Note[] = [
  { label: 'C4', key: 'A', freq: 261.63 },
  { label: 'D4', key: 'S', freq: 293.66 },
  { label: 'E4', key: 'D', freq: 329.63 },
  { label: 'F4', key: 'F', freq: 349.23 },
  { label: 'G4', key: 'G', freq: 392.00 },
  { label: 'A4', key: 'H', freq: 440.00 },
  { label: 'B4', key: 'J', freq: 493.88 },
  { label: 'C5', key: 'K', freq: 523.25 },
];

const SynthApp: React.FC<{ soundEnabled: boolean }> = () => {
  const [waveType, setWaveType] = useState<OscillatorType>('square');
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const triggerNote = (note: Note) => {
    setActiveNote(note.label);
    playBeep(note.freq, 0.2, waveType, true);
    setTimeout(() => setActiveNote(null), 200);
  };

  // Generate SVG path for the active waveform shape (Square, Sawtooth, Triangle, Sine)
  const renderWavePath = (wave: OscillatorType, active: boolean) => {
    const width = 360;
    const height = 64;
    const midY = height / 2;
    const amp = active ? 22 : 14;
    const freq = active ? 0.09 : 0.045;
    const points: string[] = [];

    for (let x = 0; x <= width; x += 2) {
      const t = x * freq;
      let y = midY;

      if (wave === 'square') {
        y = midY + (Math.sin(t) >= 0 ? -amp : amp);
      } else if (wave === 'sawtooth') {
        const phase = (t % (Math.PI * 2)) / (Math.PI * 2);
        y = midY + (phase - 0.5) * 2 * amp;
      } else if (wave === 'triangle') {
        const phase = (t % (Math.PI * 2)) / (Math.PI * 2);
        y = midY + (Math.abs(phase - 0.5) * 4 - 1) * amp;
      } else {
        // sine
        y = midY + Math.sin(t) * amp;
      }

      points.push(`${x},${y.toFixed(1)}`);
    }

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="h-full flex flex-col p-2.5 sm:p-3 font-mono bg-void select-none overflow-hidden justify-between">
      {/* Header */}
      <div className="pb-1.5 mb-2 border-b border-dim-color flex justify-between items-center">
        <div>
          <div className="font-vt323 text-xl sm:text-2xl text-p text-glow leading-none">
            SYNTH.EXE — 8-BIT SOUND LAB
          </div>
          <div className="text-[10px] sm:text-xs text-p-dim mt-0.5">
            Interactive Retro Oscillator & Synthesizer
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-amber font-mono">
          [CHIPTUNE v1.0]
        </div>
      </div>

      {/* Waveform Selector */}
      <div className="mb-2 flex items-center justify-between gap-1.5 bg-window p-1.5 border border-dim-color">
        <span className="text-[10px] sm:text-xs text-p font-bold">WAVEFORM:</span>
        <div className="grid grid-cols-4 gap-1 flex-1 max-w-[420px]">
          {(['square', 'sawtooth', 'triangle', 'sine'] as OscillatorType[]).map(type => (
            <button
              key={type}
              className={`retro-btn text-[9px] sm:text-xs px-1 sm:px-2 py-1 ${waveType === type ? 'retro-btn-amber font-bold' : ''}`}
              onClick={() => setWaveType(type)}
            >
              <span className="hidden sm:inline">[{type.toUpperCase()}]</span>
              <span className="sm:hidden">
                {type === 'square' ? '[SQR]' : type === 'sawtooth' ? '[SAW]' : type === 'triangle' ? '[TRI]' : '[SIN]'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Oscilloscope Visualizer Display */}
      <div className="flex-1 min-h-[110px] sm:min-h-[140px] border border-dim-color bg-window-dark p-2 flex flex-col items-center justify-between mb-2 relative overflow-hidden">
        <div className="flex justify-between items-center w-full text-[9px] sm:text-xs text-p-dim">
          <span>OSCILLATOR VISUALIZER</span>
          <span className="text-amber uppercase font-bold">MODE: {waveType}</span>
        </div>

        {/* Real-time Glowing Oscilloscope Wave */}
        <div className="w-full h-16 sm:h-20 flex items-center justify-center my-1 relative">
          <svg viewBox="0 0 360 64" className="w-full h-full preserve-3d overflow-visible">
            {/* Center grid line */}
            <line x1="0" y1="32" x2="360" y2="32" stroke="rgba(0,255,65,0.15)" strokeDasharray="4 4" />
            
            {/* Waveform Trace */}
            <path
              d={renderWavePath(waveType, !!activeNote)}
              fill="none"
              stroke={activeNote ? 'var(--amber)' : 'var(--phosphor)'}
              strokeWidth="2.5"
              style={{
                filter: activeNote
                  ? 'drop-shadow(0 0 8px var(--amber))'
                  : 'drop-shadow(0 0 5px var(--phosphor))',
                transition: 'd 0.15s ease',
              }}
            />
          </svg>
        </div>

        {/* Frequency Spectrum Bars */}
        <div className="flex items-end gap-1 h-8 w-full justify-center px-1">
          {NOTES.map((note, i) => {
            const isActive = activeNote === note.label;
            const barHeight = isActive ? 100 : Math.floor(25 + Math.sin(i * 1.4) * 18);
            return (
              <div
                key={note.label}
                className="flex-1 max-w-[24px] transition-all duration-75"
                style={{
                  height: `${barHeight}%`,
                  background: isActive ? 'var(--amber)' : 'var(--border-bright)',
                  boxShadow: isActive ? '0 0 10px var(--amber)' : 'var(--glow-soft)',
                }}
              />
            );
          })}
        </div>

        <div className="mt-1 text-[10px] sm:text-xs text-p">
          ACTIVE NOTE: {activeNote ? <strong className="text-amber">{activeNote}</strong> : '--'}
        </div>
      </div>

      {/* Keyboard Keys — 8 Piano Key Tiles */}
      <div className="grid grid-cols-8 gap-1 sm:gap-1.5">
        {NOTES.map(note => (
          <button
            key={note.label}
            className={`py-2.5 sm:py-3.5 px-0.5 border flex flex-col items-center justify-between transition-all rounded-sm active:scale-95 ${
              activeNote === note.label
                ? 'bg-amber text-void border-amber shadow-glow-amber'
                : 'bg-window text-p border-dim-color hover:border-p'
            }`}
            onClick={() => triggerNote(note)}
          >
            <span className="font-vt323 text-base sm:text-lg font-bold leading-none">{note.label}</span>
            <span className="text-[8px] sm:text-[9px] opacity-60 mt-1">[{note.key}]</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SynthApp;
