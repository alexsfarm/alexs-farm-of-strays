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
      const r = await fetch(`${SB}/rest/v1/site_settings?id=eq.main&select=data,updated_at`, { headers: H });
      if (!r.ok) return json({ error: 'Could not load settings (database read failed).' }, 502);
      const rows = await r.json();
      if (!Array.isArray(rows)) return json({ error: 'Could not load settings.' }, 502);
      const row = rows[0] || {};
      return json({ data: row.data || {}, ts: row.updated_at || null });
    }
    if (action === 'save-settings') {
      // Optimistic lock: if the editor loaded a specific version (baseTs), make
      // sure the DB hasn't changed since — stops a stale/second tab from
      // overwriting newer data. Compared by instant, so timestamp format differences don't matter.
      if (body.baseTs) {
        const cur = await fetch(`${SB}/rest/v1/site_settings?id=eq.main&select=updated_at`, { headers: H });
        const rows = cur.ok ? await cur.json() : null;
        const curTs = Array.isArray(rows) && rows[0] && rows[0].updated_at;
        const a = Date.parse(curTs), b = Date.parse(body.baseTs);
        if (!isNaN(a) && !isNaN(b) && a !== b) {
          return json({ error: 'Your content was changed in another tab or on another device since you opened this page. Please refresh before saving.' }, 409);
        }
      }
      // Upsert the single 'main' row.
      const ts = new Date().toISOString();
      const r = await fetch(`${SB}/rest/v1/site_settings`, {
        method: 'POST',
        headers: { ...H, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ id: 'main', data: body.settings || {}, updated_at: ts })
      });
      if (!r.ok) return json({ error: 'save failed: ' + (await r.text()) }, 500);
      return json({ ok: true, ts });
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
      // Re-activation guard: bringing a CANCELLED booking back to life must not
      // double-book a time that has since been taken (e.g. by a booking made
      // under a newer slot schedule). Active rows were already checked on entry.
      const patch = body.booking || {};
      if (patch.status === 'confirmed' || patch.status === 'requested') {
        try {
          const cr = await fetch(`${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(body.id)}&select=date,slot,status`, { headers: H });
          const cur = cr.ok ? (await cr.json())[0] : null;
          if (cur && cur.status === 'cancelled') {
            const ex = await fetch(`${SB}/rest/v1/park_bookings?select=slot&date=eq.${encodeURIComponent(cur.date)}&id=neq.${encodeURIComponent(body.id)}&status=in.(requested,confirmed)`, { headers: H });
            const act = ex.ok ? await ex.json() : [];
            const clash = Array.isArray(act) && act.find(x => slotsClash(cur.slot, x.slot));
            if (clash) return json({ error: 'Cannot restore this booking: its time now overlaps another booking (' + clash.slot + ') on that date.' }, 409);
          }
        } catch {}
      }
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
    // Admin creates a booking on a customer's behalf (e.g. same-day). No 24h rule.
    if (action === 'create-booking') {
      const b = body.booking || {};
      if (!b.date || !b.slot) return json({ error: 'Please choose a date and time slot.' }, 400);
      const row = {
        date: b.date, slot: b.slot, dogs: parseInt(b.dogs, 10) || 1,
        name: b.name || '', phone: b.phone || '', email: b.email || '',
        amount: (b.amount != null && b.amount !== '') ? Number(b.amount) : null,
        currency: 'eur', status: b.status || 'confirmed', payment_method: b.payment || null
      };
      // Overlap guard: block times that clash with an existing active booking in
      // REAL time (not just identical text), so bookings made under an older
      // slot schedule still protect their hour after the times are changed.
      try {
        if (slotMinutes(row.slot)) {
          const ex = await fetch(`${SB}/rest/v1/park_bookings?select=slot&date=eq.${encodeURIComponent(row.date)}&status=in.(requested,confirmed)`, { headers: H });
          const act = ex.ok ? await ex.json() : [];
          const clash = Array.isArray(act) && act.find(x => slotsClash(row.slot, x.slot));
          if (clash) return json({ error: 'That time overlaps an existing booking (' + clash.slot + ') on that date.' }, 409);
        }
      } catch {}
      // Insert, transparently retrying without the optional payment_method
      // column if it hasn't been added to the database yet.
      const send = async (method, url, rw) => {
        let res = await fetch(url, { method, headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(rw) });
        if (!res.ok && res.status !== 409 && rw.payment_method !== undefined) {
          const t = await res.clone().text();
          if (/payment_method/i.test(t)) { const b2 = { ...rw }; delete b2.payment_method; res = await fetch(url, { method, headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(b2) }); }
        }
        return res;
      };
      let r = await send('POST', `${SB}/rest/v1/park_bookings`, row);
      if (r.status === 409) {
        // The exact slot text already has a row. If that row is CANCELLED the
        // slot is genuinely free — re-use the row, same as the public booking
        // path does. Otherwise the slot really is taken.
        const exq = await fetch(`${SB}/rest/v1/park_bookings?select=id,status&date=eq.${encodeURIComponent(row.date)}&slot=eq.${encodeURIComponent(row.slot)}`, { headers: H });
        const exr = exq.ok ? await exq.json() : [];
        const cur = Array.isArray(exr) && exr[0];
        if (cur && cur.status === 'cancelled') {
          r = await send('PATCH', `${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(cur.id)}`, row);
          // Best-effort: reset the email-tracking flags left by the old booking
          // so the new customer still gets their scheduled emails.
          try { await fetch(`${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(cur.id)}`, { method: 'PATCH', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ prearrival_sent: false, postvisit_sent: false }) }); } catch {}
        } else {
          return json({ error: 'That date and time slot is already booked.' }, 409);
        }
      }
      if (!r.ok) return json({ error: 'Could not create the booking: ' + (await r.text()) }, 500);
      if (b.sendEmail && row.email && row.status === 'confirmed') {
        await sendBookingEmail(SB, H, row.email, 'confirmed', { name: row.name, date: row.date, time: row.slot, dogs: row.dogs });
      }
      return json(await r.json());
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

// "HH:MM – HH:MM" -> [startMinutes, endMinutes], or null if unparseable.
function slotMinutes(s) { const m = String(s || '').match(/(\d{1,2}):(\d{2})\D+?(\d{1,2}):(\d{2})/); return m ? [(+m[1]) * 60 + (+m[2]), (+m[3]) * 60 + (+m[4])] : null; }
// True when two slots overlap in REAL time (touching edges don't count).
function slotsClash(a, b) { const x = slotMinutes(a), y = slotMinutes(b); return !!(x && y && x[0] < y[1] && y[0] < x[1]); }

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
