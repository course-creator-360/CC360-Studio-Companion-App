import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";

const usageHistory = [
  { id: "gen-spring-enroll", action: "Email sequence generated", asset: "Spring Enrollment Nurture", credits: 18, date: "Today" },
  { id: "rewrite-webinar", action: "Rewrite pass", asset: "Webinar Follow-Up", credits: 6, date: "Yesterday" },
  { id: "gen-launch-teaser", action: "Landing page generated", asset: "Course Launch Teaser", credits: 24, date: "Apr 3" },
  { id: "gen-welcome-4", action: "Email generated", asset: "Welcome Sequence #4", credits: 4, date: "Apr 2" },
  { id: "rewrite-onboard", action: "Rewrite pass", asset: "Onboarding Email", credits: 6, date: "Apr 1" },
];

const plans = [
  { name: "Starter", credits: 250, price: 29, current: false },
  { name: "Pro", credits: 500, price: 79, current: true },
  { name: "Agency", credits: 2000, price: 199, current: false },
];

export default function Billing() {
  const [showTopUp, setShowTopUp] = useState(false);

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-6xl px-8 py-8">
        <h1 className="text-2xl font-extrabold text-white">Billing & Credits</h1>
        <p className="mt-1 text-sm text-white/40">Manage your subscription and AI credit usage.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="col-span-2 rounded-2xl border border-white/8 bg-cc-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">Current Balance</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-white">232</span>
                  <span className="mb-1 text-sm text-white/30">/ 500 credits</span>
                </div>
              </div>
              <button
                onClick={() => setShowTopUp(!showTopUp)}
                className="rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Buy credits
              </button>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-white/5">
              <div className="h-full w-[46%] rounded-full bg-gradient-to-r from-cc-primary to-blue-400" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/30">
              <span>268 used this cycle</span>
              <span>Resets May 1</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-cc-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">Current Plan</p>
            <p className="mt-2 text-2xl font-extrabold text-white">Pro</p>
            <p className="text-sm text-white/40">$79/month</p>
            <div className="mt-4 h-px bg-white/5" />
            <div className="mt-3 space-y-1.5 text-xs text-white/40">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-xs text-emerald-400">check</span> 500 credits/month</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-xs text-emerald-400">check</span> Unlimited GHL imports</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-xs text-emerald-400">check</span> Priority generation</div>
            </div>
          </div>
        </div>

        {showTopUp && (
          <div className="mt-4 rounded-2xl border border-cc-primary/20 bg-cc-primary/5 p-6">
            <h3 className="text-sm font-bold text-white">Add more credits</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { amount: 100, price: 9 },
                { amount: 500, price: 39 },
                { amount: 1000, price: 69 },
              ].map((pack) => (
                <button key={pack.amount} className="rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cc-primary/40">
                  <p className="text-lg font-extrabold text-white">{pack.amount} credits</p>
                  <p className="text-sm text-white/40">${pack.price} one-time</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-white/8 bg-cc-surface">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <h2 className="text-sm font-bold text-white">Usage History</h2>
              <span className="text-xs text-white/30">This billing cycle</span>
            </div>
            <div className="divide-y divide-white/5">
              {usageHistory.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cc-primary/10">
                    <span className="material-symbols-outlined text-sm text-cc-primary">auto_awesome</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{item.action}</p>
                    <p className="text-xs text-white/30">{item.asset}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">-{item.credits}</p>
                    <p className="text-[10px] text-white/20">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Plans</h3>
              <div className="mt-4 space-y-2">
                {plans.map((plan) => (
                  <div key={plan.name} className={`rounded-xl border p-3 ${plan.current ? "border-cc-primary/30 bg-cc-primary/5" : "border-white/8"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{plan.name}</p>
                        <p className="text-xs text-white/30">{plan.credits} credits/mo</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">${plan.price}</p>
                        {plan.current && <span className="text-[10px] font-semibold text-cc-primary">Current</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Payment Method</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-8 w-12 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-white/50">VISA</div>
                <div>
                  <p className="text-sm text-white">•••• 4242</p>
                  <p className="text-[10px] text-white/30">Expires 12/27</p>
                </div>
              </div>
              <button className="mt-3 text-xs font-medium text-cc-primary hover:underline">Update payment method</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
