# CC360 Companion App — Auth & Billing Evidence Memo

**Date:** April 6, 2026
**Author:** Canyon Smith
**Purpose:** Go / No-Go evidence for the CC360 Studio Companion App. Delivers proof-backed answers on whether the companion app can share GHL's existing authentication and billing infrastructure, with proposed alternatives where the answer is no.

---

## 1. Authentication — Can the companion app share GHL's existing login?

### Answer: No — not directly

Sharing a native GoHighLevel login session with an external companion app is **not a supported path** in the GHL public documentation. However, there are clean alternatives that produce a near-identical user experience.

### Evidence

Three official GHL documentation sources were investigated:

**Source 1 — [HighLevel OAuth 2.0](https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/index.html)**
GHL OAuth 2.0 is documented as an *app install and API authorization* flow. It grants API access tokens so a marketplace app can act on behalf of a location. It is not designed to hand off a browser session or authenticate an end user into a third-party app.

**Source 2 — [HighLevel External Authentication](https://marketplace.gohighlevel.com/docs/oauth/ExternalAuthentication)**
"External Authentication" is the reverse of what we need: it allows GHL to authenticate against a *developer's* system during app install. It does not allow a third-party app to use GHL as its identity provider.

**Source 3 — [HighLevel SSO](https://help.gohighlevel.com/support/solutions/articles/155000006556-single-sign-on-sso-on-highlevel)**
GHL SSO lets an agency configure one external OIDC identity provider for their white-label domain. This means the realistic shared-login path is "same external IdP across both systems," not "reuse GHL's native credentials or cookies."

### What was tested

- Searched GHL marketplace docs, developer docs, and support articles for any session-sharing, cookie-sharing, or identity-provider mechanism.
- Examined the GHL OAuth token flow to determine if it could double as an authentication assertion (it cannot — the token is scoped to API access, not user identity).
- Reviewed GHL SSO to determine if it can serve as a bridge between GHL and an external app (it can, but only through a shared external IdP).

### Proposed path

| Priority | Option | Description | Ships when |
|----------|--------|-------------|------------|
| Start here | **Magic Link (passwordless)** | Companion app sends a one-time login link via email. Zero external dependencies. User manages two sessions but friction is minimal. | Immediately |
| Validate in parallel | **Shared OIDC Provider** | One IdP (e.g. Auth0, Clerk) serves both GHL SSO and the companion app. True single sign-on. Requires the agency to be eligible for GHL SSO on the white-label domain. | 2–4 weeks to validate |
| Fallback bridge | **Launch Token** | GHL button mints a short-lived token with user + location context, companion app consumes it. Faster than full OIDC but doesn't unify login. | 1–2 weeks |

### Risk assessment

Low. Magic link is a zero-dependency, zero-risk auth method that can ship day one. OIDC validation runs in parallel without blocking the main build.

### Next steps

1. Confirm the CC360 agency is eligible for GHL SSO on the white-label domain.
2. Pilot one internal user through the shared IdP across both GHL and the companion app.
3. Validate whether a GHL-side custom menu link can mint a short-lived companion session token with user and location context.

---

## 2. Billing — Can the companion app share GHL's existing credit card info?

### Answer: No

We should **not** plan on reusing raw credit card data or payment methods from GHL directly inside the companion app.

### Evidence

**Finding 1 — CC360 subscriptions are already Stripe-backed.**
Customer subscriptions created under the CC360 GHL sub-account are processed through GHL Payments, which uses Stripe as the underlying payment processor. Each GHL subscription response includes both a GHL internal subscription ID and a Stripe `sub_...` ID.

**Finding 2 — GHL does not expose the necessary write scopes.**
Operational subscription management (cancellations, plan changes) is already performed directly in Stripe because the GHL API does not currently expose the write scopes needed for subscription lifecycle management through the marketplace OAuth flow.

**Finding 3 — PCI compliance boundary.**
Even if GHL exposed payment method data, sharing raw card information across systems would create PCI compliance obligations that are unnecessary when Stripe already handles tokenization and billing for both systems.

### What was tested

- Investigated GHL Payments API to determine if stored payment methods can be accessed or reused by an external app (they cannot).
- Confirmed through internal ops that subscription cancellation is already done in Stripe, not through GHL's API.
- Reviewed the GHL marketplace OAuth scopes to determine if any billing-related write access is available (it is not currently exposed).

### Proposed path

| Priority | Option | Description |
|----------|--------|-------------|
| Primary | **Stripe as billing source of truth** | Keep Stripe as the single billing backend. Mirror entitlement state into both the companion app and GHL. Track AI credits in the companion app's own database. |
| Fallback | **Separate top-up checkout** | If unified entitlements aren't ready at launch, the companion app runs its own Stripe checkout for credit top-ups while displaying linked subscription status from the existing Stripe subscriptions. |

### Credit model

- Monthly subscription grants a base credit balance (Starter: 250, Pro: 500, Agency: 2,000).
- Each AI action writes a debit event with user, asset type, and action metadata.
- GHL exports do not cost credits unless an additional premium AI step runs during export.
- Paywalls surface before expensive generation jobs and on the Billing & Credits screen.

### Risk assessment

Low. Stripe is already the operational billing backend. The companion app simply needs its own entitlement table and credit ledger, both of which are standard implementations.

### Next steps

1. Stand up the entitlement table and credit ledger in the companion app backend.
2. Wire the billing page to real Stripe checkout sessions for credit top-ups.
3. Sync subscription status from existing Stripe subscriptions into the companion app.

---

## 3. Go / No-Go Recommendation

### Recommendation: GO

Both hard questions (auth and billing) have clear, buildable alternatives. Neither is a blocker.

| Question | Can we share directly? | Blocker? | Alternative |
|----------|----------------------|----------|-------------|
| Auth (shared login) | No | No | Magic link ships immediately; shared OIDC validated in parallel |
| Billing (shared cards) | No | No | Stripe is already the source of truth; companion gets its own ledger |

### Starting architecture

- **Auth:** Magic-link passwordless login, with parallel validation of shared OIDC for true SSO.
- **Billing:** Stripe-direct billing with a companion-owned credit ledger and entitlement table.
- **Dashboard:** Live and editable (delivered this sprint).

### Next sprint priorities

1. Replace the mocked GHL handoff with a real draft-creation API call.
2. Stand up the entitlement table and credit ledger in the backend.
3. Pilot one internal user through shared OIDC or launch-token flow.
4. Wire billing page to real Stripe checkout.

---

## Sources

- [HighLevel OAuth 2.0](https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/index.html)
- [HighLevel External Authentication](https://marketplace.gohighlevel.com/docs/oauth/ExternalAuthentication)
- [HighLevel SSO](https://help.gohighlevel.com/support/solutions/articles/155000006556-single-sign-on-sso-on-highlevel)
- Internal ops: GHL subscription responses include Stripe `sub_...` IDs; cancellation performed in Stripe directly
- CC360 GHL sub-account company ID: `Cbjwl9dRdmiskYlzh8Oo`
