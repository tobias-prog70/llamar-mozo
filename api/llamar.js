export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { mesa, tipo } = req.body || {};
  const mesaTxt = String(mesa || '').slice(0, 10);
  const tipos = {
    mozo: '🔔 Llamar al mozo',
    cuenta: '🧾 Pedir la cuenta',
  };

  if (!mesaTxt || !tipos[tipo]) {
    return res.status(400).json({ ok: false });
  }

  const r = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `Mesa ${mesaTxt} — ${tipos[tipo]}`,
      }),
    }
  );

  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
}
