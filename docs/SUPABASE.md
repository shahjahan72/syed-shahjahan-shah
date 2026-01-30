Supabase Migration Notes & Prisma

Summary
- This project now targets Supabase (Postgres-compatible). Use Supabase's `DATABASE_URL` for runtime connections and `DIRECT_URL` (recommended) for migrations if you're using connection pooling.

Environment
- Required in Vercel (Project → Settings → Environment Variables):
  - `DATABASE_URL` (provided by Supabase project)  
  - `DIRECT_URL` (optional, used for migrations when pgBouncer/connection pooling used)
  - `ADMIN_TOKEN` (secret for admin routes)

Prisma
- `prisma/schema.prisma` uses `env("DATABASE_URL")` for the datasource.
- When running migrations against Supabase, prefer:
  - `DIRECT_URL` in your CI/migration environment, or
  - `npx prisma db push` for a simpler push (no migration history changes), or
  - `prisma migrate deploy` with `DIRECT_URL` in a secure CI process.

Testing locally
1. Install deps: `npm install`
2. Set `DATABASE_URL` in local `.env` (DO NOT commit)
3. Generate client: `npm run prisma:generate`
4. Apply schema: `npm run prisma:dbpush` (or use `prisma migrate` based on your workflow)

Admin
- `api/admin-orders` is protected by `ADMIN_TOKEN` header (Bearer token). Example header:
  Authorization: Bearer <ADMIN_TOKEN>

Client-side Supabase (optional)
- If you also want to use Supabase client-side (auth, storage, realtime), set the following env vars in Vercel (these are public/anonymous keys used by client code):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - (If using Vite, also set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` so they are exposed via `import.meta.env`)

Example client initializer (added at `src/lib/supabaseClient.js`):

```js
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

Security note: The `ANON` key is considered public and is safe for client-side use, but do not commit keys to source control. When using Supabase Storage or other services, enforce Row Level Security (RLS) and use secure server-side functions where required.

If you want, I can add a small example that demonstrates adding files to Supabase Storage or performing auth sign-in flows.