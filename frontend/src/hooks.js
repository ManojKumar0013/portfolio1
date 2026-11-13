import { createContext, useContext, useEffect, useState } from 'react';
import { startMusic, stopMusic } from './audio';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>_01';

export const Prefs = createContext(null);
export const usePrefs = () => useContext(Prefs);

export function usePrefsState() {
  const root = document.documentElement;
  const [theme, setTheme] = useState(root.dataset.theme || 'dark');
  const [calm, setCalm] = useState(root.dataset.calm === 'on');
  useEffect(() => {
    root.dataset.theme = theme;
    localStorage.setItem('mk-theme', theme);
  }, [theme]);
  useEffect(() => {
    root.dataset.calm = calm ? 'on' : 'off';
    localStorage.setItem('mk-calm', calm ? '1' : '0');
  }, [calm]);
  const [music, setMusic] = useState(localStorage.getItem('mk-music') !== '0');
  useEffect(() => {
    localStorage.setItem('mk-music', music ? '1' : '0');
    if (!music) { stopMusic(); return; }
    const go = () => startMusic();
    go();
    window.addEventListener('pointerdown', go, { once: true });
    window.addEventListener('keydown', go, { once: true });
    return () => {
      window.removeEventListener('pointerdown', go);
      window.removeEventListener('keydown', go);
    };
  }, [music]);
  return {
    theme, calm, music,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    toggleCalm: () => { setCalm((c) => !c); window.scrollTo(0, 0); },
    toggleMusic: () => setMusic((m) => !m),
  };
}

export function useScramble(text, run, calm) {
  const [out, setOut] = useState(calm ? text : text.replace(/\S/g, '_'));
  useEffect(() => {
    if (!run) return;
    if (calm) { setOut(text); return; }
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      setOut(text.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        return frame / total > i / text.length ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      if (frame >= total) { clearInterval(id); setOut(text); }
    }, 38);
    return () => clearInterval(id);
  }, [run, calm, text]);
  return out;
}

export function useMedia(query) {
  const [m, setM] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const fn = () => setM(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);
  return m;
}

export function useReveal(active) {
  useEffect(() => {
    if (!active) return;
    const els = document.querySelectorAll('.rv:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);
}
