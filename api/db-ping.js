import prisma from '../server/prismaClient.js';

export default async function handler(req, res) {
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
    console.error('DB ping error:', err.message || err);
    res.status(500).json({ ok: false, error: err.message || 'DB connection error' });
  }
}
