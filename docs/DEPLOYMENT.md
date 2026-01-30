Vercel Deployment & Routing — Deep Link Fix

What I changed
- Added `vercel.json` with a filesystem handle and a fallback to `/index.html`.
  - This ensures client-side routes (e.g., `/shop`, `/product/slug`) are served the SPA entrypoint and do not return 404.

How it works
- Vercel first serves any matched file from the built filesystem (`handle: filesystem`), allowing static assets to be served normally.
- If no file matches, the route falls back to `/index.html`, enabling React Router to handle client-side routes.

Deployment steps
1. Commit & push the changes.
2. Trigger a redeploy in Vercel (push to the branch that's linked to the Vercel project).
3. Confirm deep links work by visiting directly (not via navigation) `https://<your-deployment>/shop` or any product URL.

SEO & Sitemap
- `public/robots.txt` and `public/sitemap.xml` already exist and reference `https://printifystudio.pk/`.
- `index.html` now includes basic SEO meta tags and canonical link.

Notes
- If your production domain differs from `https://printifystudio.pk/`, update the canonical URL and sitemap links accordingly.
- For server-side routes (if you later add backend functions), add explicit rules to `vercel.json` as needed.
