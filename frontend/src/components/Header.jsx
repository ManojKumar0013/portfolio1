import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, Download } from 'lucide-react';
import { usePrefs, useScramble } from '../hooks';
import { NAV, CV_URL } from '../data';

function useIST() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id); }, []);
  return t;
}

export function CvButton({ className = '', testid = 'header-cv-btn' }) {
  if (!CV_URL) {
    return <span className={`cv-btn disabled ${className}`} data-testid={testid} aria-disabled="true" title="CV will be available soon">CV coming soon</span>;
  }
  return <a className={`cv-btn ${className}`} href={CV_URL} download data-testid={testid}><Download size={14} /> Download CV</a>;
}

function Menu({ open, onClose }) {
  const first = useRef(null);
  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <nav className={`menu ${open ? 'open' : ''}`} aria-hidden={!open} data-testid="fullscreen-menu" aria-label="Main">
      <ol>
        {NAV.map((n, i) => (
          <li key={n.id} style={{ '--i': i }}>
            <a ref={i === 0 ? first : null} href={`#${n.id}`} tabIndex={open ? 0 : -1} onClick={onClose} data-testid={`menu-link-${n.id}`}>
              <span className="mono idx">0{i + 1}</span>
              <span className="display lbl">{n.label}</span>
              <span className="mono path">{n.path}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="menu-foot mono">
        <CvButton testid="menu-cv-btn" />
        <span>Amritapuri, Kerala — IN</span>
      </div>
    </nav>
  );
}

export default function Header({ ready }) {
  const { theme, toggleTheme, calm } = usePrefs();
  const word = useScramble('MANOJ KUMAR', ready, calm);
  const time = useIST();
  const [open, setOpen] = useState(false);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <>
      <header className="site-header" data-testid="site-header">
        <a href="#top" className="wordmark display" data-testid="header-wordmark" aria-label="Manoj Kumar, back to top">
          {word}<span className="caret" aria-hidden="true" />
        </a>
        <div className="header-right">
          <span className="mono clock" data-testid="header-ist-clock">IST {time}</span>
          <CvButton className="hide-sm" />
          <button className="icon-btn" onClick={toggleTheme} data-testid="theme-toggle-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className={`menu-btn mono ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} data-testid="menu-toggle-btn">
            <span className="bars" aria-hidden="true"><i /><i /></span>{open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
