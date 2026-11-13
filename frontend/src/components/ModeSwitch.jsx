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

export default function ModeSwitch() {
  const { mode, setMode } = usePrefs();
  const next = mode === 'robot' ? 'main' : 'robot';
  return (
    <div className="mode-switch" data-testid="mode-switch">
      <button className="mode-main mono" onClick={() => setMode(next)} data-testid="mode-toggle-btn">
        {next === 'robot' ? 'Switch to Robot Arm Mode' : 'Switch to Main Mode'}
      </button>
    </div>
  );
}
