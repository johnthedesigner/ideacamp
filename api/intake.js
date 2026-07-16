// Vercel serverless function: receives an intake submission and emails it.
// Uses Resend's REST API directly (no npm dependency required).
//
// Required env var:  RESEND_API_KEY
// Optional env vars: INTAKE_TO   (default: hello@ideacamp.co)
//                    INTAKE_FROM (default: Ideacamp <intake@ideacamp.co>)
//
// The INTAKE_FROM domain must be verified in Resend before mail will send.

const TO = process.env.INTAKE_TO || 'hello@ideacamp.co';
const FROM = process.env.INTAKE_FROM || 'Ideacamp <intake@ideacamp.co>';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Body is auto-parsed for application/json; guard for string bodies too.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot: real users leave this empty. Pretend success and drop it.
  if (body.company_website) return res.status(200).json({ ok: true });

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const details = (body.details || '').trim();
  const company = (body.company || '').trim();
  const problem = (body.problem || body.offer || '').trim();
  const timeline = (body.timeline || body.timing || '').trim();
  const source = (body.source || '').trim();
  const agency = body.agency ? 'Yes' : '';

  if (!name || !email || !details) {
    return res.status(400).json({ error: 'Name, email, and project details are required.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server is not configured to receive intakes yet.' });
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Company / link', company || '—'],
    ['Situation', problem || '—'],
    ['Timeline', timeline || '—'],
    ['Found via', source || '—'],
    ['Agency / white-label', agency || 'No'],
  ];
  const html = `
    <h2 style="font-family:sans-serif">New Ideacamp intake</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#56556E">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
    </table>
    <h3 style="font-family:sans-serif;margin-top:20px">What they're building</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(details)}</p>
  `;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nDetails:\n${details}`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Intake: ${name}${problem ? ' — ' + problem : ''}`,
        html,
        text,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend error', r.status, detail);
      return res.status(502).json({ error: 'Could not send your message. Please email hello@ideacamp.co.' });
    }

    // Best-effort plain confirmation to the visitor (no tips, no jokes).
    const firstName = name.split(/\s+/)[0] || 'there';
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: FROM,
          to: [email],
          subject: 'Got your message — scope on the way',
          text: `Hi ${firstName},\n\nYour message made it. Within 2 business days you'll have a written scope, a fixed price, and a start date from me personally.\n\nTalk soon,\nJohn · ideacamp.co`,
          html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#1A1830"><p>Hi ${escapeHtml(firstName)},</p><p>Your message made it. Within 2 business days you'll have a written scope, a fixed price, and a start date from me personally.</p><p>Talk soon,<br>John · ideacamp.co</p></div>`,
        }),
      });
    } catch (confErr) {
      console.error('Confirmation email failed (non-fatal)', confErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Intake send failed', err);
    return res.status(500).json({ error: 'Could not send intake. Please email hello@ideacamp.co.' });
  }
}
