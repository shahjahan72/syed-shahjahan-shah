Prisma Integration — Quick Start (Local & Vercel)

Purpose
- Minimal setup to demonstrate safe Neon/Postgres connectivity and to provide a lightweight `/api/db-ping` endpoint for verification.

Files added
- `prisma/schema.prisma` — Minimal datasource using `DATABASE_URL`.
- `server/prismaClient.js` — Singleton Prisma client helper (safe for serverless/dev).
- `api/db-ping.js` — GET endpoint that returns `{ ok: true, now }` when DB connection succeeds.

Local testing
1. Install dependencies (adds `prisma` and `@prisma/client`) if you haven't already:
   npm install

2. Generate Prisma client (required before using Prisma locally):
   npm run prisma:generate

3. Run dev server:
   npm run dev

4. Ensure `DATABASE_URL` exists in your local `.env` (DO NOT commit credentials). Then visit:
   http://localhost:5174/api/db-ping

Vercel deployment
- Add project environment variable `DATABASE_URL` in Vercel (Project Settings → Environment Variables).
- Push the branch and redeploy. Vercel will install dependencies and the function will be available at:
  https://<your-deployment>/api/db-ping

Notes & Best Practices
- Use the provided `server/prismaClient.js` singleton pattern to avoid connection storms in serverless.
- For migrations, use `prisma migrate` or `prisma db push` depending on your workflow. For production on serverless, consider using `prisma migrate deploy` or a managed migration pipeline.
- Confirm that the connection string uses TLS (e.g., `?sslmode=require`) if required by your DB provider.
- For simple connectivity checks you can use this endpoint; for real data operations add models and migrations in `prisma/schema.prisma` and run migrations safely.

Supabase notes:
- For Supabase use the provided `DATABASE_URL` at runtime; when you have connection pooling enabled (pgBouncer), prefer setting `DIRECT_URL` in CI or migration environments and use it with `prisma migrate deploy`.

If you want, I can add a tiny example model and a corresponding API to list/create items next (will include migrations and safety notes).