import { useEffect, useRef } from 'react';
import { usePrefs, useMedia } from '../hooks';

export default function Cursor() {
  const { calm } = usePrefs();
  const fine = useMedia('(pointer: fine)');
  const dot = useRef(null);
  const ring = useRef(null);
  const on = fine && !calm;

  useEffect(() => {
    document.documentElement.classList.toggle('has-cursor', on);
    if (!on) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const hot = e.target.closest?.('a, button, .chip-drag, input, textarea, label');
      ring.current.classList.toggle('hot', !!hot);
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, [on]);

  if (!on) return null;
  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true" />
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
