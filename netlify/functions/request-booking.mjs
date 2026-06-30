// Saves a manual dog-park booking REQUEST (no card payment) into Supabase with
// status 'requested', which holds the slot (unique date+slot) so it can't be
// double-booked, and returns a friendly reference. Public endpoint; it writes
// server-side using the service key, so no key is ever exposed to the browser.
// Dormant until the SUPABASE_* env vars are set.
export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);
  const SB = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SB || !KEY) return json({ error: 'Booking storage is not configured.' }, 500);

  let b = {};
  try { b = await req.json(); } catch {}
  const date = String(b.date || '').trim(), slot = String(b.slot || '').trim();
  const name = String(b.name || '').trim(), phone = String(b.phone || '').trim(), email = String(b.email || '').trim();
  const dogs = parseInt(b.dogs, 10) || 1;
  const amount = (b.amount != null && b.amount !== '') ? Number(b.amount) : null;
  const payment = String(b.payment || '').trim();
  if (!date || !slot || !name || !phone || !email) return json({ error: 'Please fill in all fields.' }, 400);

  const H = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };
  const row = { date, slot, dogs, name, phone, email, amount, currency: 'eur', status: 'requested', payment_method: payment || null };

  // Send a row to park_bookings. If the optional `payment_method` column hasn't
  // been added yet, transparently retry without it so bookings never break.
  async function send(method, url, body) {
    let res = await fetch(url, { method, headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(body) });
    if (!res.ok && res.status !== 409 && body.payment_method !== undefined) {
      const t = await res.clone().text();
      if (/payment_method/i.test(t)) { const b2 = { ...body }; delete b2.payment_method; res = await fetch(url, { method, headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(b2) }); }
    }
    return res;
  }

  // Insert. The unique(date,slot) constraint is what holds the slot.
  let r = await send('POST', `${SB}/rest/v1/park_bookings`, row);

  // 409 = a row already exists for this slot. Re-use it only if it was
  // cancelled (slot was freed); otherwise the slot is genuinely taken.
  if (r.status === 409) {
    const ex = await fetch(`${SB}/rest/v1/park_bookings?select=id,status&date=eq.${encodeURIComponent(date)}&slot=eq.${encodeURIComponent(slot)}`, { headers: H });
    const rows = ex.ok ? await ex.json() : [];
    const cur = Array.isArray(rows) && rows[0];
    if (cur && cur.status === 'cancelled') {
      r = await send('PATCH', `${SB}/rest/v1/park_bookings?id=eq.${encodeURIComponent(cur.id)}`, row);
    } else {
      return json({ error: 'slot_taken' }, 409);
    }
  }

  if (!r.ok) return json({ error: 'Could not save the request: ' + (await r.text()) }, 500);
  const saved = await r.json();
  const rec = Array.isArray(saved) ? saved[0] : saved;
  const id = (rec && rec.id) || '';
  const ref = 'PPP-' + date.replace(/-/g, '').slice(2) + '-' + String(id).replace(/-/g, '').slice(0, 4).toUpperCase();
  return json({ ok: true, ref, id });
};

export const config = { path: '/api/request-booking' };

function json(o, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
}
