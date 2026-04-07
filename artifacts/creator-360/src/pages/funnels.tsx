import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface FunnelStep {
  id: string;
  label: string;
  content: string;
}

interface Funnel {
  id: string;
  title: string;
  status: "draft" | "published";
  updatedAt: string;
  steps: FunnelStep[];
}

const blankSteps: FunnelStep[] = [
  { id: "opt-in", label: "Opt-in Page", content: "" },
  { id: "sales", label: "Sales Page", content: "" },
  { id: "order-bump", label: "Order Bump", content: "" },
  { id: "upsell", label: "Upsell Page", content: "" },
  { id: "thank-you", label: "Thank You Page", content: "" },
];

const sampleFunnels: Funnel[] = [
  {
    id: "f1",
    title: "Spring Enrollment Funnel",
    status: "published",
    updatedAt: "1 day ago",
    steps: [
      {
        id: "opt-in",
        label: "Opt-in Page",
        content:
          "Headline: Get the Free Course Launch Roadmap\nSubhead: The same framework 200+ creators used to enroll their first cohort this spring.\n\nBullets:\n• Map your curriculum in one sitting\n• Know exactly what to say on your sales page\n• A 7-day email path from lead to buyer\n\nCTA: Send me the roadmap — instant PDF download",
      },
      {
        id: "sales",
        label: "Sales Page",
        content:
          "Spring Enrollment Accelerator — Enroll Your First Cohort in 6 Weeks\n\nYou already teach. What you need is a launch that actually fills seats.\n\nInside: weekly live calls, plug-and-play templates, and a done-with-you sprint so you ship your course and collect payment — without drowning in tech.\n\nInvestment: $1,497 one-time or 3 payments of $549. 30-day action guarantee.\n\nPrimary CTA: Reserve my seat — cohort closes Friday",
      },
      {
        id: "order-bump",
        label: "Order Bump",
        content:
          "Add the Launch Email Vault for $97 (normally $197)\n\n50+ swipe-ready emails for cart open, reminders, and last-chance — written specifically for course creators. One checkbox at checkout.",
      },
      {
        id: "upsell",
        label: "Upsell Page",
        content:
          "Upgrade to VIP: Private Enrollment Review Call\n\nAfter checkout, lock in a 45-minute 1:1 where we tighten your offer, pricing, and first-week emails. Only 12 spots per cohort.\n\nYes, add VIP — $297 | No thanks, take me to my receipt",
      },
      {
        id: "thank-you",
        label: "Thank You Page",
        content:
          "You're in — welcome to Spring Enrollment Accelerator.\n\nCheck your inbox for login details and Week 0 prep. Office hours are Tuesdays at 12pm ET.\n\nNext step: join the community channel and introduce yourself — we kick off Monday.",
      },
    ],
  },
  {
    id: "f2",
    title: "Webinar Registration Funnel",
    status: "draft",
    updatedAt: "5 hours ago",
    steps: [
      {
        id: "opt-in",
        label: "Opt-in Page",
        content:
          "Free Live Training: Fill Your Webinar Waitlist in 14 Days\n\nFor course creators who are tired of empty registrant lists. You'll leave with a repeatable promotion plan.\n\nSave my seat — Wed, Apr 9 at 11am PT",
      },
      {
        id: "sales",
        label: "Sales Page",
        content:
          "Webinar Registration Funnel Blueprint\n\nWe'll walk through the exact pages, emails, and reminders we use to get 40–60% show-up rates — and how to transition viewers into your core offer.\n\nSpots are limited to keep Q&A high-quality.",
      },
      { id: "order-bump", label: "Order Bump", content: "" },
      { id: "upsell", label: "Upsell Page", content: "" },
      { id: "thank-you", label: "Thank You Page", content: "" },
    ],
  },
];

