import { lazy, Suspense, useEffect, useState } from 'react';
import { Prefs, usePrefsState, useReveal } from './hooks';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Focus from './components/Focus';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import StaticSite from './components/StaticSite';
import ModeSwitch from './components/ModeSwitch';

const RobotMode = lazy(() => import('./components/RobotMode'));

function RobotEntry({ onSkip }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { if (ready) setProgress(100); return; }
    const timer = window.setInterval(() => setProgress((n) => Math.min(ready ? 100 : 94, n + (n < 65 ? 4 : 2))), 36);
    return () => window.clearInterval(timer);
  }, [ready]);
  useEffect(() => {
    if (!ready || progress !== 100) return;
    const timer = window.setTimeout(() => setComplete(true), 420);
    return () => window.clearTimeout(timer);
  }, [ready, progress]);
  return <>
    <Suspense fallback={null}><RobotMode onReady={() => setReady(true)} /></Suspense>
    <div className={`entry ${complete ? 'entry-done' : ''}`} role="status" aria-label={`Loading robotic arm ${progress} percent`} aria-hidden={complete}>
      <div className="entry-top mono"><span>MK / PORTFOLIO</span><span>2026</span></div>
      <div className="entry-center"><span className="entry-eyebrow mono">Preparing interactive workspace</span><strong className="display">MANOJ<br /><span>KUMAR</span></strong><div className="entry-meter"><span className="mono">LOADING</span><b className="mono">{progress}%</b><i style={{ width: `${Math.min(progress, 100)}%` }} /></div><p className="mono">Robotic arm experience incoming</p></div>
      <button className="entry-skip mono" onClick={onSkip}>View main portfolio ↗</button>
    </div>
  </>;
}

function Interactive() {
  useReveal(true);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header ready />
      <main id="main">
        <Hero ready />
        <About />
        <Focus />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const prefs = usePrefsState();

  return (
    <Prefs.Provider value={prefs}>
      {prefs.mode === 'static' && <StaticSite />}
      {prefs.mode === 'robot' && <RobotEntry onSkip={() => prefs.setMode('main')} />}
      {prefs.mode === 'main' && <Interactive />}
      <ModeSwitch />
    </Prefs.Provider>
  );
}
