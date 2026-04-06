export type ChecklistItem = {
  title: string;
  detail: string;
  status: "done" | "next";
};

export type SourceLink = {
  label: string;
  href: string;
};

export const weeklyDefinitionOfDone: ChecklistItem[] = [
  {
    title: "Clickable prototype shell exists in code",
    detail:
      "The demo covers login, dashboard, create, edit/import, billing, auth, and walkthrough routes with mocked data.",
    status: "done",
  },
  {
    title: "Stockton can react to the structure and branding",
    detail:
      "The shell now presents the core companion-app surfaces instead of generic placeholder pages.",
    status: "done",
  },
  {
    title: "Auth feasibility has a clear yes/no answer and fallback",
    detail:
      "The app documents that native GHL session sharing is not the supported path and recommends a shared IdP or passwordless fallback.",
    status: "done",
  },
  {
    title: "Billing feasibility has a clear yes/no answer and fallback",
    detail:
      "The app documents Stripe-backed entitlements plus an app-owned credit ledger instead of raw card reuse from GHL.",
    status: "done",
  },
  {
    title: "One app-to-GHL import flow is specified end to end",
    detail:
      "This demo uses an email draft handoff into GHL as the first concrete flow to estimate and build next.",
    status: "done",
  },
  {
    title: "Tuesday walkthrough is ready",
    detail:
      "A dedicated walkthrough route calls out what is complete, what is proven, and the first next sprint tasks.",
    status: "done",
  },
];

export const prototypeMetrics = [
  { label: "Prototype routes", value: "6", detail: "Login plus five in-app surfaces" },
  { label: "Chosen asset flow", value: "Email", detail: "Draft -> edit -> send to GHL" },
  { label: "Billing model", value: "Stripe + credits", detail: "Unified experience, separate ledger" },
  { label: "Auth model", value: "Shared IdP / magic link", detail: "No direct GHL-native session reuse" },
];

export const featuredAsset = {
  name: "Spring Enrollment Nurture",
  type: "5-email conversion sequence",
  audience: "Warm leads who downloaded the course launch checklist",
  promise: "Move subscribers from curiosity to application call within 7 days",
  creditsCost: 18,
  destination: "GHL Email Template + workflow draft",
};

export const draftSteps = [
  {
    title: "Brief",
    detail: "Choose asset type, audience, offer, and conversion goal.",
  },
  {
    title: "Generate",
    detail: "Use mocked AI credits to spin up the first draft and metadata.",
  },
  {
    title: "Review",
    detail: "Tune the subject line, CTA, voice, and compliance notes.",
  },
  {
    title: "Handoff",
    detail: "Push the approved asset into the matching GHL destination and keep a deep link for final polish.",
  },
];

export const importFlow = [
  {
    stage: "1. Create inside the companion app",
    detail:
      "The user writes the brief, picks the offer, and generates a draft email sequence with app-owned version history.",
  },
  {
    stage: "2. Approve the final draft",
    detail:
      "The user edits the draft, reviews the CTA and brand notes, and marks the asset ready for handoff.",
  },
  {
    stage: "3. Transform to a GHL-ready payload",
    detail:
      "The backend maps the asset to the target GHL template shape, preserving subject, body, tags, and campaign metadata.",
  },
  {
    stage: "4. Import into GHL",
    detail:
      "The companion app creates or updates a draft asset in GHL and stores the returned asset ID for future sync.",
  },
  {
    stage: "5. Deep-link the user into final review",
    detail:
      "After import, the user lands on the matching GHL record to finish QA, scheduling, or workflow placement.",
  },
];

export const authSources: SourceLink[] = [
  {
    label: "HighLevel OAuth 2.0 docs",
    href: "https://marketplace.gohighlevel.com/docs/Authorization/OAuth2.0/index.html",
  },
  {
    label: "HighLevel External Authentication docs",
    href: "https://marketplace.gohighlevel.com/docs/oauth/ExternalAuthentication",
  },
  {
    label: "HighLevel SSO support article",
    href: "https://help.gohighlevel.com/support/solutions/articles/155000006556-single-sign-on-sso-on-highlevel",
  },
];

export const authDecision = {
  headline: "Do not count on a direct GHL-native session share for the companion app.",
  summary:
    "The documented GHL flows cover app authorization and GHL consuming an external OIDC provider, not GHL acting as an identity provider for a third-party companion app.",
  primary:
    "Use one shared external OIDC identity provider for both the companion app and HighLevel SSO when the agency prerequisites are available.",
  fallback:
    "If shared OIDC is not ready, ship passwordless magic-link sign-in in the companion app and link the user's GHL location through OAuth or a launch token.",
  nextTests: [
    "Confirm the agency is eligible for HighLevel SSO on the white-label domain.",
    "Pilot one shared IdP user across GHL and the companion app.",
    "Validate how a GHL-side launch button should mint a short-lived companion session token.",
  ],
};

export const billingDecision = {
  headline: "Treat Stripe as the billing source of truth and keep credits in the companion app.",
  summary:
    "The safest production path is a unified billing experience backed by Stripe entitlements, while AI credits are tracked in an app-owned ledger keyed to the same customer or location.",
  primary:
    "Mirror subscription state from Stripe into both the companion app and GHL instead of trying to reuse raw card data from GHL.",
  fallback:
    "If a single Stripe-backed entitlement service is not ready, let the companion app run its own top-up checkout while displaying the linked GHL subscription status.",
  paywallMoments: [
    "Before draft generation when the requested job exceeds the remaining credit balance.",
    "Before premium rewrite or export actions that should consume add-on credits.",
    "Inside Billing & Credits so the user always has a recovery path without leaving the app.",
  ],
  creditLedger: [
    "Monthly subscription grants a base credit balance.",
    "Each AI action records a debit event with asset ID, user ID, and prompt category.",
    "Exports to GHL do not spend credits unless the export includes a premium AI step.",
  ],
};

export const creditBundles = [
  { label: "Starter grant", value: "250 credits", detail: "Included with the core subscription each cycle" },
  { label: "Sequence draft", value: "18 credits", detail: "Generate a 5-email nurture campaign" },
  { label: "Rewrite pass", value: "6 credits", detail: "Voice or CTA optimization on one asset" },
  { label: "Top-up pack", value: "500 credits", detail: "One-click add-on when the paywall appears" },
];

export const demoAgenda = [
  "Open the login route and explain the fallback auth experience.",
  "Land on the dashboard and show the Definition of Done and chosen asset flow.",
  "Walk through Create Asset, then jump into Edit & Import.",
  "Pause on Billing & Credits and Auth & Sync to explain the hard decisions.",
  "Finish on Tuesday Demo with proven items, open questions, and next sprint asks.",
];

export const nextSprint = [
  "Replace the mocked handoff button with a real GHL draft-creation API call.",
  "Stand up the entitlement table and credit ledger in the backend.",
  "Pilot a shared OIDC provider or launch-token flow with one internal account.",
];
