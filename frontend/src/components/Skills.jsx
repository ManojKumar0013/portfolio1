import { useRef } from 'react';
import SectionHead from './SectionHead';
import { SKILLS } from '../data';

const slug = (n) => n.toLowerCase().replace(/\+/g, 'p');

function Chip({ name, icon, group }) {
  const drag = useRef({ x: 0, y: 0, pointerId: null });

  const updateBounds = (chip) => {
    const area = chip.closest('.playground').getBoundingClientRect();
    const rect = chip.getBoundingClientRect();
    const state = drag.current;
    state.minX = state.x + area.left + 8 - rect.left;
    state.maxX = state.x + area.right - 8 - rect.right;
    state.minY = state.y + area.top + 8 - rect.top;
    state.maxY = state.y + area.bottom - 8 - rect.bottom;
  };

  const position = (chip, x, y) => {
    const state = drag.current;
    state.x = Math.min(Math.max(x, state.minX), state.maxX);
    state.y = Math.min(Math.max(y, state.minY), state.maxY);
    chip.style.transform = `translate(${state.x}px, ${state.y}px)`;
  };

  const down = (e) => {
    const state = drag.current;
    if (e.button !== 0 || state.pointerId !== null) return;
    const chip = e.currentTarget;
    state.pointerId = e.pointerId;
    chip.setPointerCapture(e.pointerId);
    chip.classList.add('drag');
    updateBounds(chip);
    position(chip, state.x, state.y);
    state.startX = e.clientX - state.x;
    state.startY = e.clientY - state.y;
  };

  const move = (e) => {
    const state = drag.current;
    if (e.pointerId !== state.pointerId) return;
    position(e.currentTarget, e.clientX - state.startX, e.clientY - state.startY);
  };

  const up = (e) => {
    const state = drag.current;
    if (e.pointerId !== state.pointerId) return;
    state.pointerId = null;
    const chip = e.currentTarget;
    chip.classList.remove('drag');
    updateBounds(chip);
    position(chip, state.x, state.y);
  };

  return (
    <li className="chip-drag" onPointerDown={down} onPointerMove={move}
      onPointerUp={up} onPointerCancel={up} onLostPointerCapture={up}
      data-testid={`skill-chip-${slug(name)}`}>
      <img className="logo" src={icon} alt="" width="56" height="56" draggable="false" loading="lazy" />
      <span className="mono g">{group}</span>
      <span className="nm">{name}</span>
    </li>
  );
}

export default function Skills() {
  const flat = SKILLS.flatMap(({ group, items }) => items.map((skill) => ({ ...skill, group })));

  return (
    <section id="skills" className="section skills" data-testid="skills-section">
      <SectionHead idx="03" path="ls /usr/bin/skills" title="Skills" id="skills" />
      <div className="playground" data-testid="skills-playground">
        <ul className="skill-chips">
          {flat.map((skill) => <Chip key={skill.name} {...skill} />)}
        </ul>
        <span className="mono hint">Drag a skill ↘</span>
      </div>
    </section>
  );
}
