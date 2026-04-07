import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

const assetTypes = [
  {
    label: "Email Sequence",
    icon: "mail",
    desc: "Multi-touch nurture campaign",
    cost: creditCosts.emailSequence,
    breakdown: [
      { label: "5 emails", cr: 15 },
      { label: "Subject lines", cr: 2 },
      { label: "Metadata", cr: 1 },
    ],
    generatingLabel: "Generating your sequence...",
    generatingDetail: "Creating 5 emails tailored to your brief",
    previewLabel: "5-email conversion sequence",
    items: [
      { id: "e1", title: "You already took the first step", body: "Reset the promise and make the next step obvious. Remind them why they downloaded the checklist and bridge to the application call." },
      { id: "e2", title: "The #1 thing holding your launch back", body: "Handle the biggest buying objection early. Address the fear that they're not ready, and reframe the call as a clarity session." },
      { id: "e3", title: "How Sarah filled 47 seats in 11 days", body: "Add proof and a concrete client outcome. Short case study that mirrors the subscriber's situation." },
      { id: "e4", title: "Spots are filling — here's what happens next", body: "Create deadline pressure without sounding desperate. Show remaining availability and what happens after the window closes." },
      { id: "e5", title: "Last chance: your enrollment plan call", body: "Final CTA with a short application link. Direct, warm, and action-focused. One button, one outcome." },
    ],
  },
  {
    label: "Single Email",
    icon: "draft",
    desc: "One-off broadcast or follow-up",
    cost: creditCosts.singleEmail,
    breakdown: [
      { label: "Email body", cr: 4 },
      { label: "Subject line", cr: 1 },
      { label: "Metadata", cr: 1 },
    ],
    generatingLabel: "Generating your email...",
    generatingDetail: "Crafting a single high-converting email",
    previewLabel: "Single broadcast email",
    items: [
      { id: "se1", title: "Your spring enrollment game plan", body: "A standalone broadcast that combines urgency, social proof, and a clear CTA into one concise message for warm leads." },
    ],
  },
  {
    label: "Landing Page",
    icon: "web",
    desc: "Opt-in or sales page copy",
    cost: creditCosts.landingPage,
    breakdown: [
      { label: "Hero + headline", cr: 3 },
      { label: "Body sections", cr: 6 },
      { label: "CTA blocks", cr: 3 },
    ],
    generatingLabel: "Generating your landing page...",
    generatingDetail: "Building headline, sections, and CTA copy",
    previewLabel: "Landing page copy",
    items: [
      { id: "lp1", title: "Hero Headline", body: "Launch Your Course in 6 Weeks — Even If You're Starting From Scratch. The step-by-step accelerator that takes you from idea to first enrollment." },
      { id: "lp2", title: "Problem Section", body: "You've got the expertise but the tech, the marketing, and the launch plan feel overwhelming. Every week you delay is another week of revenue left on the table." },
      { id: "lp3", title: "Solution & Benefits", body: "A 6-week guided program with templates, live coaching calls, and a done-with-you launch sprint. Walk away with a live course and paying students." },
      { id: "lp4", title: "Social Proof", body: "\"I filled 47 seats in 11 days using the exact playbook from this program.\" — Sarah M., Career Coach. 200+ creators launched. $2.4M+ in student revenue generated." },
      { id: "lp5", title: "Final CTA", body: "Book your free enrollment strategy call — limited to 20 spots this cohort. One button, one outcome, zero risk." },
    ],
  },
  {
    label: "SMS Campaign",
    icon: "sms",
    desc: "Short-form text messages",
    cost: creditCosts.sms,
    breakdown: [
      { label: "3 messages", cr: 6 },
      { label: "Personalization", cr: 2 },
    ],
    generatingLabel: "Generating your SMS campaign...",
    generatingDetail: "Writing 3 short-form messages for your campaign",
    previewLabel: "3-message SMS campaign",
    items: [
      { id: "sms1", title: "Message 1 — Opener", body: "Hey {{first_name}}, quick reminder: the spring enrollment accelerator opens next week. Want me to save you a spot? Reply YES." },
      { id: "sms2", title: "Message 2 — Social proof", body: "{{first_name}}, Sarah filled 47 seats in 11 days with this exact system. Only 8 spots left for this cohort. Grab yours → [link]" },
      { id: "sms3", title: "Message 3 — Final nudge", body: "Last call, {{first_name}}. Enrollment closes tonight at midnight. If you're serious about launching, this is the fastest path → [link]" },
    ],
  },
];

