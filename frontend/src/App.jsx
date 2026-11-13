import { useEffect, useState } from 'react';
import { Prefs, usePrefsState, useReveal } from './hooks';
import Loader from './components/Loader';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Focus from './components/Focus';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import StaticSite from './components/StaticSite';
import ModeSwitch from './components/ModeSwitch';

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
        <Education />
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
  const [ready, setReady] = useState(prefs.calm);
  useEffect(() => { if (prefs.calm) setReady(true); }, [prefs.calm]);

  return (
    <Prefs.Provider value={prefs}>
      {prefs.calm ? <StaticSite /> : <Interactive ready={ready} setReady={setReady} />}
      {ready && <ModeSwitch />}
    </Prefs.Provider>
  );
}
