import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { featuredAsset } from "@/lib/companion-demo-data";

const assetTypes = [
  { label: "Email Sequence", icon: "mail", desc: "Multi-touch nurture campaign" },
  { label: "Single Email", icon: "draft", desc: "One-off broadcast or follow-up" },
  { label: "Landing Page", icon: "web", desc: "Opt-in or sales page copy" },
  { label: "SMS Campaign", icon: "sms", desc: "Short-form text messages" },
];

const generatedEmails = [
  { id: "email-first-step", subject: "You already took the first step", preview: "Reset the promise and make the next step obvious. Remind them why they downloaded the checklist and bridge to the application call." },
  { id: "email-holding-back", subject: "The #1 thing holding your launch back", preview: "Handle the biggest buying objection early. Address the fear that they're not ready, and reframe the call as a clarity session." },
  { id: "email-case-study", subject: "How Sarah filled 47 seats in 11 days", preview: "Add proof and a concrete client outcome. Short case study that mirrors the subscriber's situation." },
  { id: "email-deadline", subject: "Spots are filling — here's what happens next", preview: "Create deadline pressure without sounding desperate. Show remaining availability and what happens after the window closes." },
  { id: "email-last-chance", subject: "Last chance: your enrollment plan call", preview: "Final CTA with a short application link. Direct, warm, and action-focused. One button, one outcome." },
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

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setStep("preview");
      toast({ title: "Sequence generated", description: `Used ${featuredAsset.creditsCost} credits` });
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
      <div className="mx-auto w-full max-w-5xl px-8 py-8">
        <div className="mb-8 flex items-center gap-2">
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
              {i < steps.length - 1 && <div className="h-px w-8 bg-white/10" />}
            </div>
          ))}
        </div>

        {step === "type" && (
          <div>
            <h1 className="text-2xl font-extrabold text-white">What do you want to create?</h1>
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
              <h1 className="text-2xl font-extrabold text-white">Describe your asset</h1>
              <p className="mt-1 text-sm text-white/40">The AI will use this context to generate your {assetTypes[selectedType].label.toLowerCase()}.</p>
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
              <p className="mt-3 text-3xl font-extrabold text-white">{featuredAsset.creditsCost}</p>
              <p className="text-xs text-white/40">credits</p>
              <div className="mt-4 h-px bg-white/5" />
              <div className="mt-4 space-y-2 text-xs text-white/40">
                <div className="flex justify-between"><span>5 emails</span><span>15 cr</span></div>
                <div className="flex justify-between"><span>Subject lines</span><span>2 cr</span></div>
                <div className="flex justify-between"><span>Metadata</span><span>1 cr</span></div>
              </div>
              <div className="mt-4 h-px bg-white/5" />
              <p className="mt-3 text-xs text-white/30">Balance after: 214 credits</p>
            </div>
          </div>
        )}

        {step === "generate" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {generating ? (
              <>
                <div className="mb-6 h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-cc-primary" />
                <h2 className="text-xl font-extrabold text-white">Generating your sequence...</h2>
                <p className="mt-2 text-sm text-white/40">Creating 5 emails tailored to your brief</p>
              </>
            ) : (
              <>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cc-primary/10">
                  <span className="material-symbols-outlined text-3xl text-cc-primary">auto_awesome</span>
                </div>
                <h2 className="text-xl font-extrabold text-white">Ready to generate</h2>
                <p className="mt-2 max-w-md text-sm text-white/40">
                  This will create a {assetTypes[selectedType].label.toLowerCase()} using {featuredAsset.creditsCost} credits from your balance.
                </p>
                <div className="mt-8 flex gap-3">
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">{featuredAsset.name}</h1>
                <p className="mt-1 text-sm text-white/40">5-email conversion sequence &middot; {featuredAsset.creditsCost} credits used</p>
              </div>
              <Link href="/cc360">
                <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
                  <span className="material-symbols-outlined text-lg">edit</span>
                  Edit &amp; Import
                </span>
              </Link>
            </div>
            <div className="space-y-3">
              {generatedEmails.map((email, i) => (
                <div key={email.id} className="rounded-2xl border border-white/8 bg-cc-surface p-5 transition hover:border-white/15">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cc-primary/10 text-xs font-bold text-cc-primary">
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{email.subject}</p>
                      <p className="mt-1 text-sm text-white/40">{email.preview}</p>
                    </div>
                    <button className="text-white/20 transition hover:text-white">
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
