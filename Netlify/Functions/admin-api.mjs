// Password-protected admin API for managing animals and viewing bookings.
// Uses the Supabase service key server-side. The admin page (admin.html) sends
// the password in an 'x-admin-password' header which is checked against the
// ADMIN_PASSWORD env var. Dormant until SUPABASE_* + ADMIN_PASSWORD are set.
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
    if (action === 'list-bookings') {
      const r = await fetch(`${SB}/rest/v1/park_bookings?select=*&order=date.asc`, { headers: H });
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
