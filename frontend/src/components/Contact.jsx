import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Phone, ArrowRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import SectionHead from './SectionHead';
import { PROFILE } from '../data';

const API = '/api';

export function ContactForm() {
  const born = useRef(Date.now());
  const [f, setF] = useState({ name: '', email: '', message: '', website: '' });
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');
  const [mailReady, setMailReady] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    fetch(`${API}/contact/status`).then((r) => r.ok ? r.json() : null)
      .then((data) => setMailReady(data?.ready === true)).catch(() => setMailReady(false));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!mailReady) {
      const subject = encodeURIComponent(`Portfolio message from ${f.name}`);
      const body = encodeURIComponent(`${f.message}\n\nFrom: ${f.name} (${f.email})`);
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      setState('draft');
      return;
    }
    setState('sending'); setErr('');
    try {
      const r = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, elapsed_ms: Date.now() - born.current }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(typeof d.detail === 'string' ? d.detail : 'Please check your details and try again.');
      }
      setState('sent');
      setF({ name: '', email: '', message: '', website: '' });
    } catch (e2) {
      setErr(e2.message || 'Something went wrong. Try again.');
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="form-sent" role="status" data-testid="contact-success">
        <span className="mono">exit code 0</span>
        <p className="display">Message sent.</p>
        <p>Thanks — I'll reply to your email soon.</p>
        <button className="btn" onClick={() => setState('idle')} data-testid="contact-send-another-btn">Send another</button>
      </div>
    );
  }

  if (state === 'draft') {
    return <div className="form-sent" role="status"><span className="mono">Email draft</span><p className="display">Ready to send.</p><p>Your email app should open with your message. Send it there to reach me.</p><button className="btn" onClick={() => setState('idle')}>Back to form</button></div>;
  }

  return (
    <form className="contact-form" onSubmit={submit} data-testid="contact-form" noValidate={false}>
      <label><span className="mono">name</span>
        <input required maxLength={80} value={f.name} onChange={set('name')} autoComplete="name" data-testid="contact-name-input" />
      </label>
      <label><span className="mono">email</span>
        <input required type="email" value={f.email} onChange={set('email')} autoComplete="email" data-testid="contact-email-input" />
      </label>
      <label><span className="mono">message</span>
        <textarea required minLength={5} maxLength={3000} rows={5} value={f.message} onChange={set('message')} data-testid="contact-message-input" />
      </label>
      <label className="hp" aria-hidden="true">Website
        <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
      </label>
      {state === 'error' && <p className="form-err" role="alert" data-testid="contact-error">{err}</p>}
      <button type="submit" className="btn solid send" disabled={state === 'sending'} data-testid="contact-submit-btn">
        {state === 'sending' ? 'Sending…' : mailReady ? 'Send message' : 'Open email draft'} <ArrowRight size={16} />
      </button>
      {!mailReady && <p className="mono">Your email app opens to send this message.</p>}
    </form>
  );
}

export function EmailRow() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); } catch { /* clipboard blocked */ }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="info-row">
      <a href={`mailto:${PROFILE.email}`} className="email" data-testid="contact-email-link">{PROFILE.email}</a>
      <button className="icon-btn" onClick={copy} aria-label="Copy email address" data-testid="contact-copy-email-btn">
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <span className="mono copied" aria-live="polite">{copied ? 'copied' : ''}</span>
    </div>
  );
}

export function PhoneRow() {
  const [phone, setPhone] = useState(false);
  return (
    <div className="info-row">
      {phone
        ? <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="mono phone" data-testid="contact-phone-number">{PROFILE.phone}</a>
        : <button className="btn" onClick={() => setPhone(true)} data-testid="contact-reveal-phone-btn"><Phone size={14} /> Click to reveal phone</button>}
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section contact" data-testid="contact-section">
      <SectionHead idx="05" path="open /dev/contact" title="Contact" id="contact" />
      <h2 className="display contact-big rv" aria-label="Let's build something">LET'S BUILD<br /><span>SOMETHING</span></h2>
      <div className="contact-grid">
        <div className="contact-info rv">
          <EmailRow />
          <PhoneRow />
          <div className="info-row socials">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn brand linkedin" data-testid="contact-linkedin-link"><Linkedin size={16} /> LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn brand github" data-testid="contact-github-link"><Github size={16} /> GitHub</a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
