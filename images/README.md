Images folder

Place source images here if you want the build scripts to optimize them. The `make-webp` script will create webp variants inside `images/webp/`.

Example:
- images/portfolio1.jpg
- images/portfolio2.jpg
- images/brand1.jpg
- images/cards.jpg

Run:

```powershell
npm install
npm run make-webp
```

After conversion, the site will reference `images/webp/*.webp` when available.