import SectionHead from './SectionHead';
import { FOCUS } from '../data';

export default function Focus() {
  return (
    <section id="focus" className="section focus" data-testid="focus-section">
      <SectionHead idx="02" path="ls ~/focus" title="Interests & Focus" id="focus" />
      <ul className="focus-list">
        {FOCUS.map((f, i) => (
          <li key={f.title} className="focus-row rv" style={{ '--d': `${i * 80}ms` }} data-testid={`focus-row-${i}`}>
            <span className="mono num">0{i + 1}</span>
            <h3 className="display ft">{f.title}</h3>
            <p className="focus-text">{f.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
