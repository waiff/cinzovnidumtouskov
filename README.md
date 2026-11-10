# cinzovnidumtouskov

Website for cinzovnidumtouskov.cz – Činžovní dům Touškov, 8 furnished flats for 16 or 24 employees.

## Deployment

Hosted on Hostinger (Premium Web Hosting), connected through Hostinger's GitHub integration
with auto-deployment: every push to `main` is deployed into `public_html`.
There is no build step on the server, so the repo root must contain the finished site
(HTML/CSS/JS, optionally PHP).

## Layout

| Path | What it is |
| --- | --- |
| `index.html`, `assets/`, `favicon.svg`, `og-image.png`, `photos/`, `robots.txt`, `sitemap.xml`, `.htaccess` | The built website, served as-is by Hostinger. Do not edit by hand. |
| `site-src/` | Source code (React + Vite + Tailwind). Blocked from the web by `.htaccess`. |

## Making a change

```bash
cd site-src
npm install            # first time only
# edit content in src/data/ (prices, photos, contacts, flats, transport…)
npm run release        # builds and copies the finished site into the repo root
cd ..
git add -A
git commit -m "Describe the change"
git push               # Hostinger deploys main automatically
```

See `site-src/README.md` for where each piece of content lives.
