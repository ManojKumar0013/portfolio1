import { useState } from 'react';
import SectionHead from './SectionHead';
import { SKILLS } from '../data';

const slug = (name) => name.toLowerCase().replace(/\+/g, 'p').replace(/[^a-z0-9]+/g, '-');
const DESCRIPTIONS = {
  HTML: 'The structure behind fast, accessible web experiences.',
  CSS: 'Layouts, motion and details that make interfaces feel considered.',
  JavaScript: 'Interactive behavior and the logic behind the browser.',
  React: 'Component-driven interfaces with thoughtful state and flow.',
  'Next.js': 'Exploring modern React application architecture.',
  'Tailwind CSS': 'Building responsive interfaces with utility-first styling.',
  Express: 'APIs that connect the interface to business logic and data.',
  Flask: 'Lightweight Python services for practical experiments.',
  SQL: 'Turning questions into reliable queries and relationships.',
  PostgreSQL: 'Relational data for projects such as HungryHub.',
  MongoDB: 'Flexible document storage for application data.',
  Supabase: 'Exploring hosted database and backend workflows.',
  Git: 'Versioning work and collaborating with confidence.',
  'VS Code': 'The everyday workspace for building and debugging.',
  Python: 'Problem solving, automation and AI experiments.',
  Java: 'Object-oriented programming and strong fundamentals.',
  C: 'Understanding software closer to the machine.',
  'C++': 'Algorithms, performance and systems thinking.',
};
const COLORS = { Web: '#79d4e5', Backend: '#b9a2fa', Databases: '#7bdcba', Tools: '#f3bd87', Languages: '#a3b4ff' };

function Group({ group, items, active, setActive }) {
  return <div className="stack-group">
    <div className="stack-group-head"><span className="mono">{group}</span><span className="mono">{String(items.length).padStart(2, '0')}</span></div>
    <div className="stack-icons">
      {items.map((skill) => <button key={skill.name} type="button" className={`stack-icon ${active?.name === skill.name ? 'selected' : ''}`}
        onMouseEnter={() => setActive({ ...skill, group })} onMouseLeave={() => setActive(null)}
        onFocus={() => setActive({ ...skill, group })} onBlur={() => setActive(null)} onClick={() => setActive({ ...skill, group })}
        aria-label={`Show ${skill.name}`} aria-pressed={active?.name === skill.name} title={skill.name} data-testid={`skill-chip-${slug(skill.name)}`}>
        <img src={skill.icon} alt="" width="36" height="36" loading="lazy" />
      </button>)}
    </div>
  </div>;
}

export default function Skills() {
  const [active, setActive] = useState(null);
  const left = SKILLS.filter((g) => ['Web', 'Languages'].includes(g.group));
  const right = SKILLS.filter((g) => ['Backend', 'Databases', 'Tools'].includes(g.group));
  return <section id="skills" className="section skills" data-testid="skills-section">
    <SectionHead idx="03" path="ls /usr/bin/skills" title="Skills" id="skills" />
    <p className="stack-intro rv">Explore the tools I use and the fundamentals I am building. Hover, tap or focus an icon to see it up close.</p>
    <div className="stack-atlas rv" data-testid="skills-playground">
      <div className="stack-side stack-left">{left.map((g) => <Group key={g.group} {...g} active={active} setActive={setActive} />)}</div>
      <div className={`stack-feature ${active ? 'has-skill' : 'is-idle'}`} aria-live="polite" style={{ '--feature-color': active ? COLORS[active.group] : '#a99be8' }}>
        <span className="mono stack-overline">{active ? `CURRENT SELECTION / ${active.group}` : 'THE STACK / EXPLORE'}</span>
        <div className="stack-orbit"><span className="stack-orbit-ring" /><img className="stack-hat" src="/icons/hat.svg" alt="" width="170" height="105" />{active ? <img className="stack-mark" key={active.name} src={active.icon} alt="" width="150" height="150" /> : <span className="stack-question display" aria-hidden="true">?</span>}</div>
        <div className="stack-feature-copy">{active ? <><span className="mono">{active.group} / {String(SKILLS.flatMap((g) => g.items).findIndex((s) => s.name === active.name) + 1).padStart(2, '0')}</span><h3 className="display">{active.name}</h3><p>{DESCRIPTIONS[active.name]}</p></> : <><span className="mono">NO SKILL SELECTED</span><h3 className="display">PICK A SKILL</h3><p>Hover, tap or use your keyboard to discover what I build with.</p></>}</div>
      </div>
      <div className="stack-side stack-right">{right.map((g) => <Group key={g.group} {...g} active={active} setActive={setActive} />)}</div>
    </div>
  </section>;
}
