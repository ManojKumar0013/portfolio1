import SectionHead from './SectionHead';

const LINES = [
  <>I am <strong>Manoj Kumar</strong>, a BTech Computer Science and Engineering student at <strong>Amrita Vishwa Vidyapeetham, Amritapuri Campus</strong>.</>,
  <>I am deeply interested in understanding <mark>how systems work internally</mark> and how to build efficient and secure software solutions.</>,
  <>My goal is to become a top-level software engineer by mastering core subjects like <mark>Data Structures</mark>, <mark>Operating Systems</mark>, and <mark>Computer Networks</mark>.</>,
  <>I consistently focus on improving my problem-solving ability, logical thinking, and coding skills.</>,
];

const PROC = [
  ['user', 'manoj'],
  ['role', 'cse_student'],
  ['campus', 'amritapuri'],
  ['state', 'R (running)'],
  ['nice', '-20 (max priority: learning)'],
];

export default function About() {
  return (
    <section id="about" className="section about" data-testid="about-section">
      <SectionHead idx="01" path="cat /proc/manoj" title="About" id="about" />
      <div className="about-grid">
        <figure className="portrait rv" data-testid="about-portrait">
          <img src="/photo.webp" alt="Portrait of Manoj Kumar" width="452" height="532" loading="lazy" decoding="async" />
          <figcaption className="mono">
            {PROC.map(([k, v]) => <span key={k}><b>{k}</b>{v}</span>)}
          </figcaption>
        </figure>
        <div className="about-text">
          {LINES.map((l, i) => (
            <p key={i} className="rv line" style={{ '--d': `${i * 90}ms` }} data-testid={`about-line-${i}`}>
              <span className="mono ln">{String(i + 1).padStart(2, '0')}</span>{l}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
