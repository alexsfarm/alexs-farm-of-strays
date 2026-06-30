// Netlify Scheduled Function — runs every 15 minutes.
//   1) Auto-releases unconfirmed 'requested' holds older than 2 hours (frees the slot).
//   2) Sends the pre-arrival email (#3, with the gate code) ~codeLeadHours before a
//      confirmed visit, and the post-visit email (#4) ~1 hour after it ends.
// Templates are the admin-editable ones in site_settings.emails (with a fallback).
// Stays dormant until SUPABASE_* (+ RESEND_API_KEY for the emails) are set.

export default async () => {
  const SB = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SB || !KEY) return new Response('not configured');
  const H = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };
  const now = Date.now();

  // (1) Release unconfirmed holds older than 2 hours.
  try {
    const cutoff = new Date(now - 2 * 3600000).toISOString();
    await fetch(`${SB}/rest/v1/park_bookings?status=eq.requested&created_at=lt.${encodeURIComponent(cutoff)}`,
      { method: 'PATCH', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'cancelled' }) });
  } catch {}

  // The scheduled emails need the tracking columns; if they aren't there yet,
  // skip (so we never re-send) until the admin adds them.
  let hasCols = false;
  try { const r = await fetch(`${SB}/rest/v1/park_bookings?select=prearrival_sent&limit=1`, { headers: H }); hasCols = r.ok; } catch {}
  if (!hasCols) return new Response('released; email columns not present yet');

  let settings = {};
  try { const r = await fetch(`${SB}/rest/v1/site_settings?id=eq.main&select=data`, { headers: H }); const s = await r.json(); settings = (s && s[0] && s[0].data) || {}; } catch {}
  const access = (settings.park && settings.park.access) || {};
  const leadH = Number(access.codeLeadHours != null ? access.codeLeadHours : 2);

  const yest = new Date(now - 24 * 3600000).toISOString().slice(0, 10);
  let rows = [];
  try { const r = await fetch(`${SB}/rest/v1/park_bookings?status=eq.confirmed&date=gte.${yest}&select=*`, { headers: H }); rows = await r.json(); if (!Array.isArray(rows)) rows = []; } catch {}

  for (const b of rows) {
    const t = parseSlot(b.slot); if (!t) continue;
    const startUTC = cyprusWallToUTC(b.date, t.sh, t.sm);
    const endUTC = cyprusWallToUTC(b.date, t.eh, t.em);
    // #3 pre-arrival (only when a gate code has been set), in [start - lead, start]
    if (b.prearrival_sent !== true && access.gateCode && now >= startUTC - leadH * 3600000 && now < startUTC) {
      const ok = await sendEmail(settings, b.email, 'prearrival', { name: b.name, date: b.date, time: b.slot, code: access.gateCode, fenced: access.fencedCode || access.gateCode });
      if (ok) await mark(SB, H, b.id, 'prearrival_sent');
    }
    // #4 post-visit, within ~24h after it ends
    if (b.postvisit_sent !== true && now >= endUTC + 3600000 && now <= endUTC + 25 * 3600000) {
      const ok = await sendEmail(settings, b.email, 'postvisit', { name: b.name, date: b.date, time: b.slot });
      if (ok) await mark(SB, H, b.id, 'postvisit_sent');
    }
  }
  return new Response('ok');
};

export const config = { schedule: '*/15 * * * *' };

function parseSlot(slot) {
  const m = String(slot || '').match(/(\d{1,2}):(\d{2})\D+?(\d{1,2}):(\d{2})/);
  return m ? { sh: +m[1], sm: +m[2], eh: +m[3], em: +m[4] } : null;
}
function tzOffsetMin(date, tz) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .formatToParts(date).reduce((a, x) => { a[x.type] = x.value; return a; }, {});
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - date.getTime()) / 60000;
}
function cyprusWallToUTC(dateStr, hh, mm) {
  const naive = Date.UTC(+dateStr.slice(0, 4), +dateStr.slice(5, 7) - 1, +dateStr.slice(8, 10), hh, mm);
  return naive - tzOffsetMin(new Date(naive), 'Asia/Nicosia') * 60000;
}
async function mark(SB, H, id, col) {
  try { await fetch(`${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ [col]: true }) }); } catch {}
}
async function sendEmail(settings, to, key, vars) {
  const RK = process.env.RESEND_API_KEY; if (!RK || !to) return false;
  const FROM = process.env.EMAIL_FROM || 'Paphos Paws Park <noreply@alexsfarm.org>';
  const tpl = settings.emails && settings.emails[key];
  const FALLBACK = {
    prearrival: { subject: 'Your Paphos Paws Park visit — arrival details 🔑', body: "Hi 👋\n\nYour visit to Paphos Paws Park is coming up soon.\n\n🔑 Gate access code: {code}\n\nPlease keep both gates closed behind you, and keep dogs on lead until they are inside the enclosed park. Thank you for supporting Alex's Farm! 🐾" },
    postvisit:  { subject: 'Thank you for visiting Paphos Paws Park 🐾', body: "Hi 👋\n\nThank you for visiting Paphos Paws Park today — we hope you and your dog(s) had a wonderful time.\n\nIf you took any photos, we'd love to see them. Thank you for supporting Alex's Farm. ❤️" }
  };
  const t = (tpl && tpl.body) ? tpl : (FALLBACK[key] || { subject: 'Paphos Paws Park', body: '' });
  const fill = s => String(s || '').replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  try {
    const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + RK, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: FROM, to, subject: fill(t.subject), text: fill(t.body) }) });
    return r.ok;
  } catch { return false; }
}
