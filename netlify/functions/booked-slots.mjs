// Returns the list of already-booked time slots for a given date, so the
// website can grey them out. Uses the Supabase service key server-side and
// returns ONLY the slot strings (no personal details). Dormant until the
// SUPABASE_* env vars are set.
export default async (req) => {
  const date = new URL(req.url).searchParams.get('date');
  const SB = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SB || !KEY || !date) return json({ slots: [] });

  const r = await fetch(
    `${SB}/rest/v1/park_bookings?select=slot&date=eq.${encodeURIComponent(date)}&status=in.(requested,confirmed)`,
    { headers: { apikey: KEY, Authorization: 'Bearer ' + KEY } }
  );
  const rows = r.ok ? await r.json() : [];
  return json({ slots: Array.isArray(rows) ? rows.map(x => x.slot) : [] });
};

export const config = { path: '/api/booked-slots' };

function json(o, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
}
