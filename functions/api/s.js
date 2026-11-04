/**
 * Fingerprint POST → { route: "main"|"alt", via }. Never returns offer URLs.
 */
import { remoteFlag, edgeRoute } from "../_lib/remote.js";

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

  try {
    const remote = await remoteFlag(request, env, payload);
    if (remote.ok && remote.flag === "true") {
      return new Response(JSON.stringify({ route: "alt", via: "remote" }), {
        headers,
      });
    }
    if (remote.ok && remote.flag === "false") {
      return new Response(JSON.stringify({ route: "main", via: "remote" }), {
        headers,
      });
    }
    if (remote.ok) {
      return new Response(
        JSON.stringify({ route: edgeRoute(ua), via: "remote-empty" }),
        { headers }
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ route: edgeRoute(ua), via: "remote-error" }),
      { headers }
    );
  }

  return new Response(
    JSON.stringify({ route: edgeRoute(ua), via: "edge" }),
    { headers }
  );
}
