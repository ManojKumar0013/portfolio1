import { ArrowUpRight, Shield, Brain, Code2, Cpu, GraduationCap, MapPin, CalendarDays, Target } from 'lucide-react';
import { FOCUS, SKILLS, PROJECTS, PROFILE } from '../data';
import { CvButton } from './Header';
import { Github, Linkedin } from './BrandIcons';
import { ContactForm, EmailRow, PhoneRow } from './Contact';

const FOCUS_ICONS = [Shield, Brain, Code2, Cpu];
const CORE = ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks'];
const FACTS = [
  [GraduationCap, 'Degree', 'B.Tech Computer Science & Engineering'],
  [MapPin, 'Campus', 'Amrita Vishwa Vidyapeetham, Amritapuri'],
  [CalendarDays, 'Batch', '2025 — 2029'],
  [Target, 'Goal', 'Top-level software engineer'],
];

const Head = ({ title, sub }) => (
  <div className="rc-head">
    <h2 className="display">{title}</h2>
    {sub && <p className="mono">{sub}</p>}
  </div>
);

const Socials = ({ prefix }) => (
  <div className="info-row socials">
    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn brand linkedin" data-testid={`${prefix}-linkedin-link`}><Linkedin size={16} /> LinkedIn</a>
    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn brand github" data-testid={`${prefix}-github-link`}><Github size={16} /> GitHub</a>
  </div>
);

export function RcAbout() {
  return (
    <div className="rc" data-testid="rc-about">
      <Head title="About Me" sub="cat /proc/manoj" />
      <div className="rc-intro">
        <img src="/photo.webp" alt="Portrait of Manoj Kumar" width="452" height="532" />
        <div>
          <h3 className="display">Hey, I'm Manoj Kumar</h3>
          <p className="rc-roles mono">AI/ML • Full Stack • Cybersecurity • CSE Student</p>
          <p>I am a BTech Computer Science and Engineering student at <strong>Amrita Vishwa Vidyapeetham, Amritapuri Campus</strong>.</p>
          <p>I am deeply interested in understanding <mark>how systems work internally</mark> and how to build efficient and secure software solutions.</p>
          <p>I consistently focus on improving my problem-solving ability, logical thinking, and coding skills.</p>
        </div>
      </div>
      <ul className="rc-facts">
        {FACTS.map(([I, k, v]) => <li key={k}><I size={18} aria-hidden="true" /><span className="mono">{k}</span><strong>{v}</strong></li>)}
      </ul>
      <h4 className="rc-sub mono">Interests & Focus</h4>
      <div className="rc-focus">
        {FOCUS.map((f, i) => {
          const I = FOCUS_ICONS[i];
          return <div key={f.title} className="rc-card"><I size={20} aria-hidden="true" /><h5>{f.title}</h5><p>{f.text}</p></div>;
        })}
      </div>
      <div className="rc-cta"><CvButton testid="rc-cv-btn" /><Socials prefix="rc-about" /></div>
    </div>
  );
}

export function RcSkills() {
  return (
    <div className="rc" data-testid="rc-skills">
      <Head title="Skills" sub="ls /usr/bin/skills" />
      {SKILLS.map((g) => (
        <div key={g.group}>
          <h4 className="rc-sub mono">{g.group}</h4>
          <ul className="rc-tiles">
            {g.items.map((s) => <li key={s.name}><img src={s.icon} alt="" width="44" height="44" /><span>{s.name}</span></li>)}
          </ul>
        </div>
      ))}
      <h4 className="rc-sub mono">Core CS I'm mastering</h4>
      <ul className="rc-pills">{CORE.map((c) => <li key={c}>{c}</li>)}</ul>
      <h4 className="rc-sub mono">Currently exploring</h4>
      <ul className="rc-pills alt">
        <li>System vulnerabilities & ethical hacking</li>
        <li>Machine learning concepts</li>
        <li>Building secure applications</li>
      </ul>
    </div>
  );
}

export function RcProjects() {
  const live = PROJECTS.filter((p) => p.status === 'live');
  const soon = PROJECTS.length - live.length;
  return (
    <div className="rc" data-testid="rc-projects">
      <Head title="Projects" sub="ps aux ~/projects" />
      {live.map((p) => (
        <article key={p.id} className="rc-proj">
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="rc-proj-img" aria-label={`Open ${p.title}`}>
            <img src={p.image} alt={`${p.title} preview`} width="1200" height="630" loading="lazy" />
          </a>
          <div>
            <span className="mono rc-badge">Featured · Live</span>
            <h3 className="display">{p.title}</h3>
            <p>{p.blurb}</p>
            <ul className="rc-pills small">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="rc-cta">
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn solid" data-testid="rc-project-live-link">Live preview <ArrowUpRight size={14} /></a>
              <a href={p.source} target="_blank" rel="noopener noreferrer" className="btn" data-testid="rc-project-source-link"><Github size={14} /> Source code</a>
            </div>
          </div>
        </article>
      ))}
      <div className="rc-soon">
        {Array.from({ length: soon }, (_, i) => (
          <div key={i} className="rc-soon-card"><span className="mono">PID 00{i + 2} · queued</span><strong>Coming soon</strong></div>
        ))}
      </div>
      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="st-more" data-testid="rc-more-github-link">More on GitHub <ArrowUpRight size={16} /></a>
    </div>
  );
}

export function RcContact() {
  return (
    <div className="rc" data-testid="rc-contact">
      <Head title="Contact" sub="open /dev/contact" />
      <p className="rc-lead display">Let's build <span>something</span></p>
      <p className="rc-note">Have an idea, an opportunity or a question? Send a message and it lands straight in my inbox.</p>
      <div className="rc-contact">
        <div className="contact-info">
          <EmailRow />
          <PhoneRow />
          <Socials prefix="robot" />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
