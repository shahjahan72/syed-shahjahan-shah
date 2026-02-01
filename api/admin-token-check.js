// CORS helper: ensures every response includes necessary CORS headers.
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default function handler(req, res) {
  // Add CORS headers to every response and handle preflight
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Lightweight endpoint to verify server-side ADMIN_TOKEN configuration
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN && process.env.ADMIN_TOKEN.trim();

  if (!ADMIN_TOKEN) {
    // Clear, actionable message to surface misconfiguration during CI/deploy
    return res.status(500).json({ ok: false, error: 'Server misconfiguration: ADMIN_TOKEN is not set. Please set this environment variable in your hosting environment.' });
  }

  // For safety do not return the token itself
  return res.status(200).json({ ok: true, message: 'ADMIN_TOKEN is set on the server.' });
}
