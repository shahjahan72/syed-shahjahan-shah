Shahjahan Shah — Portfolio

This folder contains a static portfolio website. I added build configuration and Netlify configuration so you can optimize assets and deploy to Netlify easily.

Quick status
- SEO tags, OG, favicon, accessibility (skip link, focus styles) applied.
- Mobile nav toggle and contact form with Netlify support added.
- Images set to lazy-load and CSS aspect-ratio added to reduce CLS.

How to run locally (recommended)
1. Serve a local static server (no build necessary to test):

```powershell
# from this folder: c:\Users\DELL\Desktop\assignment\resturant\index.html
python -m http.server 8000
# then open http://localhost:8000
```

2. To run the build (optional, requires Node.js and npm):

```powershell
# install dependencies
npm install

# run the build script (will run image optimization and minify)
npm run build
```

Notes on build scripts
- `package.json` includes scripts that use `imagemin-cli`, `csso-cli`, and `terser`.
- These are developer tools and must be installed via `npm install` before use.
- The `imagemin` command targets an `images/` folder; adjust the script or move images into that folder if you want them processed.

Netlify deployment (quick options)
- Drag & drop:
  - Zip the contents of this folder (or the parent `resturant` folder) and drag into Netlify's deploy UI (Site settings > Deploys > Deploys by drag and drop).
- Continuous deploy from GitHub/GitLab/Bitbucket:
  - Push this project to a repository.
  - In Netlify, create a new site from Git provider and point it to the repository and branch.
  - Set "Build command" to `npm run build` and "Publish directory" to `index.html`.

Netlify Forms
- The contact form in `index.html` is configured for Netlify forms via `data-netlify="true"` and `name="contact"`.
- When deployed on Netlify, submissions will appear in the Site > Forms panel.

Next recommended steps
- Replace the placeholder email (`you@example.com`) in the contact fallback and README with your real email.
- Optionally move images into an `images/` folder and run `npm run build` to generate optimized assets.
- Consider converting images to WebP and adding responsive `srcset` for better performance.

WebP conversion and responsive images
- Place your original images in an `images/` folder at the same level as `package.json` (create it if missing). The build script expects files there and will write optimized files to `images/` and WebP files to `images/webp`.
- To generate WebP variants run:

```powershell
npm install
npm run make-webp
```

- After running `make-webp`, the site is already prepared to prefer WebP via the `<picture>` elements. Example markup used in the site:

```html
<picture>
  <source type="image/webp" srcset="images/webp/portfolio1.webp">
  <img src="portfolio1.jpg" alt="Portfolio screenshot" loading="lazy">
</picture>
```

This is safe: if the WebP file does not exist yet the browser will ignore the source and use the fallback image.

If you want, I can:
- Run the image optimization (I can add an npm script that uses `sharp` or `imagemin` and produce webp variants),
- Hook the site into a GitHub repo and provide step-by-step Netlify setup (I cannot perform the external deployment without your Netlify/GitHub credentials but I can prepare everything and give exact steps),
- Add a CI workflow that runs `npm run build` and deploys to Netlify automatically.
