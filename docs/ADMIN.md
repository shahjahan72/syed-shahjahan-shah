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
- Login accepts the same `ADMIN_TOKEN` value (validated by a server check). The UI stores the token in `localStorage` so the admin remains logged in across refreshes.
- Admin UI features:
  - **Search & Filters**: Search by Order ID, Phone Number, and filter by date range (From / To).
  - **Pagination**: Server-backed pagination to keep the UI fast as the orders grow (page, perPage supported).
  - **Order details**: View customer and items, see recorded payments.
  - **Mark Paid**: Prominent `Mark Paid` button with confirmation prompt to avoid accidental actions.
  - Toggle the **Enterprise Look** (applies a neutral enterprise styling for visual testing) — this toggles an `enterprise` class on `document.body` and persists in `localStorage`.

Notes
- The Admin UI validates the token by attempting to call the protected API on login. If the token is invalid, login is rejected.
- If the server-side `ADMIN_TOKEN` variable is not configured, the API will return a 500 server error (`Server misconfiguration: ADMIN_TOKEN is not set`) to make misconfiguration obvious during deploy.

- Debug tokens: If you need a temporary token to test the admin UI, set `DEBUG_ADMIN_TOKEN` explicitly in your environment (do NOT hard-code values in the repository). If `DEBUG_ADMIN_TOKEN` is present it may be accepted in non-production environments only. **Remove** the debug token and unset `DEBUG_ADMIN_TOKEN` before deploying to production.

- CORS: To restrict allowed origins in production, set `FRONTEND_ORIGIN` in your deployment environment to the origin of your frontend (e.g., `https://www.example.com`). When set, API routes will set `Access-Control-Allow-Origin` to that value and allow the `Authorization` header.
- The list is paginated and supports server-side filtering to keep response times low.

Notes
- The admin UI is intentionally minimal. For production, add strong authentication (OAuth/session), audit logs, and CSRF protection.
- Be careful with the `ADMIN_TOKEN` — keep it secret and rotate if compromised.