# Messages to Stockton — Companion App Weekly Update

**From:** Canyon  
**Date:** April 6, 2026  
**Re:** Companion App Weekly Deliverable — Prototype + Feasibility Answers

---

## TL;DR

The companion app prototype is live and clickable. It covers the full user journey from login through asset creation, editing, GHL import, billing, and auth configuration. I also locked answers on the two hard questions you raised — auth and billing — and documented one full import flow end to end.

---

## What's Done

1. **Coded prototype** — 6 screens (login, dashboard, create asset, edit & import, billing, connections) running in the CC360 Studio Companion shell. Not static mockups — this is a real React app you can click through.

2. **Auth answer** — We cannot share a native GHL login session with the companion app. The supported path is either a shared external OIDC provider across both GHL and the companion app (SSO), or a magic-link fallback. I documented the reasoning from the GHL OAuth, External Authentication, and SSO docs.

3. **Billing answer** — We should not try to reuse raw cards from GHL. The clean path is Stripe as the billing source of truth + an app-owned credit ledger. CC360 subscriptions are already Stripe-backed under GHL Payments, so this aligns with how ops already manages things.

4. **Import flow** — One full asset flow: email sequence drafted in the companion app → edited → transformed to GHL template payload → imported as a draft → user deep-linked into GHL for final review.

---

## Key Decisions That Need Your Input

### Auth: Which path first?

**Option A — Shared OIDC:** Same identity provider for both GHL (via their SSO feature) and the companion app. Cleanest UX but needs agency-level SSO eligibility on the white-label domain.

**Option B — Launch Token:** GHL button mints a short-lived token with user + location context, companion app consumes it. Faster to ship but doesn't unify login.

**Option C — Magic Link (fallback):** Ship passwordless email sign-in now, link user to their GHL location via OAuth. Lowest risk, ships immediately, but users manage two sessions.

**My recommendation:** Start with Option C so we have something shippable, then validate Option A in parallel.

### Billing: Credit model

I'm proposing:
- Monthly subscription grants a base credit balance (250 for Starter, 500 for Pro, 2000 for Agency)
- Each AI action debits the ledger with a usage event
- GHL exports don't cost credits unless they include an AI step
- Paywalls surface before generation and on the billing screen

**Question for you:** Does the credit pricing feel right, or do you want to adjust the tiers before we build the ledger?

---

## What's Next (Sprint Asks)

1. Replace the mocked GHL handoff with a real draft-creation API call
2. Stand up the entitlement table and credit ledger in the backend
3. Pilot one user through a shared OIDC or launch-token flow

---

## How to Review

1. The prototype runs locally — `pnpm --filter @workspace/creator-360 dev` (PORT=5173, BASE_PATH=/)
2. Start at `/login`, then click through the sidebar
3. On the Create page, walk through the stepper: asset type → brief → generate → preview
4. On Edit & Import, click "Import to GHL" to see the handoff simulation
5. Check Billing for the credit balance, usage history, and plan cards
6. Check Connections for the auth settings and sync log
7. The Walkthrough page has the Tuesday demo agenda with links to each screen

---

## Sources

- [HighLevel OAuth 2.0](https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/index.html)
- [HighLevel External Authentication](https://marketplace.gohighlevel.com/docs/oauth/ExternalAuthentication)
- [HighLevel SSO](https://help.gohighlevel.com/support/solutions/articles/155000006556-single-sign-on-sso-on-highlevel)
