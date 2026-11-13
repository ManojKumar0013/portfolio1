import { ArrowUpRight } from 'lucide-react';
import SectionHead from './SectionHead';
import { EDUCATION } from '../data';

export default function Education() {
  return (
    <section id="education" className="section edu" data-testid="education-section">
      <SectionHead idx="03" path="git log --education" title="Education" id="education" />
      <ol className="commits">
        {EDUCATION.map((e, i) => (
          <li key={e.hash} className="commit rv" style={{ '--d': `${i * 100}ms` }} data-testid={`edu-commit-${i}`}>
            <span className="node" aria-hidden="true" />
            <div className="mono commit-meta">
              <span className="hash">commit {e.hash}</span>
              {e.head && <span className="headref">(HEAD → main)</span>}
              <span className="yrs">{e.years}</span>
            </div>
            <h3 className="display commit-title">{e.title}</h3>
            <a className="commit-place" href={e.map} target="_blank" rel="noopener noreferrer" data-testid={`edu-map-link-${i}`}>
              {e.place} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
