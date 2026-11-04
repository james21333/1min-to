/** Shared bot / scraper / in-app crawler detection. */
export function isBotLike(ua) {
  return (
    !ua ||
    /(bot|spider|crawl|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|pinterest|embedly|quora|whatsapp|telegrambot|applebot|bingpreview|yandex|semrush|ahrefs|petalbot|adsbot|google-inspection|headless|phantom|selenium|puppeteer|tiktok|musical_ly|bytedance|bytespider|ttwebview|aweme)/i.test(
      ua
    )
  );
}

export const SAFE_URL = "https://factor75.com";

/** Money destinations — server-side only. Never put in public/. */
export function moneyUrls(env) {
  const fromEnv = (env && env.MONEY_URLS) || "";
  const list = fromEnv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length) return list;
  return [
    "https://www.ovalsling.com/F7hhdUfn90FnF7H196Sd44OOin9ZFAOk0wTPTV7gCzwmk0XxelsJMfcBLuzNO3QvXvjq2yifdSH9B9_kat7kiA~~",
  ];
}

export function pickMoneyUrl(env) {
  const urls = moneyUrls(env);
  return urls[Math.floor(Math.random() * urls.length)];
}
