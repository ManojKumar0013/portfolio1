import { lazy, Suspense } from 'react';
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
      {prefs.mode === 'robot' && (
        <Suspense fallback={<div className="rb-loading mono" role="status">Loading robot arm…</div>}>
          <RobotMode />
        </Suspense>
      )}
      {prefs.mode === 'main' && <Interactive />}
      <ModeSwitch />
    </Prefs.Provider>
  );
}
