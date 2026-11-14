const assets = __STATIC_ASSETS__;
const recipient = 'manojkumarbondada123@gmail.com';
const hits = new Map();

const json = (value, status = 200) => new Response(JSON.stringify(value), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

function limited(ip) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) || []).filter((at) => now - at < 3600000);
  if (recent.length >= 5) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

async function contact(request, env) {
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return json({ detail: 'Invalid request.' }, 415);
  if (Number(request.headers.get('content-length')) > 12000) return json({ detail: 'Message is too long.' }, 413);
  let data;
  try { data = await request.json(); } catch { return json({ detail: 'Invalid request.' }, 400); }
  const { name, email, message, website, elapsed_ms } = data || {};
  if (website) return json({ status: 'sent' });
  if (typeof name !== 'string' || !name.trim() || name.length > 80 ||
      typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof message !== 'string' || message.trim().length < 5 || message.length > 3000) {
    return json({ detail: 'Please enter a valid name, email and message.' }, 422);
  }
  if (typeof elapsed_ms !== 'number' || elapsed_ms < 1000) return json({ detail: 'Please wait a moment and try again.' }, 400);
  if (!env.EMERGENT_EMAIL_KEY) return json({ detail: 'Email is temporarily unavailable. Please use the email address shown on this page.' }, 503);
  if (limited(request.headers.get('cf-connecting-ip') || 'unknown')) return json({ detail: 'Too many messages. Try again later.' }, 429);

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');
  const html = `<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#171b2b"><p style="font-size:12px;letter-spacing:2px;color:#6958d9">NEW MESSAGE / PORTFOLIO</p><p><strong>From:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><div style="padding:16px;border-left:3px solid #6958d9;background:#f3f5fa">${safeMessage}</div><p style="font-size:12px;color:#505b74;margin-top:24px">Reply to answer the sender directly.</p></td></tr></table>`;
  try {
    const response = await fetch('https://integrations.emergentagent.com/api/v1/email/send', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-Email-Key': env.EMERGENT_EMAIL_KEY },
      body: JSON.stringify({ to: [recipient], subject: `Portfolio message from ${name.trim().slice(0, 60)}`, html, from_name: 'Manoj Kumar', contact_email: email.trim() }),
    });
    if (!response.ok) return json({ detail: 'Email is temporarily unavailable. Please try again later.' }, 502);
    return json({ status: 'sent' });
  } catch {
    return json({ detail: 'Email is temporarily unavailable. Please try again later.' }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact/status' && request.method === 'GET') {
      return json({ ready: Boolean(env.EMERGENT_EMAIL_KEY) });
    }
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      if (request.headers.get('origin') && request.headers.get('origin') !== url.origin) return json({ detail: 'Invalid origin.' }, 403);
      return contact(request, env);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const asset = assets[path];
    if (!asset) return new Response('Not found', { status: 404 });
    const bytes = Uint8Array.from(atob(asset.data), (c) => c.charCodeAt(0));
    return new Response(request.method === 'HEAD' ? null : bytes, { headers: {
      'content-type': asset.type,
      'cache-control': path === '/index.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    } });
  },
};
