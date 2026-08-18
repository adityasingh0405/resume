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

const SynthApp: React.FC<{ soundEnabled: boolean }> = ({ soundEnabled }) => {
  const [waveType, setWaveType] = useState<OscillatorType>('square');
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const triggerNote = (note: Note) => {
    setActiveNote(note.label);
    playBeep(note.freq, 0.2, waveType, true);
    setTimeout(() => setActiveNote(null), 200);
  };

  return (
    <div className="h-full flex flex-col p-3 font-mono bg-void select-none overflow-y-auto">
      {/* Header */}
      <div className="pb-2 mb-3 border-b border-dim-color flex justify-between items-center flex-wrap gap-1">
        <div>
          <div className="font-vt323 text-2xl text-p text-glow">SYNTH.EXE — 8-BIT SOUND LAB</div>
          <div className="text-xs text-p-dim">Interactive Retro Oscillator & Synthesizer</div>
        </div>
        <div className="text-xs text-amber font-mono">[CHIPTUNE v1.0]</div>
      </div>

      {/* Waveform Selector */}
      <div className="mb-3 flex flex-wrap items-center gap-2 bg-window p-2 border border-dim-color">
        <span className="text-xs text-p">WAVEFORM:</span>
        {(['square', 'sawtooth', 'triangle', 'sine'] as OscillatorType[]).map(type => (
          <button
            key={type}
            className={`retro-btn text-xs ${waveType === type ? 'retro-btn-amber' : ''}`}
            onClick={() => setWaveType(type)}
          >
            [{type.toUpperCase()}]
          </button>
        ))}
      </div>

      {/* Visualizer Display */}
      <div className="flex-1 min-h-[140px] border border-dim-color bg-window-dark p-3 flex flex-col items-center justify-center mb-3 relative overflow-hidden">
        <div className="text-xs text-p-dim mb-2">OSCILLATOR VISUALIZER</div>
        
        {/* Animated Spectrum Bars */}
        <div className="flex items-end gap-1.5 h-20 w-full justify-center px-2">
          {NOTES.map((note, i) => {
            const isActive = activeNote === note.label;
            const barHeight = isActive ? 90 : Math.floor(20 + Math.sin(i * 1.2) * 15);
            return (
              <div
                key={note.label}
                className="flex-1 max-w-[28px] transition-all duration-75"
                style={{
                  height: `${barHeight}%`,
                  background: isActive ? 'var(--amber)' : 'var(--border-bright)',
                  boxShadow: isActive ? '0 0 10px var(--amber)' : 'var(--glow-soft)',
                }}
              />
            );
          })}
        </div>

        <div className="mt-2 text-xs text-p">
          ACTIVE NOTE: {activeNote ? <strong className="text-amber">{activeNote}</strong> : '--'}
        </div>
      </div>

      {/* Keyboard Keys (4 columns on mobile, 8 on desktop) */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
        {NOTES.map(note => (
          <button
            key={note.label}
            className={`p-2.5 sm:p-3 border flex flex-col items-center justify-center transition-all ${
              activeNote === note.label
                ? 'bg-amber text-void border-amber shadow-glow-amber'
                : 'bg-window text-p border-dim-color hover:border-p'
            }`}
            onClick={() => triggerNote(note)}
          >
            <span className="font-vt323 text-lg font-bold">{note.label}</span>
            <span className="text-[9px] opacity-60">[{note.key}]</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SynthApp;
