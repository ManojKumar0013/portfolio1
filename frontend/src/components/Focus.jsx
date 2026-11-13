import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHead from './SectionHead';
import { FOCUS } from '../data';

export default function Focus() {
  const [open, setOpen] = useState(0);
  return (
    <section id="focus" className="section focus" data-testid="focus-section">
      <SectionHead idx="02" path="ls ~/focus" title="Interests & Focus" id="focus" />
      <ul className="focus-list">
        {FOCUS.map((f, i) => {
          const on = open === i;
          return (
            <li key={f.title} className={`focus-row rv ${on ? 'on' : ''}`} onMouseEnter={() => setOpen(i)}>
              <button aria-expanded={on} aria-controls={`focus-p-${i}`} onClick={() => setOpen(on ? -1 : i)} data-testid={`focus-row-${i}`}>
                <span className="mono num">0{i + 1}</span>
                <span className="display ft">{f.title}</span>
                <Plus className="plus" size={22} aria-hidden="true" />
              </button>
              <div className="focus-body" id={`focus-p-${i}`} role="region">
                <p>{f.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
