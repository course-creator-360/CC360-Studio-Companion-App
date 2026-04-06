# Companion App Weekly Deliverable

## Weekly Definition of Done

- A clickable prototype shell exists in code for login, dashboard, create, edit/import, billing, auth, and Tuesday demo surfaces.
- Stockton can review the structure, naming, and branding direction instead of static mockups.
- Auth feasibility has a clear answer, a recommended path, and a low-friction fallback.
- Billing feasibility has a clear answer, a recommended path, and a credit/paywall model.
- One app-to-GHL import flow is mapped end to end with enough detail to estimate the real build.
- A short Tuesday walkthrough exists with completed work, proven assumptions, open questions, and next sprint asks.

## Chosen Demo Asset

- Asset: `Spring Enrollment Nurture`
- Type: `5-email conversion sequence`
- Handoff target: `GHL Email Template + workflow draft`
- Why this flow: email is easier to explain, easier to deep-link into final review, and keeps the first import path narrow.

## Authentication Feasibility

### Decision

Directly sharing a native GHL login session with an external companion app is not the supported path in the public docs.

### Why

- HighLevel OAuth 2.0 is documented as an app install and API authorization flow, not a browser-session handoff from GHL into a third-party app.
- HighLevel "External Authentication" is about HighLevel authenticating against a developer's system during app install, not a third-party app using GHL as its identity provider.
- HighLevel SSO is documented as HighLevel consuming one external OIDC identity provider per agency. That means the realistic shared-login answer is "same external IdP across both systems," not "reuse GHL's native credentials/cookies."

### Recommendation

- Primary: use one shared external OIDC provider for both the companion app and HighLevel SSO.
- Fallback: ship passwordless magic-link sign-in in the companion app, then link the user to their GHL location with OAuth or a short-lived launch token.

### Next Tests

- Confirm the agency is eligible for HighLevel SSO on the white-label domain.
- Pilot one internal user across the shared IdP, HighLevel, and the companion app.
- Validate a GHL-side launch action that mints a short-lived companion session token with user and location context.

## Billing And Credits Feasibility

### Decision

Do not plan on reusing raw cards from GHL directly inside the companion app.

### Why

- CC360 customer subscriptions are already backed by Stripe under GHL Payments.
- Internal ops guidance confirms GHL subscription responses include both a GHL internal subscription ID and a Stripe `sub_...` ID, and operational cancellation is done in Stripe because the necessary GHL write scope is not currently exposed.
- Even when the customer experience looks unified, the clean technical source of truth should be Stripe entitlements plus an app-owned usage ledger.

### Recommendation

- Primary: keep Stripe as the billing source of truth, mirror entitlement state into the companion app and GHL, and track AI credits in the companion app database.
- Fallback: if unified entitlements are not ready, let the companion app run a separate top-up checkout while still showing linked subscription status from GHL or Stripe.

### Credit Model

- Monthly subscription grants a base credit balance.
- Each AI action writes a debit event with user, asset, and action type.
- Exports to GHL should not spend credits unless an additional premium AI step runs during export.
- Paywalls should appear before expensive generation jobs and on the Billing & Credits screen.

## App-To-GHL Import Flow

### Flow

1. User creates the email sequence brief in the companion app.
2. The companion app generates a draft and stores version history locally.
3. The user edits and approves the final draft.
4. The backend transforms the asset into a GHL-ready draft payload.
5. The companion app creates or updates the destination asset in GHL and stores the returned GHL asset ID.
6. The user is deep-linked into GHL for final QA, scheduling, or workflow attachment.

### What The First Real Build Needs

- A persisted asset record with local version history.
- A mapping layer from companion asset schema to the target GHL draft schema.
- A stored foreign key for the created GHL asset.
- A "resume in GHL" deep link and clear ownership of final edits.

## Tuesday Walkthrough

### Route Order

1. `/login`
2. `/`
3. `/ai-studio`
4. `/cc360`
5. `/courses`
6. `/affiliate`
7. `/templates`

### Talk Track

- Show the login experience and explain the fallback auth story.
- Show the dashboard and Definition of Done so the team sees what "done this week" means.
- Walk through create -> edit -> import using the chosen email asset.
- Pause on billing and auth pages to explain the two hardest feasibility decisions.
- End on the Tuesday demo page with next sprint asks.

## Sources

- [HighLevel OAuth 2.0](https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/index.html)
- [HighLevel External Authentication](https://marketplace.gohighlevel.com/docs/oauth/ExternalAuthentication)
- [HighLevel SSO support article](https://help.gohighlevel.com/support/solutions/articles/155000006556-single-sign-on-sso-on-highlevel)
