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
    <div className="h-full flex flex-col p-2.5 sm:p-3 font-mono bg-void select-none overflow-hidden justify-between">
      {/* Header */}
      <div className="pb-1.5 mb-2 border-b border-dim-color flex justify-between items-center">
        <div>
          <div className="font-vt323 text-xl sm:text-2xl text-p text-glow leading-none">
            SYNTH.EXE
          </div>
          <div className="text-[10px] sm:text-xs text-p-dim mt-0.5">
            8-Bit Chiptune Sound Lab
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-amber font-mono">
          [v1.0]
        </div>
      </div>

      {/* Waveform Selector */}
      <div className="mb-2 flex items-center justify-between gap-1 bg-window p-1.5 border border-dim-color">
        <span className="text-[10px] sm:text-xs text-p font-bold hidden xs:inline">WAVE:</span>
        <div className="grid grid-cols-4 gap-1 w-full xs:w-auto">
          {(['square', 'sawtooth', 'triangle', 'sine'] as OscillatorType[]).map(type => (
            <button
              key={type}
              className={`retro-btn text-[9px] sm:text-xs px-1.5 sm:px-2.5 py-1 ${waveType === type ? 'retro-btn-amber' : ''}`}
              onClick={() => setWaveType(type)}
            >
              {type === 'square' ? 'SQR' : type === 'sawtooth' ? 'SAW' : type === 'triangle' ? 'TRI' : 'SIN'}
            </button>
          ))}
        </div>
      </div>

      {/* Visualizer Display */}
      <div className="flex-1 min-h-[100px] sm:min-h-[140px] border border-dim-color bg-window-dark p-2.5 flex flex-col items-center justify-center mb-2 relative overflow-hidden">
        <div className="text-[9px] sm:text-xs text-p-dim mb-1">OSCILLATOR VISUALIZER</div>

        {/* Animated Spectrum Bars */}
        <div className="flex items-end gap-1 sm:gap-1.5 h-16 sm:h-24 w-full justify-center px-1">
          {NOTES.map((note, i) => {
            const isActive = activeNote === note.label;
            const barHeight = isActive ? 95 : Math.floor(20 + Math.sin(i * 1.2) * 15);
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

        <div className="mt-1.5 text-[10px] sm:text-xs text-p">
          ACTIVE NOTE: {activeNote ? <strong className="text-amber">{activeNote}</strong> : '--'}
        </div>
      </div>

      {/* Keyboard Keys — 8 Piano Key Tiles */}
      <div className="grid grid-cols-8 gap-1 sm:gap-1.5">
        {NOTES.map(note => (
          <button
            key={note.label}
            className={`py-3 sm:py-4 px-0.5 border flex flex-col items-center justify-between transition-all rounded-sm active:scale-95 ${
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
