Neon / PostgreSQL — Connection & Best Practices

This document explains how to securely connect a server/ORM to a Neon (Postgres-compatible) database.

1) Environment variables
- Use a single `DATABASE_URL` connection string (recommended):
  - Example: `postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require`
- Avoid committing credentials. Use `.env` locally and project secrets in your hosting provider (e.g., Vercel Environment Variables).

2) Prisma (example)
- `schema.prisma` datasource:

  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

- For serverless deployments consider Prisma Data Proxy or Neon/connection pooling to avoid excessive connections.

3) Node.js (pg) example

  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      // For many serverless/managed Postgres providers you may need to set
      // rejectUnauthorized to false. Test this for your environment.
      rejectUnauthorized: false
    }
  });

  // Example usage
  const res = await pool.query('SELECT 1');

4) Neon-specific notes
- Neon provides branch-specific connection strings (use the production branch URL for production).
- Use Neon’s recommended connection pooling for serverless environments (Neon or external pooling).
- Monitor connection counts and apply connection pooling (PgBouncer) if needed.

5) Deployment (Vercel)
- Add `DATABASE_URL` as a Project Environment Variable (do **not** add credentials to the repository).
- Set `APP_URL` (or `VITE_APP_URL` if the app needs it on the client) for canonical tags and redirects.

6) Security
- Use least-privilege DB users and rotate credentials if compromised.
- Use TLS/SSL (sslmode=require) for data-in-transit security.

7) Testing locally
- Add credentials to a local `.env` (not committed) with `DATABASE_URL` and test with the above Prisma or `pg` snippets.

If you need, I can add a sample serverless route or minimal `db` helper in a separate backend repo to demonstrate integration (no credentials included).