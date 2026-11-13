import { useState } from 'react';
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

export default function App() {
  const prefs = usePrefsState();
  const [ready, setReady] = useState(false);
  useReveal(ready);

  return (
    <Prefs.Provider value={prefs}>
      <a href="#main" className="skip-link">Skip to content</a>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header ready={ready} />
      <main id="main" data-ready={ready ? 'yes' : 'no'}>
        <Hero ready={ready} />
        <About />
        <Focus />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </Prefs.Provider>
  );
}
