import { Volume2, VolumeX } from 'lucide-react';
import { usePrefs } from '../hooks';

export function MusicButton({ testid = 'music-toggle-btn' }) {
  const { music, toggleMusic } = usePrefs();
  return (
    <button className={`icon-btn music-icon ${music ? 'on' : ''}`} onClick={toggleMusic} aria-pressed={music}
      aria-label={music ? 'Turn music off' : 'Turn music on'} title={music ? 'Music on' : 'Music off'} data-testid={testid}>
      {music ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </button>
  );
}

const MODES = [
  { id: 'main', label: 'Main' },
  { id: 'robot', label: 'Robot arm' },
  { id: 'static', label: 'Static' },
];

export default function ModeSwitch() {
  const { mode, setMode } = usePrefs();
  return (
    <div className="mode-switch mono" role="group" aria-label="View mode" data-testid="mode-switch">
      {MODES.map((m) => (
        <button key={m.id} className={mode === m.id ? 'on' : ''} aria-pressed={mode === m.id}
          onClick={() => setMode(m.id)} data-testid={`mode-${m.id}-btn`}>
          {m.label}
        </button>
      ))}
    </div>
  );
}
