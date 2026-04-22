import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Server-side proxy to Web3Forms. The access key lives in the
 * WEB3FORMS_ACCESS_KEY env var (set in Vercel) so it never reaches the browser.
 */
export const POST: APIRoute = async ({ request }) => {
  const key = import.meta.env.WEB3FORMS_ACCESS_KEY ?? process.env.WEB3FORMS_ACCESS_KEY;

  if (!key) {
    return new Response(
      JSON.stringify({ success: false, message: "Server is missing WEB3FORMS_ACCESS_KEY." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let incoming: FormData;
  try {
    incoming = await request.formData();
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid form data." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Basic honeypot: if the hidden 'botcheck' field is filled, silently accept
  // without forwarding. Bots think they succeeded, no noise in the inbox.
  const botcheck = incoming.get("botcheck");
  if (typeof botcheck === "string" && botcheck.length > 0) {
    return new Response(
      JSON.stringify({ success: true, message: "Received." }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  // Minimal validation: require an email address.
  const email = incoming.get("email");
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return new Response(
      JSON.stringify({ success: false, message: "A valid email is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Rebuild the payload with the server-held access key so the client never sees it.
  const payload = new FormData();
  for (const [name, value] of incoming.entries()) {
    if (name === "access_key") continue; // ignore anything the client tried to send
    payload.append(name, value);
  }
  payload.append("access_key", key);

  try {
    const upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    });
    const json = await upstream.json().catch(() => ({}));

    if (!upstream.ok || !json?.success) {
      return new Response(
        JSON.stringify({ success: false, message: json?.message || "Upstream rejected the submission." }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message received." }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: "Network error. Please try again." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const GET: APIRoute = () =>
  new Response("Method not allowed", { status: 405 });
