import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface LeadMagnet {
  id: string;
  title: string;
  type: "checklist" | "guide" | "swipe-file" | "template" | "quiz";
  status: "draft" | "published";
  updatedAt: string;
  sections: MagnetSection[];
}

interface MagnetSection {
  id: string;
  label: string;
  content: string;
}

const typeLabels: Record<LeadMagnet["type"], string> = {
  checklist: "Checklist",
  guide: "Mini Guide",
  "swipe-file": "Swipe File",
  template: "Template Pack",
  quiz: "Quiz / Assessment",
};

const typeIcons: Record<LeadMagnet["type"], string> = {
  checklist: "checklist",
  guide: "menu_book",
  "swipe-file": "content_copy",
  template: "dashboard_customize",
  quiz: "quiz",
};

function blankSectionsForType(type: LeadMagnet["type"]): MagnetSection[] {
  switch (type) {
    case "checklist":
      return [
        { id: "title-hook", label: "Title & Hook", content: "" },
        { id: "intro", label: "Introduction", content: "" },
        { id: "items", label: "Checklist Items", content: "" },
        { id: "bonus", label: "Bonus Tip", content: "" },
        { id: "cta", label: "Next Step CTA", content: "" },
      ];
    case "guide":
      return [
        { id: "title-hook", label: "Title & Hook", content: "" },
        { id: "overview", label: "Overview", content: "" },
        { id: "steps", label: "Step-by-Step Content", content: "" },
        { id: "examples", label: "Examples & Screenshots", content: "" },
        { id: "cta", label: "Next Step CTA", content: "" },
      ];
    case "swipe-file":
      return [
        { id: "title-hook", label: "Title & Hook", content: "" },
        { id: "context", label: "When to Use", content: "" },
        { id: "swipes", label: "Swipe Copy", content: "" },
        { id: "customize", label: "How to Customize", content: "" },
        { id: "cta", label: "Next Step CTA", content: "" },
      ];
    case "template":
      return [
        { id: "title-hook", label: "Title & Hook", content: "" },
        { id: "overview", label: "What's Included", content: "" },
        { id: "templates", label: "Template Content", content: "" },
        { id: "instructions", label: "How to Use", content: "" },
        { id: "cta", label: "Next Step CTA", content: "" },
      ];
    case "quiz":
      return [
        { id: "title-hook", label: "Title & Hook", content: "" },
        { id: "intro", label: "Quiz Introduction", content: "" },
        { id: "questions", label: "Questions & Answers", content: "" },
        { id: "outcomes", label: "Result Buckets", content: "" },
        { id: "cta", label: "Next Step CTA", content: "" },
      ];
  }
}

const sampleMagnets: LeadMagnet[] = [
  {
    id: "lm1",
    title: "The 27-Point Course Launch Checklist",
    type: "checklist",
    status: "published",
    updatedAt: "2 days ago",
    sections: [
      { id: "title-hook", label: "Title & Hook", content: "The 27-Point Course Launch Checklist\nEverything you need before, during, and after launch day — so nothing falls through the cracks." },
      { id: "intro", label: "Introduction", content: "Launching a course is exciting but the number of moving pieces can be overwhelming. This checklist breaks the entire process into three phases so you always know what's next." },
      { id: "items", label: "Checklist Items", content: "PRE-LAUNCH (Days 1–14)\n☐ Validate topic with 5 audience interviews\n☐ Write course title and subtitle\n☐ Outline modules and lessons\n☐ Set pricing and payment gateway\n☐ Build sales page\n☐ Write 5-email launch sequence\n☐ Create social proof assets\n☐ Set up tracking pixels\n☐ Schedule launch emails\n\nLAUNCH WEEK\n☐ Send announcement email\n☐ Go live on social media\n☐ Host webinar or live Q&A\n☐ Send daily follow-up emails\n☐ Monitor analytics daily\n\nPOST-LAUNCH (Days 8–14)\n☐ Send survey to buyers\n☐ Collect testimonials\n☐ Analyze conversion data\n☐ Plan evergreen funnel" },
      { id: "bonus", label: "Bonus Tip", content: "Block off your entire launch week. Treat it like a product launch at a company — not a side project." },
      { id: "cta", label: "Next Step CTA", content: "Ready to go deeper? Book a free enrollment strategy call and we'll map out your personalized launch plan." },
    ],
  },
  {
    id: "lm2",
    title: "Email Subject Line Swipe File",
    type: "swipe-file",
    status: "draft",
    updatedAt: "6 hours ago",
    sections: [
      { id: "title-hook", label: "Title & Hook", content: "50 Proven Email Subject Lines for Course Creators\nCopy, paste, customize — and watch your open rates climb." },
      { id: "context", label: "When to Use", content: "" },
      { id: "swipes", label: "Swipe Copy", content: "" },
      { id: "customize", label: "How to Customize", content: "" },
      { id: "cta", label: "Next Step CTA", content: "" },
    ],
  },
];

