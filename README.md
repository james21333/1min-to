# 1min.to

Static site for **https://1min.to/** — Cloudflare Pages project **`onemin-to`**.

| Item | Value |
|------|-------|
| **Live URL** | https://1min.to/ |
| **Pages project** | `onemin-to` (`onemin-to.pages.dev`) |
| **GitHub** | https://github.com/james21333/1min-to |
| **Publish folder** | `public/` |

## Auto-deploy

Push to `main` → Cloudflare Pages builds from `public/` (Git integration).

Fallback: GitHub Actions workflow `deploy-cloudflare-pages.yml` (needs `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`).

## Local structure

```
public/           # Static files served at 1min.to
  index.html
  _headers
```
