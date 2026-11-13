// Generative ambient pad + soft bells, synthesized with Web Audio (no file download).
const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 261.63, 329.63, 392.0],
  [174.61, 220.0, 261.63, 329.63],
  [196.0, 246.94, 293.66, 392.0],
];
const BELLS = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

let ctx = null, master = null, timers = [];

function voice(freq, start, dur, gainVal, type, out) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.detune.value = (Math.random() - 0.5) * 8;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gainVal, start + dur * 0.35);
  g.gain.linearRampToValueAtTime(0, start + dur);
  o.connect(g).connect(out);
  o.start(start);
  o.stop(start + dur + 0.1);
}

function bell(out) {
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = BELLS[Math.floor(Math.random() * BELLS.length)];
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 3.1);
}

export function startMusic() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 3);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 1400;
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.42;
  const fb = ctx.createGain();
  fb.gain.value = 0.35;
  lp.connect(master);
  lp.connect(delay);
  delay.connect(fb).connect(delay);
  delay.connect(master);
  master.connect(ctx.destination);

  let i = 0;
  const playChord = () => {
    const t = ctx.currentTime + 0.05;
    CHORDS[i % CHORDS.length].forEach((f) => {
      voice(f / 2, t, 7.5, 0.035, 'sine', lp);
      voice(f, t, 7.5, 0.018, 'triangle', lp);
    });
    i++;
  };
  playChord();
  timers.push(setInterval(playChord, 6500));
  const ring = () => {
    if (!ctx) return;
    bell(lp);
    timers.push(setTimeout(ring, 1800 + Math.random() * 2600));
  };
  timers.push(setTimeout(ring, 1500));
}

export function stopMusic() {
  if (!ctx) return;
  timers.forEach((t) => { clearInterval(t); clearTimeout(t); });
  timers = [];
  const c = ctx;
  master.gain.cancelScheduledValues(c.currentTime);
  master.gain.setValueAtTime(master.gain.value, c.currentTime);
  master.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
  ctx = null;
  setTimeout(() => c.close(), 800);
}
