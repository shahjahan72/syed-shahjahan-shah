import prisma from '../server/prismaClient.js';
import crypto from 'crypto';

// CORS helper: dynamically uses request Origin header first, then FRONTEND_ORIGIN, then '*'
function setCors(req, res) {
  const reqOrigin = req && req.headers && (req.headers.origin || req.headers.Origin);
  const origin = reqOrigin || process.env.FRONTEND_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Server admin token must be set via environment
const SERVER_ADMIN_TOKEN = process.env.ADMIN_TOKEN && process.env.ADMIN_TOKEN.trim();
// Optional debug token must be explicitly provided (no hard-coded fallback).
const DEBUG_TOKEN = process.env.DEBUG_ADMIN_TOKEN ? process.env.DEBUG_ADMIN_TOKEN.trim() : null;

function unauthorized(req, res) {
  setCors(req, res);
  res.status(401).json({ ok: false, error: 'Unauthorized' });
}

function isValidToken(incoming) {
  try {
    const incomingToken = (incoming || '').trim();
    if (!incomingToken) return false;

    // If server token missing, reject (server misconfiguration handled elsewhere)
    if (!SERVER_ADMIN_TOKEN && !(DEBUG_TOKEN && process.env.NODE_ENV !== 'production')) return false;

    // Choose the canonical token to compare against (prefer server token)
    const serverToken = SERVER_ADMIN_TOKEN || (DEBUG_TOKEN && process.env.NODE_ENV !== 'production' ? DEBUG_TOKEN : null);
    if (!serverToken) return false;

    const a = Buffer.from(incomingToken);
    const b = Buffer.from(serverToken);
    const len = Math.max(a.length, b.length);
    const bufA = Buffer.alloc(len);
    const bufB = Buffer.alloc(len);
    a.copy(bufA);
    b.copy(bufB);
    return crypto.timingSafeEqual(bufA, bufB);
  } catch (e) {
    // On any error, treat as invalid
    return false;
  }
}

export default async function handler(req, res) {
  // Add CORS headers for preflight and every response
  setCors(req, res);
  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Extract token robustly from header (supports `Bearer <token>` or just `<token>`)
  const authHeader = req.headers.authorization || req.headers.Authorization || '';
  const token = (authHeader || '').replace(/^Bearer\s+/i, '').trim();

  // Validate presence of server token configuration
  if (!SERVER_ADMIN_TOKEN) {
    console.error('ADMIN_TOKEN is not set in the environment. Admin routes unavailable.');
    return res.status(500).json({ ok: false, error: 'Server misconfiguration: ADMIN_TOKEN is not set' });
  }

  if (!token || !isValidToken(token)) return unauthorized(req, res);

  try {
    if (req.method === 'GET') {
      // Optional ?id=<orderId>
      const { id, phone, orderId, dateFrom, dateTo, page = 1, perPage = 20 } = req.query || {};
      if (id || orderId) {
        const findId = id || orderId;
        const order = await prisma.order.findUnique({ where: { id: findId }, include: { payments: true } });
        if (!order) return res.status(404).json({ ok: false, error: 'Order not found' });
        return res.status(200).json({ ok: true, order });
      }

      // Filters + pagination
      const where = {};
      if (phone) {
        // phone stored in customerPhone
        where.customerPhone = { contains: phone };
      }
      if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) where.createdAt.gte = new Date(dateFrom);
        if (dateTo) where.createdAt.lte = new Date(dateTo);
      }

      const take = Math.min(parseInt(perPage, 10) || 20, 100);
      const skip = ((parseInt(page, 10) || 1) - 1) * take;

      const [orders, total] = await Promise.all([
        prisma.order.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip, include: { payments: true } }),
        prisma.order.count({ where })
      ]);

      return res.status(200).json({ ok: true, orders, meta: { total, page: parseInt(page, 10) || 1, perPage: take } });
    }

    if (req.method === 'PATCH') {
      const { orderId, action, paymentStatus } = req.body || {};
      if (!orderId || !action) return res.status(400).json({ ok: false, error: 'Missing orderId or action' });

      if (action === 'mark-paid') {
        // Mark the order as PAID and optionally update payment
        await prisma.order.update({ where: { id: orderId }, data: { status: 'PAID' } });
        if (paymentStatus) {
          // naive: update first payment if exists
          const payments = await prisma.payment.findMany({ where: { orderId } });
          if (payments && payments[0]) {
            await prisma.payment.update({ where: { id: payments[0].id }, data: { status: paymentStatus } });
          }
        }
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ ok: false, error: 'Unknown action' });
    }

    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error('Admin route error:', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}
