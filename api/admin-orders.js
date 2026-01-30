import prisma from '../server/prismaClient.js';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function unauthorized(res) {
  res.status(401).json({ ok: false, error: 'Unauthorized' });
}

export default async function handler(req, res) {
  const auth = req.headers.authorization || '';
  if (!ADMIN_TOKEN || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return unauthorized(res);
  }

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
    console.error('Admin route error:', err.message || err);
    res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
