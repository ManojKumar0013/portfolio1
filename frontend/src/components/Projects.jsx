import { ArrowUpRight } from 'lucide-react';
import { Github } from './BrandIcons';
import SectionHead from './SectionHead';
import { PROJECTS, PROFILE } from '../data';

function LiveCard({ p, i }) {
  return (
    <article className="proj live rv" data-testid={`project-card-${p.id}`}>
      <a className="proj-img" href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Open live preview of ${p.title}`}>
        <img src={p.image} alt={`${p.title} preview`} width="1200" height="630" loading="lazy" decoding="async" />
      </a>
      <div className="proj-info">
        <span className="mono proj-idx">PID {String(i + 1).padStart(3, '0')} · running</span>
        <h3 className="display">{p.title}</h3>
        <p>{p.blurb}</p>
        <ul className="tags mono">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="proj-links">
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn solid" data-testid={`project-live-link-${p.id}`}>Live preview <ArrowUpRight size={14} /></a>
          <a href={p.source} target="_blank" rel="noopener noreferrer" className="btn" data-testid={`project-source-link-${p.id}`}>Source code <Github size={14} /></a>
        </div>
      </div>
    </article>
  );
}

function SoonCard({ p, i }) {
  return (
    <article className="proj soon rv" style={{ '--d': `${i * 80}ms` }} data-testid={`project-card-${p.id}`}>
      <span className="mono proj-idx">PID {String(i + 1).padStart(3, '0')} · queued</span>
      <h3 className="display">Coming soon</h3>
      <p className="mono">// slot reserved for the next build</p>
      <span className="soon-bar" aria-hidden="true"><i /></span>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects" data-testid="projects-section">
      <SectionHead idx="04" path="ps aux ~/projects" title="Projects" id="projects" />
      <div className="proj-grid">
        {PROJECTS.map((p, i) => (p.status === 'live' ? <LiveCard key={p.id} p={p} i={i} /> : <SoonCard key={p.id} p={p} i={i} />))}
      </div>
      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="more-gh display rv" data-testid="projects-more-github-link">
        More on GitHub <ArrowUpRight size={32} aria-hidden="true" />
      </a>
    </section>
  );
}
