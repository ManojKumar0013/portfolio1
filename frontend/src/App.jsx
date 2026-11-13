import { lazy, Suspense, useEffect, useState } from 'react';
import { Prefs, usePrefsState, useReveal } from './hooks';
import Loader from './components/Loader';
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

function Interactive({ ready, setReady }) {
  useReveal(ready);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header ready={ready} />
      <main id="main">
        <Hero ready={ready} />
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
  const [ready, setReady] = useState(prefs.mode !== 'main');
  useEffect(() => { if (prefs.mode !== 'main') setReady(true); }, [prefs.mode]);

  return (
    <Prefs.Provider value={prefs}>
      {prefs.mode === 'static' && <StaticSite />}
      {prefs.mode === 'robot' && <Suspense fallback={<div className="rb-loading mono">booting robot arm…</div>}><RobotMode /></Suspense>}
      {prefs.mode === 'main' && <Interactive ready={ready} setReady={setReady} />}
      {ready && <ModeSwitch />}
    </Prefs.Provider>
  );
}
