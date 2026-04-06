import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { featuredAsset } from "@/lib/companion-demo-data";

const recentAssets = [
  { name: "Spring Enrollment Nurture", type: "Email Sequence", status: "Draft", credits: 18, updatedAt: "2 hours ago" },
  { name: "Webinar Follow-Up", type: "Email", status: "Imported", credits: 6, updatedAt: "Yesterday" },
  { name: "Course Launch Teaser", type: "Landing Page", status: "In Review", credits: 24, updatedAt: "3 days ago" },
];

const quickActions = [
  { label: "New Email Sequence", icon: "mail", href: "/studio/create", color: "bg-blue-500/10 text-blue-400" },
  { label: "New Landing Page", icon: "web", href: "/studio/create", color: "bg-purple-500/10 text-purple-400" },
  { label: "Import to GHL", icon: "publish", href: "/cc360", color: "bg-emerald-500/10 text-emerald-400" },
  { label: "Buy Credits", icon: "add_circle", href: "/billing", color: "bg-amber-500/10 text-amber-400" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Good morning, Canyon</h1>
            <p className="mt-1 text-sm text-white/50">Here's what's happening with your content today.</p>
          </div>
          <Link href="/studio">
            <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
              <span className="material-symbols-outlined text-lg">add</span>
              Create Asset
            </span>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">Credit Balance</p>
              <span className="material-symbols-outlined text-lg text-emerald-400">account_balance_wallet</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">232</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
              <div className="h-full w-[46%] rounded-full bg-gradient-to-r from-cc-primary to-blue-400" />
            </div>
            <p className="mt-2 text-xs text-white/40">of 500 monthly credits</p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">Assets Created</p>
              <span className="material-symbols-outlined text-lg text-blue-400">auto_awesome</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">12</p>
            <p className="mt-2 text-xs text-emerald-400">+3 this week</p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">GHL Imports</p>
              <span className="material-symbols-outlined text-lg text-purple-400">publish</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">8</p>
            <p className="mt-2 text-xs text-white/40">Last sync 2h ago</p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">Active Campaigns</p>
              <span className="material-symbols-outlined text-lg text-amber-400">campaign</span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">3</p>
            <p className="mt-2 text-xs text-white/40">2 scheduled, 1 live</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-white/8 bg-cc-surface">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="text-sm font-bold text-white">Recent Assets</h2>
              <button className="text-xs font-medium text-cc-primary hover:underline">View all</button>
            </div>
            <div className="divide-y divide-white/5">
              {recentAssets.map((asset) => (
                <Link key={asset.name} href="/cc360">
                  <div className="flex cursor-pointer items-center gap-4 px-6 py-4 transition hover:bg-white/[0.02]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cc-primary/10">
                      <span className="material-symbols-outlined text-lg text-cc-primary">
                        {asset.type === "Email Sequence" ? "mail" : asset.type === "Email" ? "draft" : "web"}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{asset.name}</p>
                      <p className="text-xs text-white/40">{asset.type} &middot; {asset.credits} credits used</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        asset.status === "Imported" ? "bg-emerald-500/10 text-emerald-400" :
                        asset.status === "Draft" ? "bg-amber-500/10 text-amber-400" :
                        "bg-blue-500/10 text-blue-400"
                      }`}>
                        {asset.status}
                      </span>
                      <p className="mt-1 text-[10px] text-white/30">{asset.updatedAt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Quick Actions</h3>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-white/5 p-4 transition hover:border-white/10 ${action.color}`}>
                      <span className="material-symbols-outlined text-xl">{action.icon}</span>
                      <span className="text-center text-[10px] font-semibold leading-tight">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-cc-primary/20 bg-gradient-to-b from-cc-primary/5 to-transparent p-5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-lg text-cc-primary">rocket_launch</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Current Flow</h3>
                  <p className="mt-1 text-xs text-white/50">{featuredAsset.name}</p>
                  <p className="mt-0.5 text-[10px] text-white/30">{featuredAsset.type}</p>
                  <Link href="/studio/create">
                    <span className="mt-3 inline-block cursor-pointer text-xs font-semibold text-cc-primary hover:underline">
                      Continue editing &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">GHL Sync Status</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-white/60">Connected to CC360 workspace</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-white/60">OAuth token active</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-xs text-white/60">1 asset pending import</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
