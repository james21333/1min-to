# 1min.to

Static site for **https://1min.to/** — Cloudflare Pages project **`onemin-to`**.

| Item | Value |
|------|-------|
| **Live URL** | https://1min.to/ |
| **Pages default** | https://onemin-to.pages.dev/ |
| **Pages project** | `onemin-to` |
| **GitHub** | https://github.com/james21333/1min-to |
| **Publish folder** | `public/` |

## Auto-deploy

Cloudflare Pages is connected to this repo. Every push to **`main`** deploys `public/`.

## DNS (Namecheap)

Point the domain at the Pages hostname:

| Type | Host | Value |
|------|------|-------|
| **ALIAS / ANAME** (or CNAME Flattening) | `@` | `onemin-to.pages.dev` |
| **CNAME** | `www` | `onemin-to.pages.dev` |

If Namecheap does not offer ALIAS for `@`, use **URL Redirect** `@` → `https://www.1min.to` and keep the `www` CNAME.

## Local structure

```
public/           # Static files served at 1min.to
  index.html
  _headers
```
