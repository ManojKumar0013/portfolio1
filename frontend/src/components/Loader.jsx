import { useEffect, useRef, useState } from 'react';
import { usePrefs } from '../hooks';

const LOGS = [
  'mounting /home/manoj ............ ok',
  'loading kernel: curiosity.ko ..... ok',
  'starting dsa.service ............. ok',
  'probing /dev/security ............ ok',
  'init ml-runtime .................. ok',
  'boot complete — welcome',
];

export default function Loader({ onDone }) {
  const { calm } = usePrefs();
  const repeat = useRef(localStorage.getItem('mk-booted') === '1').current;
  const duration = calm ? 600 : repeat ? 400 : 2000;
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState('run');
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    localStorage.setItem('mk-booted', '1');
    setN(100);
    setPhase('open');
    setTimeout(onDone, calm ? 250 : 600);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 100);
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e) => { if (e.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const shown = Math.min(LOGS.length, Math.floor((n / 100) * LOGS.length) + 1);

  return (
    <div className={`loader ${phase}`} data-testid="boot-loader" role="status" aria-live="polite" aria-label={`Loading ${n} percent`}>
      <div className="loader-panel top" />
      <div className="loader-panel bottom" />
      <div className="loader-inner" style={{ '--dur': `${duration}ms` }}>
        <div className="loader-head mono">
          <span>MK-OS v1.0 — tty0</span>
          <button className="skip-btn" data-testid="loader-skip-btn" onClick={finish}>Skip ↵</button>
        </div>
        <svg className="signature" viewBox="0 0 900 220" aria-hidden="true">
          <text x="10" y="140" className="sig-bracket">&lt;</text>
          <text x="95" y="150" className="sig-name">Manoj Kumar</text>
          <text x="760" y="140" className="sig-bracket">/&gt;</text>
        </svg>
        <div className="loader-foot">
          <ul className="boot-log mono" data-testid="boot-log">
            {LOGS.slice(0, shown).map((l) => <li key={l}><span className="ok">[ ✓ ]</span> {l}</li>)}
          </ul>
          <div className="counter display" data-testid="loader-counter">
            {String(n).padStart(3, '0')}<span>%</span>
          </div>
        </div>
        <div className="loader-bar"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
      </div>
    </div>
  );
}
