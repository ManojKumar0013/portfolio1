import { useRef } from 'react';
import SectionHead from './SectionHead';
import { SKILLS } from '../data';
import { usePrefs, useMedia } from '../hooks';

const SPOTS = [[6, 14], [26, 52], [44, 10], [62, 48], [12, 66], [38, 74], [70, 16], [82, 64]];

function Chip({ label, group, spot }) {
  const ref = useRef(null);
  const st = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const down = (e) => {
    const s = st.current;
    s.sx = e.clientX - s.x; s.sy = e.clientY - s.y;
    ref.current.setPointerCapture(e.pointerId);
    ref.current.classList.add('drag');
  };
  const move = (e) => {
    if (!ref.current.hasPointerCapture(e.pointerId)) return;
    const s = st.current;
    s.x = e.clientX - s.sx; s.y = e.clientY - s.sy;
    ref.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.x * 0.02}deg)`;
  };
  const up = () => ref.current.classList.remove('drag');
  return (
    <div ref={ref} className="chip-drag" style={{ left: `${spot[0]}%`, top: `${spot[1]}%` }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      data-testid={`skill-chip-${label.toLowerCase().replace(/\+/g, 'p')}`}>
      <span className="mono g">{group}</span>{label}
    </div>
  );
}

export default function Skills() {
  const { calm } = usePrefs();
  const rich = useMedia('(pointer: fine) and (min-width: 900px)');
  const flat = SKILLS.flatMap((s) => s.items.map((it) => ({ label: it, group: s.group })));

  return (
    <section id="skills" className="section skills" data-testid="skills-section">
      <SectionHead idx="04" path="ls /usr/bin/skills" title="Skills" id="skills" />
      {rich && !calm ? (
        <div className="playground" data-testid="skills-playground">
          <span className="mono hint">drag the chips around ↘</span>
          {flat.map((s, i) => <Chip key={s.label} {...s} spot={SPOTS[i]} />)}
          <ul className="sr-only">{flat.map((s) => <li key={s.label}>{s.group}: {s.label}</li>)}</ul>
        </div>
      ) : (
        <div className="skill-grid" data-testid="skills-grid">
          {SKILLS.map((g) => (
            <div key={g.group} className="skill-col">
              <h3 className="mono">{g.group}</h3>
              <ul>{g.items.map((it) => <li key={it} className="display" data-testid={`skill-item-${it.toLowerCase().replace(/\+/g, 'p')}`}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
