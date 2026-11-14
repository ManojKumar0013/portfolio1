import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="foot-row mono">
        <a href="#top" className="btn" data-testid="footer-back-to-top"><ArrowUp size={14} /> Back to top</a>
        <span>© 2026 B. Manoj Kumar <span aria-hidden="true">·</span> Designed &amp; built with care</span>
      </div>
      <p className="giant display" aria-label="Manoj Kumar"><span>MANOJ</span><span>KUMAR</span></p>
    </footer>
  );
}