export default function CreateAsset() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState(0);
  const [step, setStep] = useState<"type" | "brief" | "generate" | "preview">("type");
  const [generating, setGenerating] = useState(false);

  const [brief, setBrief] = useState({
    offer: "Spring enrollment accelerator",
    audience: "Warm leads who downloaded the course launch checklist in the last 14 days",
    voice: "Confident, grounded, conversion-focused",
    cta: "Book an application call",
  });

  const current = assetTypes[selectedType];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setStep("preview");
      toast({ title: `${current.label} generated`, description: `Used ${current.cost} credits` });
    }, 2000);
  };

  const steps = [
    { key: "type", label: "Asset Type" },
    { key: "brief", label: "Brief" },
    { key: "generate", label: "Generate" },
    { key: "preview", label: "Preview" },
  ] as const;

  const currentIdx = steps.findIndex((s) => s.key === step);

  return (
    <AppLayout>
      <div className={PAGE_SHELL}>
        <div className="mb-3">
          <Link href="/studio">
            <span className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-white/30 transition hover:text-white/60">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              AI Studio
            </span>
          </Link>
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-3">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                onClick={() => { if (i <= currentIdx) setStep(s.key); }}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  s.key === step ? "bg-cc-primary text-white" :
                  i < currentIdx ? "bg-cc-primary/10 text-cc-primary cursor-pointer" :
                  "bg-white/5 text-white/30"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">
                  {i < currentIdx ? "✓" : i + 1}
                </span>
                {s.label}
              </button>
              {i < steps.length - 1 && <div className="hidden h-px w-6 bg-white/10 sm:block sm:w-8" />}
            </div>
          ))}
        </div>

        {step === "type" && (
          <div>
            <h1 className="text-xl font-extrabold text-white sm:text-2xl">What do you want to create?</h1>
            <p className="mt-1 text-sm text-white/40">Choose an asset type to get started.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {assetTypes.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setSelectedType(i)}
                  className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition ${
                    selectedType === i
                      ? "border-cc-primary/40 bg-cc-primary/5"
                      : "border-white/8 bg-cc-surface hover:border-white/15"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    selectedType === i ? "bg-cc-primary/15 text-cc-primary" : "bg-white/5 text-white/40"
                  }`}>
                    <span className="material-symbols-outlined text-xl">{t.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.label}</p>
                    <p className="mt-0.5 text-xs text-white/40">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("brief")}
              className="mt-6 rounded-xl bg-cc-primary px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Continue
            </button>
          </div>
        )}

        {step === "brief" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Describe your {current.label.toLowerCase()}</h1>
              <p className="mt-1 text-sm text-white/40">The AI will use this context to generate your {current.label.toLowerCase()}.</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="offer" className="mb-1.5 block text-xs font-semibold text-white/50">Offer or Topic</label>
                  <input id="offer" value={brief.offer} onChange={(e) => setBrief({ ...brief, offer: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cc-primary/50" />
                </div>
                <div>
                  <label htmlFor="audience" className="mb-1.5 block text-xs font-semibold text-white/50">Target Audience</label>
                  <textarea id="audience" rows={3} value={brief.audience} onChange={(e) => setBrief({ ...brief, audience: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cc-primary/50" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="voice" className="mb-1.5 block text-xs font-semibold text-white/50">Brand Voice</label>
                    <input id="voice" value={brief.voice} onChange={(e) => setBrief({ ...brief, voice: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cc-primary/50" />
                  </div>
                  <div>
                    <label htmlFor="cta" className="mb-1.5 block text-xs font-semibold text-white/50">Primary CTA</label>
                    <input id="cta" value={brief.cta} onChange={(e) => setBrief({ ...brief, cta: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cc-primary/50" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep("type")} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 transition hover:text-white">Back</button>
                <button onClick={() => setStep("generate")} className="rounded-xl bg-cc-primary px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110">Continue</button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-cc-surface p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Estimated Cost</h3>
              <p className="mt-3 text-3xl font-extrabold text-white">{current.cost}</p>
              <p className="text-xs text-white/40">credits</p>
              <div className="mt-4 h-px bg-white/5" />
              <div className="mt-4 space-y-2 text-xs text-white/40">
                {current.breakdown.map((b) => (
                  <div key={b.label} className="flex justify-between"><span>{b.label}</span><span>{b.cr} cr</span></div>
                ))}
              </div>
              <div className="mt-4 h-px bg-white/5" />
              <p className="mt-3 text-xs text-white/30">Balance after: {232 - current.cost} credits</p>
            </div>
          </div>
        )}

        {step === "generate" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {generating ? (
              <>
                <div className="mb-6 h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-cc-primary" />
                <h2 className="text-xl font-extrabold text-white">{current.generatingLabel}</h2>
                <p className="mt-2 text-sm text-white/40">{current.generatingDetail}</p>
              </>
            ) : (
              <>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cc-primary/10">
                  <span className="material-symbols-outlined text-3xl text-cc-primary">auto_awesome</span>
                </div>
                <h2 className="text-xl font-extrabold text-white">Ready to generate</h2>
                <p className="mt-2 max-w-md text-sm text-white/40">
                  This will create a {current.label.toLowerCase()} using {current.cost} credits from your balance.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => setStep("brief")} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 transition hover:text-white">Edit brief</button>
                  <button onClick={handleGenerate} className="flex items-center gap-2 rounded-xl bg-cc-primary px-6 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    Generate now
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step === "preview" && (
          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold text-white sm:text-2xl">{brief.offer}</h1>
                <p className="mt-1 text-sm text-white/40">{current.previewLabel} &middot; {current.cost} credits used</p>
              </div>
              <Link href="/cc360">
                <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto">
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit &amp; Import
                </span>
              </Link>
            </div>
            <div className="space-y-3">
              {current.items.map((item, i) => (
                <div key={item.id} className="rounded-2xl border border-white/8 bg-cc-surface p-5 transition hover:border-white/15">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cc-primary/10 text-xs font-bold text-cc-primary">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-white/40">{item.body}</p>
                    </div>
                    <button
                      onClick={() => toast({ title: "Edit mode coming soon", description: "Inline editing will be available in the next sprint." })}
                      className="text-white/20 transition hover:text-white"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
