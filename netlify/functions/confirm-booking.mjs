// After a successful Stripe payment the visitor is redirected back with a
// session_id. This verifies the payment with Stripe and records the booking in
// Supabase (idempotently). Dormant until STRIPE/SUPABASE env vars are set.
export default async (req) => {
  const sid = new URL(req.url).searchParams.get('session_id');
  const SK = process.env.STRIPE_SECRET_KEY;
  const SB = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!sid || !SK) return json({ ok: false }, 400);

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sid), {
    headers: { Authorization: 'Bearer ' + SK }
  });
  const s = await r.json();
  if (!r.ok || s.payment_status !== 'paid') return json({ ok: false }, 200);

  if (SB && KEY) {
    const m = s.metadata || {};
    const row = {
      date: m.date, slot: m.slot, dogs: parseInt(m.dogs || '1', 10),
      name: m.name, phone: m.phone,
      email: (s.customer_details && s.customer_details.email) || null,
      amount: (s.amount_total || 0) / 100, currency: s.currency,
      stripe_session_id: s.id, status: 'confirmed'
    };
    // Upsert on the Stripe session id so refreshing the success page can't
    // create duplicate bookings.
    await fetch(`${SB}/rest/v1/park_bookings?on_conflict=stripe_session_id`, {
      method: 'POST',
      headers: {
        apikey: KEY, Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(row)
    }).catch(() => {});
  }
  return json({ ok: true });
};

export const config = { path: '/api/confirm-booking' };

function json(o, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
}
