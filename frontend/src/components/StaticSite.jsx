import { ArrowUpRight } from 'lucide-react';
import { usePrefs } from '../hooks';
import { NAV, FOCUS, EDUCATION, SKILLS, PROJECTS, PROFILE } from '../data';
import { CvButton } from './Header';
import { MusicButton } from './ModeSwitch';
import { Github, Linkedin } from './BrandIcons';
import { ContactForm, EmailRow, PhoneRow } from './Contact';

const live = PROJECTS.filter((p) => p.status === 'live');

export default function StaticSite() {
  const { theme, toggleTheme } = usePrefs();
  return (
    <div className="static" data-testid="static-site">
      <nav className="st-nav" aria-label="Main">
        <span className="display st-logo">Manoj Kumar</span>
        <div className="st-links">
          {NAV.map((n) => <a key={n.id} href={`#st-${n.id}`} data-testid={`static-nav-${n.id}`}>{n.label}</a>)}
        </div>
        <div className="st-tools">
          <MusicButton testid="static-music-toggle-btn" />
          <button className="btn" onClick={toggleTheme} data-testid="static-theme-toggle-btn">{theme === 'dark' ? 'Light' : 'Dark'} theme</button>
        </div>
      </nav>

      <main className="st-main">
        <section id="st-about" className="st-sec st-hero">
          <img src="/photo.webp" alt="Portrait of Manoj Kumar" width="452" height="532" />
          <div>
            <h1 className="display">Hey, I'm Manoj Kumar</h1>
            <p className="st-role mono">AI/ML • Full Stack • Cybersecurity • CSE Student</p>
            <p>I am a BTech Computer Science and Engineering student at <strong>Amrita Vishwa Vidyapeetham, Amritapuri Campus</strong>.</p>
            <p>I am deeply interested in understanding how systems work internally and how to build efficient and secure software solutions.</p>
            <p>My goal is to become a top-level software engineer by mastering core subjects like Data Structures, Operating Systems, and Computer Networks. I consistently focus on improving my problem-solving ability, logical thinking, and coding skills.</p>
            <CvButton testid="static-cv-btn" />
          </div>
        </section>

        <section id="st-focus" className="st-sec">
          <h2 className="display">Interests & Focus</h2>
          <div className="st-cards">
            {FOCUS.map((f) => <div key={f.title} className="st-card"><h3>{f.title}</h3><p>{f.text}</p></div>)}
          </div>
        </section>

        <section id="st-education" className="st-sec">
          <h2 className="display">Education</h2>
          {EDUCATION.map((e) => (
            <div key={e.hash} className="st-edu">
              <div><h3>{e.title}</h3><a href={e.map} target="_blank" rel="noopener noreferrer">{e.place}</a></div>
              <span className="mono">{e.years}</span>
            </div>
          ))}
        </section>

        <section id="st-skills" className="st-sec">
          <h2 className="display">Skills</h2>
          {SKILLS.map((g) => (
            <div key={g.group} className="st-skillgroup">
              <h3 className="mono">{g.group}</h3>
              <ul>{g.items.map((s) => <li key={s.name}><img src={s.icon} alt="" width="36" height="36" />{s.name}</li>)}</ul>
            </div>
          ))}
        </section>

        <section id="st-projects" className="st-sec">
          <h2 className="display">Projects</h2>
          {live.map((p) => (
            <article key={p.id} className="st-proj">
              <img src={p.image} alt={`${p.title} preview`} width="1200" height="630" loading="lazy" />
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <p className="mono st-tags">{p.tags.join(' · ')}</p>
              <p className="st-plinks">
                <a href={p.live} target="_blank" rel="noopener noreferrer">Live preview →</a>
                <a href={p.source} target="_blank" rel="noopener noreferrer">Source code →</a>
              </p>
            </article>
          ))}
          <a className="st-more" href={PROFILE.github} target="_blank" rel="noopener noreferrer">More projects on GitHub <ArrowUpRight size={16} /></a>
        </section>

        <section id="st-contact" className="st-sec">
          <h2 className="display">Contact</h2>
          <div className="contact-info">
            <EmailRow />
            <PhoneRow />
            <div className="info-row socials">
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="brand-btn linkedin" data-testid="static-linkedin-link"><Linkedin size={16} /> LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="brand-btn github" data-testid="static-github-link"><Github size={16} /> GitHub</a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="st-foot mono">© 2026 B. Manoj Kumar</footer>
    </div>
  );
}
