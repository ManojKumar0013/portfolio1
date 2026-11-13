import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Maximize2, Box } from 'lucide-react';
import { createRobotScene, ROBOT_LABELS } from '../robot/scene';
import { MusicButton } from './ModeSwitch';
import { StAbout, StFocus, StSkills, StProjects, StContact } from './StaticSite';

const CONTENT = {
  about: { title: 'About Me', body: () => (<><StAbout /><h3 className="rb-sub display">Interests & Focus</h3><StFocus /></>) },
  skills: { title: 'Skills', body: StSkills },
  projects: { title: 'Projects', body: StProjects },
  contact: { title: 'Contact', body: () => <StContact prefix="robot" /> },
};

function RobotWindow({ id, flat, onFlat, onClose }) {
  const { title, body: Body } = CONTENT[id];
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className={`rb-window ${flat ? 'flat' : 'in3d'}`} role="dialog" aria-label={title} data-testid="robot-window">
      <div className="rb-titlebar">
        <span className="mono">~/{id}</span>
        <strong>{title}</strong>
        <div className="rb-ctrls">
          <button className="rb-max" onClick={onFlat} aria-label={flat ? 'Back to 3D view' : 'Flat reading view'} title={flat ? '3D view' : 'Flat view'} data-testid="robot-window-max-btn">
            {flat ? <Box size={13} /> : <Maximize2 size={13} />}
          </button>
          <button className="rb-close" onClick={onClose} aria-label="Close window" data-testid="robot-window-close-btn"><X size={14} /></button>
        </div>
      </div>
      <div className="rb-body" data-testid={`robot-window-${id}`}><Body /></div>
    </div>
  );
}

export default function RobotMode() {
  const host = useRef(null);
  const api = useRef(null);
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(null);
  const [hover, setHover] = useState(null);
  const [flat, setFlat] = useState(false);
  const [panel, setPanel] = useState(null);

  useEffect(() => {
    api.current = createRobotScene(host.current, {
      onStart: (id) => { setHover(null); setBusy(id); },
      onPick: (id) => { setBusy(null); setOpen(id); },
      onHover: setHover,
    });
    setPanel(api.current.panel);
    return () => api.current.dispose();
  }, []);

  const close = () => { setOpen(null); setFlat(false); api.current?.release(); };
  const toggleFlat = () => {
    if (flat) api.current?.showPanel(open); else api.current?.hidePanel();
    setFlat(!flat);
  };
  const status = open ? `viewing ${open}` : busy ? `fetching ${busy}…` : hover ? `click to fetch ${hover}` : 'click a word on the floor — the arm will fetch it';

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
      {open && flat && <div className="rb-window-wrap"><RobotWindow id={open} flat onFlat={toggleFlat} onClose={close} /></div>}
      {open && !flat && panel && createPortal(<RobotWindow id={open} flat={false} onFlat={toggleFlat} onClose={close} />, panel)}
    </div>
  );
}
