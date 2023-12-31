Deno.serve((request) => {
  const url = new URL(request.url);

  // Redirect WebFinger requests to Mastodon subdomain.
  // - <https://en.wikipedia.org/wiki/WebFinger>
  // - <https://docs.joinmastodon.org/spec/webfinger/>
  // - <https://masto.host/mastodon-usernames-different-from-the-domain-used-for-installation/>
  if (url.pathname === "/.well-known/webfinger") {
    url.host = `mastodon.${url.host}`;
    Response.redirect(url);
  }

  return new Response(undefined, { status: 404 });
});
