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

## GetFit quiz (multi-path)

Same quiz is served at all of these URLs:

- https://1min.to/getfit/
- https://1min.to/getstarted/
- https://1min.to/signup/
- https://1min.to/startnow/
- https://1min.to/getyourplan/
- https://1min.to/findyourfit/
- https://1min.to/getresults/
- https://1min.to/takethequiz/
- https://1min.to/seeoptions/
- https://1min.to/findout/

**Mass edit (one place):** edit `public/shared/getfit-quiz.js` and/or `public/shared/getfit-quiz.css`, then push.

**Add another path:** add the slug to `scripts/getfit-paths.txt`, run `./scripts/sync-getfit-paths.sh`, commit, push.
