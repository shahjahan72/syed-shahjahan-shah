import prisma from '../server/prismaClient.js';
import { calculatePrice } from '../src/utils/pricingCalculator.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items, customer = {}, payment } = req.body || {};

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid items' });
      }

      // Server-side pricing validation
      let serverTotal = 0;
      const priceBreakdown = [];

      for (const it of items) {
        // Expect the client to send a product object and config for each item
        const { product, config, quantity } = it;
        if (!product || !config || !quantity) {
          return res.status(400).json({ error: 'Item missing product/config/quantity' });
        }

        const computed = calculatePrice(product, { ...config, quantity });
        if (!computed.valid) {
          return res.status(400).json({ error: 'Unable to compute price for an item' });
        }

        serverTotal += computed.total;
        priceBreakdown.push({ computed, quantity });
      }

      // Optional client-supplied total can be used as a cross-check
      // Accept request only if totals match (prevents client-side tampering)
      if (req.body.total != null && Number(req.body.total) !== serverTotal) {
        return res.status(400).json({ error: 'Total mismatch', serverTotal });
      }

      // Create order record
      const order = await prisma.order.create({
        data: {
          total: serverTotal,
          currency: 'PKR',
          customerName: customer.name,
          customerPhone: customer.phone,
          customerEmail: customer.email,
          items: items
        }
      });

      // If payment info provided (manual payment), record it
      let paymentRecord = null;
      if (payment && payment.method) {
        paymentRecord = await prisma.payment.create({
          data: {
            orderId: order.id,
            method: payment.method,
            amount: payment.amount || serverTotal,
            transactionId: payment.transactionId,
            status: payment.status || 'PENDING'
          }
        });

        // If payment is marked as completed server-side, we can update order status
        if (paymentRecord.status === 'COMPLETED') {
          await prisma.order.update({ where: { id: order.id }, data: { status: 'PAID' } });
        }
      }

      return res.status(201).json({ ok: true, orderId: order.id, serverTotal, payment: paymentRecord });
    } catch (err) {
      console.error('Order creation error:', err.message || err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  // GET /api/orders?id=<orderId>
  if (req.method === 'GET') {
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'Missing id' });

    try {
      const order = await prisma.order.findUnique({ where: { id }, include: { payments: true } });
      if (!order) return res.status(404).json({ error: 'Order not found' });
      return res.status(200).json({ ok: true, order });
    } catch (err) {
      console.error('Fetch order error:', err.message || err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
