import { usePrefs } from '../hooks';

export function MusicButton({ testid = 'music-toggle-btn' }) {
  const { music, toggleMusic } = usePrefs();
  return (
    <button className={`music-btn ${music ? 'on' : ''}`} onClick={toggleMusic} aria-pressed={music}
      aria-label={music ? 'Turn music off' : 'Turn music on'} title={music ? 'Music on' : 'Music off'} data-testid={testid}>
      <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="mono">{music ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}

export default function ModeSwitch() {
  const { calm, toggleCalm } = usePrefs();
  return (
    <button className="mode-switch mono" onClick={toggleCalm} data-testid="mode-switch-btn">
      {calm ? 'Switch to Interactive Mode' : 'Switch to Static Mode'}
    </button>
  );
}
