import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL_WIDE } from "@/lib/page-layout";

const connections = [
  {
    name: "GoHighLevel",
    icon: "link",
    status: "connected" as const,
    detail: "CC360 workspace · Last synced 2 hours ago",
    type: "OAuth 2.0",
  },
  {
    name: "Identity Provider",
    icon: "shield_person",
    status: "pending" as const,
    detail: "Shared OIDC provider — awaiting agency SSO setup",
    type: "OIDC SSO",
  },
  {
    name: "Stripe Billing",
    icon: "credit_card",
    status: "connected" as const,
    detail: "Pro plan · Active subscription",
    type: "API Key",
  },
];

const syncLog = [
  { id: "oauth-refresh", event: "OAuth token refreshed", time: "2 hours ago", status: "success" },
  { id: "contact-sync", event: "Contact sync completed", time: "6 hours ago", status: "success" },
  { id: "template-push", event: "Template push to GHL", time: "Yesterday", status: "success" },
  { id: "sso-check", event: "SSO config check", time: "2 days ago", status: "warning" },
];

export default function AuthSync() {
  return (
    <AppLayout>
      <div className={PAGE_SHELL_WIDE}>
        <h1 className="text-xl font-extrabold text-white sm:text-2xl">Connections & Auth</h1>
        <p className="mt-1 text-sm text-white/40">Manage integrations and authentication settings.</p>

        <div className="mt-6 space-y-3">
          {connections.map((conn) => (
            <div key={conn.name} className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-cc-surface px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex min-w-0 items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  conn.status === "connected" ? "bg-emerald-500/10" : "bg-amber-500/10"
                }`}>
                  <span className={`material-symbols-outlined text-xl ${
                    conn.status === "connected" ? "text-emerald-400" : "text-amber-400"
                  }`}>{conn.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-white">{conn.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      conn.status === "connected"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {conn.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/30">{conn.detail}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3 sm:justify-end">
                <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/30">{conn.type}</span>
                <button type="button" className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition hover:text-white">
                  {conn.status === "connected" ? "Configure" : "Set up"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-cc-surface">
            <div className="border-b border-white/5 px-4 py-4 sm:px-6">
              <h2 className="text-sm font-bold text-white">Sync Log</h2>
            </div>
            <div className="divide-y divide-white/5">
              {syncLog.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 px-4 py-3.5 sm:px-6">
                  <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${entry.status === "success" ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span className="min-w-0 flex-1 text-sm text-white/60">{entry.event}</span>
                  <span className="shrink-0 text-xs text-white/20">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Auth Method</h3>
              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-cc-primary/30 bg-cc-primary/5 p-3">
                  <input type="radio" name="auth" defaultChecked className="mt-0.5 accent-cc-primary" />
                  <div>
                    <p className="text-sm font-semibold text-white">Magic Link</p>
                    <p className="text-xs text-white/40">Passwordless email sign-in</p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 p-3 transition hover:border-white/15">
                  <input type="radio" name="auth" className="mt-0.5 accent-cc-primary" />
                  <div>
                    <p className="text-sm font-semibold text-white">Shared SSO</p>
                    <p className="text-xs text-white/40">Same OIDC provider as GHL</p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 p-3 transition hover:border-white/15">
                  <input type="radio" name="auth" className="mt-0.5 accent-cc-primary" />
                  <div>
                    <p className="text-sm font-semibold text-white">Launch Token</p>
                    <p className="text-xs text-white/40">GHL button mints a session token</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Workspace</h3>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-white/30">Location ID</span><span className="font-mono text-white/50">Cbjwl9dR...h8Oo</span></div>
                <div className="flex justify-between"><span className="text-white/30">API version</span><span className="text-white/50">v2</span></div>
                <div className="flex justify-between"><span className="text-white/30">Token type</span><span className="text-white/50">Private Integration</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
