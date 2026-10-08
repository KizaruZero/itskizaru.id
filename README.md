# ITS Kizaru — Company Website

Company landing page for **ITS Kizaru** (itskizaru.id), a software studio building
SaaS products, Odoo ERP systems, and business apps.

Live site: https://itskizaru.id (repo: `KizaruZero/itskizaru.id`)

## File structure

```
itskizaru.id/
├── index.html      # Page structure: nav, hero, services, stack marquee, why-us, contact, footer
├── css/
│   └── style.css   # All styling: light/dark themes, layout, animations, responsive rules
├── js/
│   └── main.js     # Theme toggle, word-by-word hero entrance, scroll reveals,
│                   # magnetic buttons, active nav highlighting, footer year
└── README.md
```

## Run locally

No build step. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static server, e.g.:

```bash
cd itskizaru.id
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages, Nginx, etc.
Upload the folder contents as-is; no server-side code required.

## Notes

- Light/dark theme: toggle in the nav, stored in `localStorage`; defaults to the
  OS `prefers-color-scheme` setting.
- Fonts load from Google Fonts CDN with system-font fallbacks, so the page still
  renders offline.
- Decorative background is pure CSS (no images). `prefers-reduced-motion` is
  respected — animations are disabled for users who request it.
- Contact email: ardya.pusaka@itskizaru.id
