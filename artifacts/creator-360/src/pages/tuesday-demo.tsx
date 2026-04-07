import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { weeklyDefinitionOfDone, demoAgenda, nextSprint } from "@/lib/companion-demo-data";

export default function TuesdayDemo() {
  return (
    <AppLayout>
      <div className={PAGE_SHELL}>
        <div className="mb-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cc-primary/10">
            <span className="material-symbols-outlined text-xl text-cc-primary">slideshow</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-white sm:text-2xl">Tuesday Walkthrough</h1>
            <p className="text-sm text-white/40">Week of April 7, 2026</p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-6">
          <h2 className="text-sm font-bold text-white mb-4">Demo Agenda</h2>
          <div className="space-y-2">
            {demoAgenda.map((item, i) => {
              const routes = ["/login", "/", "/ai-studio", "/cc360", "/courses", "/affiliate"];
              return (
                <Link key={item} href={routes[i] || "/"}>
                  <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 px-4 py-3 transition hover:border-cc-primary/30 hover:bg-white/[0.02]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cc-primary/10 text-xs font-bold text-cc-primary">{i + 1}</span>
                    <span className="text-sm text-white/60">{item}</span>
                    <span className="material-symbols-outlined ml-auto text-sm text-white/15">chevron_right</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-cc-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-emerald-400">check_circle</span>
              <h2 className="text-sm font-bold text-white">Completed This Week</h2>
            </div>
            <div className="space-y-2">
              {weeklyDefinitionOfDone.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 text-sm text-emerald-400">check</span>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/30">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-cc-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-amber-400">arrow_forward</span>
              <h2 className="text-sm font-bold text-white">Next Sprint Asks</h2>
            </div>
            <div className="space-y-2">
              {nextSprint.map((item) => (
                <div key={item} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 text-sm text-white/20">radio_button_unchecked</span>
                    <p className="text-sm text-white/60">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-cc-primary/20 bg-cc-primary/5 p-4">
              <p className="text-xs font-semibold text-cc-primary">Key Question for Stockton</p>
              <p className="mt-1 text-sm text-white/50">
                Which auth path should we invest in first — shared OIDC or the GHL launch-token flow?
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
