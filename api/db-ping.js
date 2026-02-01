import prisma from '../server/prismaClient.js';

// CORS helper
function setCors(res) {
  const origin = process.env.FRONTEND_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  // Add CORS headers and handle preflight
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Lightweight connectivity check: get current DB time
    const result = await prisma.$queryRaw`SELECT NOW() as now`;
    // Prisma returns an array for raw queries in some setups
    const now = (Array.isArray(result) && result[0]) ? result[0].now : result.now || null;

    res.status(200).json({ ok: true, now });
  } catch (err) {
    console.error('DB ping error:', err);
    res.status(500).json({ ok: false, error: 'DB connection error' });
  }
}
