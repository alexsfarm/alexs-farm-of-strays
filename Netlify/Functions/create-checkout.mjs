// Creates a Stripe Checkout session for a Paphos Paws Park booking.
// Dormant until STRIPE_SECRET_KEY is set in Netlify env vars. Until then the
// website stays in WhatsApp-enquiry mode and never calls this.
export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const SK = process.env.STRIPE_SECRET_KEY;
  if (!SK) return json({ error: 'Stripe not configured' }, 500);

  let body;
  try { body = await req.json(); } catch { return json({ error: 'bad request' }, 400); }
  const { date, slot, dogs, name, phone, email, amount } = body || {};
  if (!date || !slot || !amount) return json({ error: 'missing fields' }, 400);

  const origin = new URL(req.url).origin;
  const cur = (process.env.PARK_CURRENCY || 'eur').toLowerCase();

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', `${origin}/?booking=success&session_id={CHECKOUT_SESSION_ID}#park`);
  params.append('cancel_url', `${origin}/?booking=cancel#park`);
  params.append('line_items[0][quantity]', '1');
  params.append('line_items[0][price_data][currency]', cur);
  params.append('line_items[0][price_data][unit_amount]', String(Math.round(Number(amount) * 100)));
  params.append('line_items[0][price_data][product_data][name]', `Paphos Paws Park — ${date} ${slot}`);
  if (email) params.append('customer_email', email);
  params.append('metadata[date]', date);
  params.append('metadata[slot]', slot);
  params.append('metadata[dogs]', String(dogs || 1));
  params.append('metadata[name]', name || '');
  params.append('metadata[phone]', phone || '');

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + SK, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  const data = await r.json();
  if (!r.ok) return json({ error: (data.error && data.error.message) || 'stripe error' }, 502);
  return json({ url: data.url });
};

export const config = { path: '/api/create-checkout' };

function json(o, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
}
