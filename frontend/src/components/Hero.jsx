import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { usePrefs, useMedia } from '../hooks';
import { ROLES } from '../data';

function DotGrid() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const gap = 30;
    let w, h, mx = -999, my = -999, raf = 0, visible = true;
    const color = () => getComputedStyle(document.documentElement);
    let fg, ac;
    const size = () => {
      w = c.offsetWidth; h = c.offsetHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const s = color(); fg = s.getPropertyValue('--dot').trim(); ac = s.getPropertyValue('--accent').trim();
      draw();
    };
    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = x - mx, dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          const k = Math.max(0, 1 - d / 160);
          const px = x - dx * k * 0.25, py = y - dy * k * 0.25;
          ctx.fillStyle = k > 0.05 ? ac : fg;
          ctx.globalAlpha = k > 0.05 ? 0.35 + k * 0.65 : 1;
          ctx.beginPath();
          ctx.arc(px, py, 1 + k * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    const move = (e) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    const mo = new MutationObserver(size);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    size();
    addEventListener('resize', size);
    addEventListener('pointermove', move, { passive: true });
    return () => {
      removeEventListener('resize', size); removeEventListener('pointermove', move);
      io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} className="dotgrid" aria-hidden="true" />;
}

const Letters = ({ word, offset = 0 }) => (
  <span className="word" aria-hidden="true">
    {word.split('').map((ch, i) => <span key={i} className="ch" style={{ '--d': `${(i + offset) * 55}ms` }}>{ch}</span>)}
  </span>
);

export default function Hero({ ready }) {
  const { calm } = usePrefs();
  const rich = useMedia('(pointer: fine) and (min-width: 900px)');
  const strip = Array(4).fill(ROLES).flat();

  return (
    <section id="top" className={`hero ${ready ? 'go' : ''}`} data-testid="hero-section">
      {rich && !calm ? <DotGrid /> : <div className="dotgrid static" aria-hidden="true" />}
      <div className="hero-meta mono">
        <span className="chip" data-testid="hero-status-chip"><i className="pulse" /> BTech CSE '29</span>
        <span className="hide-sm">Amrita Vishwa Vidyapeetham · Amritapuri</span>
        <span>[ portfolio / 2026 ]</span>
      </div>

      <h1 className="hero-name display" aria-label="Manoj Kumar">
        <Letters word="MANOJ" />
        <span className="role-strip" aria-hidden="true">
          <span className="role-track">
            {strip.map((r, i) => <span key={i}>{r}<b>•</b></span>)}
          </span>
        </span>
        <Letters word="KUMAR" offset={5} />
      </h1>
      <p className="sr-only" data-testid="hero-roles">{ROLES.join(' • ')}</p>

      <div className="hero-bottom">
        <p className="tagline" data-testid="hero-tagline">
          I want to understand <em>how systems work inside</em> — and build software that is efficient and secure.
        </p>
        <a href="#about" className="scroll-cue mono" data-testid="hero-scroll-cue">
          <ArrowDown size={14} /> scroll to boot sequence
        </a>
      </div>
    </section>
  );
}