const magnetTypes: { value: LeadMagnet["type"]; label: string; desc: string }[] = [
  { value: "checklist", label: "Checklist", desc: "Actionable step-by-step list" },
  { value: "guide", label: "Mini Guide", desc: "Short educational PDF" },
  { value: "swipe-file", label: "Swipe File", desc: "Copy-paste templates" },
  { value: "template", label: "Template Pack", desc: "Fillable frameworks" },
  { value: "quiz", label: "Quiz / Assessment", desc: "Interactive lead capture" },
];

export default function LeadMagnets() {
  const { toast } = useToast();
  const [magnets, setMagnets] = useState<LeadMagnet[]>(sampleMagnets);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);
  const activeMagnet = magnets.find((m) => m.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeMagnet) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, string> = {
        "title-hook": "The Ultimate Course Creator Checklist\nEverything you need to launch your first course — nothing left to guesswork.",
        intro: "Launching a course is exciting but the moving pieces can be overwhelming. This resource breaks it down into simple, actionable steps.",
        items: "Step 1: Validate your topic\nStep 2: Outline your modules\nStep 3: Build your sales page\nStep 4: Write your launch sequence\nStep 5: Go live",
        bonus: "Block off your entire launch week. Treat it like a product launch — not a side project.",
        cta: "Ready for the full system? Book a free strategy call and we'll map your personalized launch plan.",
        overview: "A complete breakdown of everything included in this resource and how to use it effectively.",
        steps: "Follow these steps in order for best results. Each step builds on the previous one.",
        examples: "Real examples from successful course creators who used this exact framework.",
        context: "Use these templates whenever you need to quickly draft high-converting copy for your launches.",
        swipes: "50 proven templates you can copy, paste, and customize for your audience.",
        customize: "Replace the bracketed text with your own details. Adjust tone to match your brand voice.",
        templates: "Ready-to-use templates for every stage of your launch process.",
        instructions: "Fill in the highlighted sections with your specific information. Each template includes guidance notes.",
        questions: "Q1: What best describes your current stage?\nQ2: What's your biggest challenge?\nQ3: How soon do you want to launch?",
        outcomes: "Result A: Ready to Launch\nResult B: Need More Prep\nResult C: Just Getting Started",
      };
      setMagnets((prev) =>
        prev.map((m) => {
          if (m.id !== activeId) return m;
          return { ...m, sections: m.sections.map((s) => s.content.trim() ? s : { ...s, content: sample[s.id] ?? "" }), updatedAt: "Just now" };
        }),
      );
      setGenerating(false);
      toast({ title: "Lead magnet generated", description: `Used ${creditCosts.leadMagnet} credits` });
    }, 2000);
  };

  const createMagnet = (type: LeadMagnet["type"]) => {
    const id = `lm${Date.now()}`;
    const newMagnet: LeadMagnet = {
      id,
      title: `Untitled ${typeLabels[type]}`,
      type,
      status: "draft",
      updatedAt: "Just now",
      sections: blankSectionsForType(type),
    };
    setMagnets([newMagnet, ...magnets]);
    setActiveId(id);
    setView("edit");
  };

  const openMagnet = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateTitle = (value: string) => {
    setMagnets((prev) => prev.map((m) => (m.id === activeId ? { ...m, title: value, updatedAt: "Just now" } : m)));
  };

  const updateSection = (sectionId: string, content: string) => {
    setMagnets((prev) =>
      prev.map((m) => {
        if (m.id !== activeId) return m;
        return { ...m, sections: m.sections.map((s) => (s.id === sectionId ? { ...s, content } : s)), updatedAt: "Just now" };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeMagnet?.status === "draft" ? "published" : "draft";
    setMagnets((prev) => prev.map((m) => (m.id === activeId ? { ...m, status: next as "draft" | "published", updatedAt: "Just now" } : m)));
    toast({ title: next === "published" ? "Lead magnet published" : "Reverted to draft" });
  };

  const filledCount = activeMagnet?.sections.filter((s) => s.content.trim().length > 0).length ?? 0;

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
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold text-white sm:text-2xl">Lead Magnets</h1>
              <p className="mt-1 text-sm text-white/40">Create downloadable guides, checklists, and swipe files to capture leads.</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {magnetTypes.map((mt) => (
                <button
                  key={mt.value}
                  onClick={() => createMagnet(mt.value)}
                  className="flex items-start gap-4 rounded-2xl border border-dashed border-white/10 p-5 text-left transition hover:border-white/20 hover:bg-white/[0.02]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                    <span className="material-symbols-outlined text-xl">{typeIcons[mt.value]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{mt.label}</p>
                    <p className="mt-0.5 text-xs text-white/40">{mt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {magnets.length > 0 && (
              <>
                <h2 className="mt-8 text-xs font-bold uppercase tracking-wider text-white/40">Your Lead Magnets</h2>
                <div className="mt-3 space-y-3">
                  {magnets.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => openMagnet(m.id)}
                      className="flex w-full flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-4 text-left transition hover:border-white/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3 sm:contents">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
                          <span className="material-symbols-outlined text-lg text-rose-400">{typeIcons[m.type]}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{m.title}</p>
                          <p className="mt-0.5 text-xs text-white/40">{typeLabels[m.type]}</p>
                        </div>
                        <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                      </div>
                      <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          m.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}>{m.status}</span>
                        <span className="whitespace-nowrap text-[10px] text-white/30">{m.updatedAt}</span>
                        <span className="material-symbols-outlined hidden text-lg text-white/20 sm:block">chevron_right</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {view === "edit" && activeMagnet && (
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
                    value={activeMagnet.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    className="w-full bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20 sm:text-xl"
                    placeholder="Lead magnet title"
                  />
                  <p className="text-xs text-white/30">{typeLabels[activeMagnet.type]}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pl-11 lg:min-w-0 lg:flex-1 lg:justify-end lg:pl-0">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-cc-primary/10 px-2.5 py-1.5 text-xs font-semibold text-cc-primary transition hover:bg-cc-primary/20 disabled:opacity-50 sm:px-3"
                >
                  <span className={`material-symbols-outlined shrink-0 text-sm ${generating ? "animate-spin" : ""}`}>{generating ? "progress_activity" : "auto_awesome"}</span>
                  {generating ? "Generating..." : "Generate"}
                </button>
                <button
                  type="button"
                  onClick={() => toast({ title: "Exported to GHL", description: "Lead magnet pushed to your GoHighLevel workspace." })}
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:px-3"
                >
                  <span className="material-symbols-outlined shrink-0 text-sm">publish</span>
                  <span className="sm:hidden">Export</span>
                  <span className="hidden sm:inline">Export to GHL</span>
                </button>
                <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  activeMagnet.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>{activeMagnet.status}</span>
                <button
                  type="button"
                  onClick={togglePublish}
                  className={`min-h-[36px] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                    activeMagnet.status === "draft"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  }`}
                >
                  <span className="sm:hidden">{activeMagnet.status === "draft" ? "Publish" : "Revert"}</span>
                  <span className="hidden sm:inline">{activeMagnet.status === "draft" ? "Publish" : "Revert to Draft"}</span>
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {filledCount} of {activeMagnet.sections.length} sections filled
              </div>
            </div>

            <div className="space-y-4">
              {activeMagnet.sections.map((section, i) => (
                <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                  <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/10 text-[10px] font-bold text-rose-400">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white">{section.label}</h3>
                    {section.content.trim().length > 0 && (
                      <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={section.content}
                    onChange={(e) => updateSection(section.id, e.target.value)}
                    placeholder={`Write your ${section.label.toLowerCase()}...`}
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
