# Ideacamp

Marketing site for [Ideacamp](https://ideacamp.co), a productized design studio.
One static page plus a serverless intake endpoint. No build step, no framework.

## Structure

```
index.html            The site — semantic HTML, driven by the design-system tokens (links /styles/index.css)
api/intake.js         Vercel serverless function: receives the intake form, emails it via Resend
styles/               Design system: index.css (barrel) → tokens.css + base.css + components/*
tokens/src/           DTCG token SOURCE (authoritative): color, typography, shape, spacing
style-dictionary.config.mjs   Compiles tokens/src → styles/tokens/tokens.css  (npm run tokens)
docs/index.html       Design-system documentation (token reference + component gallery)
DESIGN.md             Design-language spec (YAML tokens + rationale)
LIVING_BRIEF.md       Project state + decision log
assets/icons/         favicon.svg, flame.svg (logo mark)
robots.txt sitemap.xml vercel.json .env.example
_source/              Archived originals: the brief + the Claude design iterations (not deployed)
```

The page was converted from the `_source/Ideacamp v3.dc.html` Claude design artifact into
standalone HTML (the proprietary runtime/React/`{{ }}` bindings removed), then migrated onto a
proper token system. `_source/` is kept for reference only and is never served.

## Design system

Tokens live as DTCG JSON in `tokens/src/` (a two-tier system: primitive color ramps → semantic
roles), compiled by **Style Dictionary v5** into CSS custom properties. The site and components
consume the compiled variables only; **never edit `styles/tokens/tokens.css` by hand.**

```bash
npm install
npm run tokens      # recompile styles/tokens/tokens.css after editing tokens/src/*.json
```

Reference pages (open via a local server, e.g. `python3 -m http.server`): `docs/index.html`
(gallery), `token-check.html` (compiled-value verifier), `component-preview.html`,
`style-preview.html`, `page-example-1/2.html`.

## Local preview

Any static server works. The page renders fully on its own; the intake form needs the
serverless function (below) to actually deliver submissions.

```bash
# Page only:
python3 -m http.server 8000        # then open http://localhost:8000

# Page + the /api/intake function:
npx vercel dev                     # requires the Vercel CLI + env vars
```

## Deploy (Vercel)

1. Push this repo to GitHub and import it in Vercel. It deploys as-is — root `index.html`
   is served statically and `api/intake.js` becomes a serverless function at `/api/intake`.
2. Add the custom domain `ideacamp.co` in the Vercel project's Domains settings and point
   DNS as Vercel instructs (apex A/ALIAS record + `www` CNAME). HTTPS is automatic.

## Intake form

The form posts JSON to `/api/intake`, which emails each submission via [Resend](https://resend.com).
A hidden honeypot field (`company_website`) drops obvious bots.

To turn it on, set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Notes |
|----------|----------|-------|
| `RESEND_API_KEY` | yes | Create at https://resend.com/api-keys |
| `INTAKE_TO` | no | Defaults to `hello@ideacamp.co` |
| `INTAKE_FROM` | no | Defaults to `Ideacamp <intake@ideacamp.co>`; its domain must be verified in Resend |

Then verify the `ideacamp.co` domain in Resend (adds a few DNS records) so mail sends from
your own domain. Until `RESEND_API_KEY` is set, the endpoint returns a clear error and the
page tells the visitor to email `hello@ideacamp.co` directly.

**Still needed separately:** a real mailbox that _receives_ `hello@ideacamp.co` (Google
Workspace, Fastmail, Cloudflare Email Routing, etc.). Resend _sends_ the notification; it
does not host your inbox.

### Swapping the form backend

If you ever want zero backend, point the form at a form service instead: change the `action`
on `<form id="intake-form">` in `index.html` to the service's endpoint (e.g. Formspree /
Web3Forms) and delete `api/intake.js`. The front-end JS already sends a normal POST.
