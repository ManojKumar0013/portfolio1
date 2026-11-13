import { ArrowUp } from 'lucide-react';
import { usePrefs } from '../hooks';

export default function Footer() {
  const { calm, toggleCalm } = usePrefs();
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="foot-row mono">
        <a href="#top" className="btn" data-testid="footer-back-to-top"><ArrowUp size={14} /> Back to top</a>
        <button className={`calm-toggle ${calm ? 'on' : ''}`} onClick={toggleCalm} aria-pressed={calm} data-testid="calm-mode-toggle">
          <span className="sw" aria-hidden="true"><i /></span> Calm mode {calm ? 'on' : 'off'}
        </button>
        <span>© 2026 B. Manoj Kumar · shutdown -h now</span>
      </div>
      <p className="giant display" aria-hidden="true">MANOJ KUMAR</p>
    </footer>
  );
}
