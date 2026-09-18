// Web Audio API Retro Sound Engine — zero dependencies
let audioCtx: AudioContext | null = null;
let crtHumNode: OscillatorNode | null = null;
let crtGainNode: GainNode | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Mechanical keyboard click sound
export function playClick(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Short mechanical click with pitch drop
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.035);
  } catch (_) {}
}

// Floppy drive motor / seeking sound on window open
export function playFloppySeek(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    
    // Series of 3 quick drive head steps
    [0, 0.04, 0.08].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140 + Math.random() * 60, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + delay + 0.025);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.03);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.03);
    });
  } catch (_) {}
}

// Window close latch sound
export function playClose(enabled: boolean) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.065);
  } catch (_) {}
}

// Retro Game Beep (for Snake / Synth)
export function playBeep(freq: number = 440, duration: number = 0.08, type: OscillatorType = 'square', enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
}

// Game over buzz sound
export function playGameOver(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.38);
  } catch (_) {}
}

// CRT hum background toggle
export function toggleCrtHum(enable: boolean) {
  try {
    const ctx = getAudioCtx();
    if (enable) {
      if (!crtHumNode) {
        crtHumNode = ctx.createOscillator();
        crtGainNode = ctx.createGain();

        crtHumNode.type = 'sine';
        crtHumNode.frequency.setValueAtTime(60, ctx.currentTime); // 60Hz CRT hum

        crtGainNode.gain.setValueAtTime(0.015, ctx.currentTime);
        crtHumNode.connect(crtGainNode);
        crtGainNode.connect(ctx.destination);
        crtHumNode.start();
      }
    } else {
      if (crtHumNode) {
        crtHumNode.stop();
        crtHumNode.disconnect();
        crtHumNode = null;
        crtGainNode = null;
      }
    }
  } catch (_) {}
}

// S.H.I.E.L.D. Clearance Access Granted Chime
export function playAccessGranted(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
    chords.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35);

      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.35);
    });
  } catch (_) {}
}

// S.H.I.E.L.D. Clearance Access Denied Alert Buzzer
export function playAccessDenied(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioCtx();
    [0, 0.14].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime + delay);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + delay + 0.1);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.12);
    });
  } catch (_) {}
}
