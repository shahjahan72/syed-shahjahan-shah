Admin Endpoint & UI — Usage

API Endpoint: `/api/admin-orders`

Authentication
- Protected via `ADMIN_TOKEN` (set in your environment, e.g., Vercel project variables).
- Use header: `Authorization: Bearer <ADMIN_TOKEN>`

API Examples
- List recent orders (GET):
  curl -H "Authorization: Bearer $ADMIN_TOKEN" https://<your-deployment>/api/admin-orders

- Get specific order (GET):
  curl -H "Authorization: Bearer $ADMIN_TOKEN" "https://<your-deployment>/api/admin-orders?id=<orderId>"

- Mark order as paid (PATCH):
  curl -X PATCH -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" -d '{"orderId":"<orderId>", "action":"mark-paid", "paymentStatus":"COMPLETED"}' https://<your-deployment>/api/admin-orders

Admin UI
- A lightweight admin interface is available at `/admin` (login) and `/admin/orders` (orders list).
- Login accepts the same `ADMIN_TOKEN` value (validated by a server check). The UI stores the token in `sessionStorage` for the session.
- Admin UI features:
  - **Search & Filters**: Search by Order ID, Phone Number, and filter by date range (From / To).
  - **Pagination**: Server-backed pagination to keep the UI fast as the orders grow (page, perPage supported).
  - **Order details**: View customer and items, see recorded payments.
  - **Mark Paid**: Prominent `Mark Paid` button with confirmation prompt to avoid accidental actions.
  - Toggle the **Enterprise Look** (applies a neutral enterprise styling for visual testing) — this toggles an `enterprise` class on `document.body` and persists in `localStorage`.

Notes
- The Admin UI validates the token by attempting to call the protected API on login. If the token is invalid, login is rejected.
- If the server-side `ADMIN_TOKEN` variable is not configured, the API will return a 500 server error (`Server misconfiguration: ADMIN_TOKEN is not set`) to make misconfiguration obvious during deploy.
- A lightweight token check endpoint is available for quick verification: **GET** `/api/admin-token-check`.
  - 200: `{ ok: true, message: 'ADMIN_TOKEN is set on the server.' }` (safe response — does not leak the token itself)
  - 500: `{ ok: false, error: 'Server misconfiguration: ADMIN_TOKEN is not set. Please set this environment variable in your hosting environment.' }

- Temporary debug token (for quick testing): You can set a `DEBUG_ADMIN_TOKEN` env var (or use the local non-production fallback `shahjahan160104`) to log in quickly during testing. When `DEBUG_ADMIN_TOKEN` is present, the admin API also accepts `Authorization: Bearer <DEBUG_ADMIN_TOKEN>`.
  - Example: set `DEBUG_ADMIN_TOKEN=shahjahan160104` in Vercel for a short time to test the Admin UI login.
  - ⚠️ Warning: Remove the debug token and unset `DEBUG_ADMIN_TOKEN` after verification; do NOT leave debug tokens enabled in production.
- The list is paginated and supports server-side filtering to keep response times low.

Notes
- The admin UI is intentionally minimal. For production, add strong authentication (OAuth/session), audit logs, and CSRF protection.
- Be careful with the `ADMIN_TOKEN` — keep it secret and rotate if compromised.