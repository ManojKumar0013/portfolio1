import { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { createRobotScene, ROBOT_LABELS } from '../robot/scene';
import { MusicButton } from './ModeSwitch';
import { StAbout, StFocus, StSkills, StProjects, StContact } from './StaticSite';

const CONTENT = {
  about: { title: 'About Me', body: () => (<><StAbout /><h3 className="rb-sub display">Interests & Focus</h3><StFocus /></>) },
  skills: { title: 'Skills', body: StSkills },
  projects: { title: 'Projects', body: StProjects },
  contact: { title: 'Contact', body: () => <StContact prefix="robot" /> },
};

function RobotWindow({ id, onClose }) {
  const [max, setMax] = useState(false);
  const { title, body: Body } = CONTENT[id];
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="rb-window-wrap" data-testid="robot-window">
      <div className={`rb-window ${max ? 'max' : ''}`} role="dialog" aria-label={title}>
        <div className="rb-titlebar">
          <span className="mono">~/{id}</span>
          <strong>{title}</strong>
          <div className="rb-ctrls">
            <button className="rb-max" onClick={() => setMax((m) => !m)} aria-label={max ? 'Restore window' : 'Maximize window'} data-testid="robot-window-max-btn">
              {max ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button className="rb-close" onClick={onClose} aria-label="Close window" data-testid="robot-window-close-btn"><X size={14} /></button>
          </div>
        </div>
        <div className="rb-body" data-testid={`robot-window-${id}`}><Body /></div>
      </div>
    </div>
  );
}

export default function RobotMode() {
  const host = useRef(null);
  const api = useRef(null);
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    api.current = createRobotScene(host.current, {
      onStart: (id) => setBusy(id),
      onPick: (id) => { setBusy(null); setOpen(id); },
      onHover: setHover,
    });
    return () => api.current.dispose();
  }, []);

  const close = () => { setOpen(null); api.current?.release(); };
  const status = busy ? `fetching ${busy}…` : hover ? `click to fetch ${hover}` : 'click a word on the floor — the arm will fetch it';

  return (
    <div className="robot" data-testid="robot-mode">
      <div className="robot-stage" ref={host} data-testid="robot-canvas" />
      <header className="rb-top">
        <span className="display rb-name">MANOJ KUMAR<span className="caret" aria-hidden="true" /></span>
        <MusicButton testid="robot-music-toggle-btn" />
      </header>
      <nav className="rb-options" aria-label="Sections">
        <span className="mono">sections</span>
        {ROBOT_LABELS.map((l) => (
          <button key={l.id} className="mono" style={{ '--c': l.color }} disabled={!!busy || !!open}
            onClick={() => api.current?.pick(l.id)} data-testid={`robot-option-${l.id}`}>
            <i aria-hidden="true" />{l.text}
          </button>
        ))}
      </nav>
      <p className="rb-status mono" aria-live="polite" data-testid="robot-status">{status}</p>
      {open && <RobotWindow id={open} onClose={close} />}
    </div>
  );
}
