// Password-protected admin API for managing the whole site: animals, bookings,
// site settings (text/theme/content) and animal-photo uploads.
//
// Uses the Supabase service key server-side. The admin page (admin.html) sends
// the password in an 'x-admin-password' header which is checked against the
// ADMIN_PASSWORD env var. Dormant until SUPABASE_* + ADMIN_PASSWORD are set.
const BUCKET = 'animal-photos';

export default async (req) => {
  const SB = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_KEY, PW = process.env.ADMIN_PASSWORD;
  if (!SB || !KEY) return json({ error: 'Supabase not configured' }, 500);

  const pw = req.headers.get('x-admin-password') || '';
  if (!PW || pw !== PW) return json({ error: 'unauthorized' }, 401);

  const H = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };
  let body = {};
  if (req.method !== 'GET') { try { body = await req.json(); } catch {} }
  const action = body.action || new URL(req.url).searchParams.get('action');

  try {
    // ---- Animals ----------------------------------------------------------
    if (action === 'list-animals') {
      const r = await fetch(`${SB}/rest/v1/animals?select=*&order=sort.asc,created_at.desc`, { headers: H });
      return json(await r.json());
    }
    if (action === 'add-animal') {
      const r = await fetch(`${SB}/rest/v1/animals`, {
        method: 'POST', headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(body.animal || {})
      });
      return json(await r.json());
    }
    if (action === 'update-animal') {
      const r = await fetch(`${SB}/rest/v1/animals?id=eq.${encodeURIComponent(body.id)}`, {
        method: 'PATCH', headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(body.animal || {})
      });
      return json(await r.json());
    }
    if (action === 'delete-animal') {
      await fetch(`${SB}/rest/v1/animals?id=eq.${encodeURIComponent(body.id)}`, { method: 'DELETE', headers: H });
      return json({ ok: true });
    }

    // ---- Site settings (all editable text/theme/content) ------------------
    if (action === 'get-settings') {
      const r = await fetch(`${SB}/rest/v1/site_settings?id=eq.main&select=data`, { headers: H });
      const rows = await r.json();
      return json((Array.isArray(rows) && rows[0] && rows[0].data) || {});
    }
    if (action === 'save-settings') {
      // Upsert the single 'main' row.
      const r = await fetch(`${SB}/rest/v1/site_settings`, {
        method: 'POST',
        headers: { ...H, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ id: 'main', data: body.settings || {}, updated_at: new Date().toISOString() })
      });
      if (!r.ok) return json({ error: 'save failed: ' + (await r.text()) }, 500);
      return json({ ok: true });
    }

    // ---- Animal photo upload / delete (Supabase Storage) ------------------
    if (action === 'upload-photo') {
      const safe = (body.filename || 'photo.jpg').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60);
      const path = `${Date.now()}_${safe}`;
      const bin = Buffer.from(String(body.dataB64 || ''), 'base64');
      const up = await fetch(`${SB}/storage/v1/object/${BUCKET}/${encodeURIComponent(path)}`, {
        method: 'POST',
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': body.contentType || 'image/jpeg', 'x-upsert': 'true' },
        body: bin
      });
      if (!up.ok) return json({ error: 'upload failed: ' + (await up.text()) }, 500);
      return json({ publicUrl: `${SB}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(path)}`, path });
    }
    if (action === 'delete-photo') {
      if (body.path) await fetch(`${SB}/storage/v1/object/${BUCKET}/${encodeURIComponent(body.path)}`, { method: 'DELETE', headers: H });
      return json({ ok: true });
    }

    // ---- Bookings ---------------------------------------------------------
    if (action === 'list-bookings') {
      const r = await fetch(`${SB}/rest/v1/park_bookings?select=*&order=date.asc`, { headers: H });
      return json(await r.json());
    }
    if (action === 'update-booking') {
      const r = await fetch(`${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(body.id)}`, {
        method: 'PATCH', headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(body.booking || {})
      });
      const rows = await r.json();
      const row = Array.isArray(rows) && rows[0];
      // Transactional email #2 (donation confirmed). Dormant until RESEND_API_KEY is set.
      if (row && row.status === 'confirmed' && row.email) {
        await sendBookingEmail(SB, H, row.email, 'confirmed', { name: row.name, date: row.date, time: row.slot, dogs: row.dogs });
      }
      return json(rows);
    }
    if (action === 'delete-booking') {
      await fetch(`${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(body.id)}`, { method: 'DELETE', headers: H });
      return json({ ok: true });
    }

    return json({ error: 'unknown action' }, 400);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
};

export const config = { path: '/api/admin' };

function json(o, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
}

// Send a booking email via Resend, using the (admin-editable) template stored in
// site_settings, with a built-in fallback. Stays dormant until RESEND_API_KEY is set.
async function sendBookingEmail(SB, H, to, key, vars) {
  const RK = process.env.RESEND_API_KEY; if (!RK || !to) return;
  const FROM = process.env.EMAIL_FROM || 'Paphos Paws Park <noreply@alexsfarm.org>';
  let tpl = null;
  try {
    const r = await fetch(`${SB}/rest/v1/site_settings?id=eq.main&select=data`, { headers: H });
    const rows = await r.json();
    tpl = rows && rows[0] && rows[0].data && rows[0].data.emails && rows[0].data.emails[key];
  } catch {}
  const FALLBACK = {
    request:   { subject: 'Your Paphos Paws Park booking request 🐾', body: "Hi!\n\nThanks for your booking request for Paphos Paws Park. Please make your donation to reserve your slot, then reply with a screenshot or receipt and we'll confirm your visit.\n\nThank you for supporting Alex's Farm. 🐾" },
    confirmed: { subject: 'Your Paphos Paws Park visit is confirmed ✅', body: "Your visit to Paphos Paws Park is confirmed.\n\nDate: {date}\nTime: {time}\n\nWe'll send your gate code before your visit. Thank you for supporting Alex's Farm! 🐾" }
  };
  const t = (tpl && tpl.body) ? tpl : (FALLBACK[key] || { subject: 'Paphos Paws Park', body: '' });
  const fill = s => String(s || '').replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + RK, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to, subject: fill(t.subject), text: fill(t.body) })
    });
  } catch {}
}
