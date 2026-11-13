import { useRef } from 'react';
import SectionHead from './SectionHead';
import { SKILLS } from '../data';
import { useMedia } from '../hooks';

const SPOTS = [[6, 14], [26, 52], [44, 10], [62, 48], [12, 66], [38, 74], [70, 16], [82, 64]];
const SPOTS_SM = [[4, 4], [52, 8], [8, 26], [50, 32], [4, 52], [56, 56], [10, 78], [52, 80]];

const slug = (n) => n.toLowerCase().replace(/\+/g, 'p');

function Chip({ name, icon, group, spot }) {
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
      data-testid={`skill-chip-${slug(name)}`}>
      <img className="logo" src={icon} alt="" width="56" height="56" draggable="false" />
      <span className="mono g">{group}</span>
      <span className="nm">{name}</span>
    </div>
  );
}

export default function Skills() {
  const small = useMedia('(max-width: 640px)');
  const flat = SKILLS.flatMap((s) => s.items.map((it) => ({ ...it, group: s.group })));
  const spots = small ? SPOTS_SM : SPOTS;

  return (
    <section id="skills" className="section skills" data-testid="skills-section">
      <SectionHead idx="04" path="ls /usr/bin/skills" title="Skills" id="skills" />
      <div className="playground" data-testid="skills-playground">
        <span className="mono hint">touch & drag a skill ↘</span>
        {flat.map((s, i) => <Chip key={s.name} {...s} spot={spots[i]} />)}
        <ul className="sr-only">{flat.map((s) => <li key={s.name}>{s.group}: {s.name}</li>)}</ul>
      </div>
    </section>
  );
}