export default function Funnels() {
  const { toast } = useToast();
  const [funnels, setFunnels] = useState<Funnel[]>(sampleFunnels);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const activeFunnel = funnels.find((f) => f.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeFunnel) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, string> = {
        "opt-in":
          "Headline: Your Free Course Creator Starter Kit\nSubhead: Outline your first profitable course in one afternoon.\n\nCTA: Download the kit — no credit card",
        sales:
          "Enroll in the Course Creator Lab — go from idea to outline to launch plan in 4 weeks. Includes templates, weekly coaching, and peer feedback.\n\nJoin today — $997",
        "order-bump":
          "Add the Email Launch Scripts for $47 at checkout — 12 plug-and-play emails for your first launch.",
        upsell:
          "Fast-track with a private strategy session ($197). We'll review your offer and funnel on a 30-minute call.",
        "thank-you":
          "Thanks for enrolling. Check your email for access. Your first module unlocks immediately — start with the Offer Clarity worksheet.",
      };
      setFunnels((prev) =>
        prev.map((f) => {
          if (f.id !== activeId) return f;
          return {
            ...f,
            steps: f.steps.map((s) => (s.content.trim() ? s : { ...s, content: sample[s.id] ?? "" })),
            updatedAt: "Just now",
          };
        }),
      );
      setGenerating(false);
      toast({ title: "Funnel generated", description: `Used ${creditCosts.landingPage} credits` });
    }, 2000);
  };

  const createFunnel = () => {
    const id = `f${Date.now()}`;
    const newFunnel: Funnel = {
      id,
      title: "Untitled Funnel",
      status: "draft",
      updatedAt: "Just now",
      steps: blankSteps.map((s) => ({ ...s })),
    };
    setFunnels([newFunnel, ...funnels]);
    setActiveId(id);
    setView("edit");
  };

  const openFunnel = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateTitle = (value: string) => {
    setFunnels((prev) => prev.map((f) => (f.id === activeId ? { ...f, title: value, updatedAt: "Just now" } : f)));
  };

  const updateStep = (stepId: string, content: string) => {
    setFunnels((prev) =>
      prev.map((f) => {
        if (f.id !== activeId) return f;
        return {
          ...f,
          steps: f.steps.map((s) => (s.id === stepId ? { ...s, content } : s)),
          updatedAt: "Just now",
        };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeFunnel?.status === "draft" ? "published" : "draft";
    setFunnels((prev) =>
      prev.map((f) => (f.id === activeId ? { ...f, status: next as "draft" | "published", updatedAt: "Just now" } : f)),
    );
    toast({ title: next === "published" ? "Funnel published" : "Reverted to draft" });
  };

  const filledCount = activeFunnel?.steps.filter((s) => s.content.trim().length > 0).length ?? 0;
  const totalSteps = activeFunnel?.steps.length ?? 0;
  const progressPct = totalSteps > 0 ? Math.round((filledCount / totalSteps) * 100) : 0;

  return (
    <AppLayout>
      <div className={PAGE_SHELL}>
        {view === "list" && (
          <>
            <div className="mb-1">
              <Link href="/studio">
                <span className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-white/30 transition hover:text-white/60">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  AI Studio
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Funnel Builder</h1>
                <p className="mt-1 text-sm text-white/40">Design opt-in through thank-you flows for your course launches.</p>
              </div>
              <button
                onClick={createFunnel}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New Funnel
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {funnels.map((f) => {
                const filled = f.steps.filter((s) => s.content.trim().length > 0).length;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => openFunnel(f.id)}
                    className="flex w-full flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-4 text-left transition hover:border-white/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3 sm:contents">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cc-primary/10">
                        <span className="material-symbols-outlined text-lg text-cc-primary">account_tree</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{f.title}</p>
                        <p className="mt-0.5 text-xs text-white/40">
                          {filled} of {f.steps.length} steps filled
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                    </div>
                    <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          f.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {f.status}
                      </span>
                      <span className="whitespace-nowrap text-[10px] text-white/30">{f.updatedAt}</span>
                      <span className="material-symbols-outlined hidden text-lg text-white/20 sm:block">chevron_right</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {view === "edit" && activeFunnel && (
          <>
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <div className="min-w-0 flex-1">
                  <input
                    value={activeFunnel.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    className="w-full bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20 sm:text-xl"
                    placeholder="Funnel title"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pl-11 lg:min-w-0 lg:flex-1 lg:justify-end lg:pl-0">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-cc-primary/10 px-2.5 py-1.5 text-xs font-semibold text-cc-primary transition hover:bg-cc-primary/20 disabled:opacity-50 sm:px-3"
                >
                  <span className={`material-symbols-outlined shrink-0 text-sm ${generating ? "animate-spin" : ""}`}>
                    {generating ? "progress_activity" : "auto_awesome"}
                  </span>
                  {generating ? "Generating..." : "Generate"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast({ title: "Exported to GHL", description: "Funnel pushed to your GoHighLevel workspace." })
                  }
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:px-3"
                >
                  <span className="material-symbols-outlined shrink-0 text-sm">publish</span>
                  <span className="sm:hidden">Export</span>
                  <span className="hidden sm:inline">Export to GHL</span>
                </button>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    activeFunnel.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {activeFunnel.status}
                </span>
                <button
                  type="button"
                  onClick={togglePublish}
                  className={`min-h-[36px] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                    activeFunnel.status === "draft"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  }`}
                >
                  <span className="sm:hidden">{activeFunnel.status === "draft" ? "Publish" : "Revert"}</span>
                  <span className="hidden sm:inline">{activeFunnel.status === "draft" ? "Publish" : "Revert to Draft"}</span>
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2 text-xs text-white/30">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {filledCount} of {totalSteps} steps filled
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cc-primary transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {activeFunnel.steps.map((step, i) => (
                <div key={step.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                  <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/10 text-[10px] font-bold text-indigo-400">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white">{step.label}</h3>
                    {step.content.trim().length > 0 && (
                      <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={step.content}
                    onChange={(e) => updateStep(step.id, e.target.value)}
                    placeholder={`Write your ${step.label.toLowerCase()} copy...`}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cc-primary/50"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
