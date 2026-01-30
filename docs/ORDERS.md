Orders & Manual Payment Handling — Endpoints & Usage

Purpose
- Provide server-side pricing validation and a minimal order/payment storage flow for manual payments (bank transfer/JazzCash/other).

Endpoints
1) Create order
   POST /api/orders
   Payload (JSON):
   {
     "items": [
       { "product": { ... }, "config": { ... }, "quantity": 100 }
     ],
     "customer": { "name": "John Doe", "phone": "0325...", "email": "x@x" },
     "payment": { "method": "bank"|"jazzcash"|"manual", "transactionId": "TX123", "amount": 5000 }
   }

   Response: { ok: true, orderId, serverTotal }

   Notes:
   - Server recomputes price using `calculatePrice` for each item and rejects requests where the client's total doesn't match the server's total.
   - A `Payment` record is created when payment info is provided.

2) Get order
   GET /api/orders?id=<orderId>
   Returns order record including associated payments.

Manual Payment Handling Flow
- Customer places an order and selects "Manual Bank Transfer" or similar.
- Frontend posts the order and includes `payment.transactionId` if customer already submitted it (optional).
- Backend stores the order and payment record (status defaults to `PENDING`).
- Admin verifies the transaction externally and updates `payment.status` to `COMPLETED` using a separate admin workflow (not included).
- If `payment.status` is `COMPLETED`, the order `status` can be set to `PAID`.

DB Notes
- Run `npx prisma generate` to generate the client after modifying schema.
- Use `npx prisma db push` (or `prisma migrate` based on your policy) to apply schema to your DB.

Security
- Do not trust client-side totals. Server validation is enforced.
- Store sensitive payment verification steps outside the user-facing APIs or behind admin authentication.

If you want, I can add an admin endpoint to mark payments as `COMPLETED` and an email webhook to notify customers once their order is marked paid.