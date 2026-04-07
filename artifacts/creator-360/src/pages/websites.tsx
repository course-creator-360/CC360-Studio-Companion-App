import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface Website {
  id: string;
  title: string;
  niche: string;
  status: "draft" | "published";
  updatedAt: string;
  pages: SitePage[];
}

interface SitePage {
  id: string;
  label: string;
  sections: SiteSection[];
}

interface SiteSection {
  id: string;
  label: string;
  content: string;
}

function blankPages(): SitePage[] {
  return [
    {
      id: "home",
      label: "Home",
      sections: [
        { id: "hero", label: "Hero Headline & CTA", content: "" },
        { id: "value-props", label: "Value Propositions", content: "" },
        { id: "social-proof", label: "Social Proof", content: "" },
        { id: "features", label: "Features / Services", content: "" },
        { id: "final-cta", label: "Final CTA", content: "" },
      ],
    },
    {
      id: "about",
      label: "About",
      sections: [
        { id: "story", label: "Brand Story", content: "" },
        { id: "mission", label: "Mission & Values", content: "" },
        { id: "team", label: "Team / Founder Bio", content: "" },
      ],
    },
    {
      id: "services",
      label: "Services / Programs",
      sections: [
        { id: "overview", label: "Services Overview", content: "" },
        { id: "details", label: "Program Details", content: "" },
        { id: "pricing", label: "Pricing", content: "" },
        { id: "cta", label: "Enrollment CTA", content: "" },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      sections: [
        { id: "intro", label: "Contact Intro", content: "" },
        { id: "form-fields", label: "Form Fields", content: "" },
        { id: "info", label: "Location & Hours", content: "" },
      ],
    },
  ];
}

const sampleSites: Website[] = [
  {
    id: "ws1",
    title: "Course Creator Accelerator",
    niche: "Online education for aspiring course creators",
    status: "published",
    updatedAt: "1 day ago",
    pages: [
      {
        id: "home",
        label: "Home",
        sections: [
          { id: "hero", label: "Hero Headline & CTA", content: "Launch Your Course in 6 Weeks\nThe accelerator program that takes you from idea to first enrollment — with zero guesswork.\n\nCTA: Apply Now" },
          { id: "value-props", label: "Value Propositions", content: "Validated curriculum framework\nDone-with-you launch sprint\nProven email + webinar funnel templates\nWeekly live coaching calls" },
          { id: "social-proof", label: "Social Proof", content: "200+ creators launched\n$2.4M+ in student revenue generated\n4.9/5 average rating" },
          { id: "features", label: "Features / Services", content: "6-week structured program\nPrivate community access\nLifetime template library\n1-on-1 launch review call" },
          { id: "final-cta", label: "Final CTA", content: "Ready to launch? Book your free enrollment strategy call today." },
        ],
      },
      {
        id: "about",
        label: "About",
        sections: [
          { id: "story", label: "Brand Story", content: "We started as course creators ourselves — struggling with the same tech overwhelm and launch anxiety. After helping 200+ creators launch successfully, we turned our process into a repeatable system." },
          { id: "mission", label: "Mission & Values", content: "Mission: Make course creation accessible to every expert who has knowledge worth sharing.\nValues: Clarity over complexity, outcomes over curriculum, community over competition." },
          { id: "team", label: "Team / Founder Bio", content: "" },
        ],
      },
      {
        id: "services",
        label: "Services / Programs",
        sections: [
          { id: "overview", label: "Services Overview", content: "Two programs designed for different stages of your course creation journey." },
          { id: "details", label: "Program Details", content: "Accelerator (6 weeks): For first-time creators. Idea validation through launch.\nScale Program (12 weeks): For existing creators ready to build an evergreen funnel." },
          { id: "pricing", label: "Pricing", content: "Accelerator: $1,497 or 3x $547\nScale Program: $2,997 or 4x $847" },
          { id: "cta", label: "Enrollment CTA", content: "Apply for your spot — limited to 20 creators per cohort." },
        ],
      },
      {
        id: "contact",
        label: "Contact",
        sections: [
          { id: "intro", label: "Contact Intro", content: "Have questions about the program? We'd love to hear from you." },
          { id: "form-fields", label: "Form Fields", content: "Name, Email, Current business stage, What's your biggest course creation challenge?" },
          { id: "info", label: "Location & Hours", content: "100% online — support available Mon–Fri 9am–5pm EST" },
        ],
      },
    ],
  },
  {
    id: "ws2",
    title: "Coaching Practice Website",
    niche: "Executive coaching for tech leaders",
    status: "draft",
    updatedAt: "3 hours ago",
    pages: blankPages(),
  },
];

export default function Websites() {
  const { toast } = useToast();
  const [sites, setSites] = useState<Website[]>(sampleSites);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activePageId, setActivePageId] = useState<string>("home");

  const [generating, setGenerating] = useState(false);
  const activeSite = sites.find((s) => s.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeSite) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, Record<string, string>> = {
        home: { hero: "Transform Your Expertise Into a Thriving Online Course\nThe proven system for experts ready to teach. CTA: Get Started", "value-props": "Structured curriculum framework\nDone-with-you launch sprint\nProven funnel templates\nWeekly coaching calls", "social-proof": "200+ courses launched\n$2.4M+ student revenue\n4.9/5 average rating", features: "6-week program\nPrivate community\nTemplate library\nLaunch review call", "final-cta": "Ready to launch? Book your free strategy call today." },
        about: { story: "We started as course creators, struggling with the same tech overwhelm. After helping 200+ creators launch, we turned our process into a repeatable system.", mission: "Mission: Make course creation accessible to every expert.\nValues: Clarity over complexity, outcomes over curriculum.", team: "Founded by educators and marketers who have built and sold millions in online courses." },
        services: { overview: "Programs designed for every stage of your course creation journey.", details: "Accelerator (6 weeks): Idea validation through launch.\nScale Program (12 weeks): Build an evergreen funnel.", pricing: "Accelerator: $1,497\nScale: $2,997", cta: "Apply for your spot — limited to 20 per cohort." },
        contact: { intro: "Questions about the program? We'd love to hear from you.", "form-fields": "Name, Email, Business stage, Biggest challenge", info: "100% online — support Mon–Fri 9am–5pm EST" },
      };
      setSites((prev) =>
        prev.map((s) => {
          if (s.id !== activeId) return s;
          const pages = s.pages.map((p) => ({
            ...p,
            sections: p.sections.map((sec) => sec.content.trim() ? sec : { ...sec, content: sample[p.id]?.[sec.id] ?? "" }),
          }));
          return { ...s, pages, updatedAt: "Just now" };
        }),
      );
      setGenerating(false);
      toast({ title: "Website generated", description: `Used ${creditCosts.website} credits` });
    }, 2000);
  };
  const activeSitePage = activeSite?.pages.find((p) => p.id === activePageId) ?? null;

  const createSite = () => {
    const id = `ws${Date.now()}`;
    const newSite: Website = {
      id,
      title: "Untitled Website",
      niche: "",
      status: "draft",
      updatedAt: "Just now",
      pages: blankPages(),
    };
    setSites([newSite, ...sites]);
    setActiveId(id);
    setActivePageId("home");
    setView("edit");
  };

  const openSite = (id: string) => {
    setActiveId(id);
    setActivePageId("home");
    setView("edit");
  };

  const updateField = (field: "title" | "niche", value: string) => {
    setSites((prev) => prev.map((s) => (s.id === activeId ? { ...s, [field]: value, updatedAt: "Just now" } : s)));
  };

  const updateSection = (pageId: string, sectionId: string, content: string) => {
    setSites((prev) =>
      prev.map((s) => {
        if (s.id !== activeId) return s;
        const pages = s.pages.map((p) => {
          if (p.id !== pageId) return p;
          return { ...p, sections: p.sections.map((sec) => (sec.id === sectionId ? { ...sec, content } : sec)) };
        });
        return { ...s, pages, updatedAt: "Just now" };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeSite?.status === "draft" ? "published" : "draft";
    setSites((prev) => prev.map((s) => (s.id === activeId ? { ...s, status: next as "draft" | "published", updatedAt: "Just now" } : s)));
    toast({ title: next === "published" ? "Website published" : "Reverted to draft" });
  };

  const totalSections = activeSite?.pages.reduce((sum, p) => sum + p.sections.length, 0) ?? 0;
  const filledSections = activeSite?.pages.reduce((sum, p) => sum + p.sections.filter((s) => s.content.trim().length > 0).length, 0) ?? 0;

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
              <div className="min-w-0">
                <h1 className="text-xl font-extrabold text-white sm:text-2xl">AI Websites</h1>
                <p className="mt-1 text-sm text-white/40">Generate full website copy and structure for any niche.</p>
              </div>
              <button
                type="button"
                onClick={createSite}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New Website
              </button>
            </div>

            {sites.length === 0 ? (
              <div className="mt-16 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <span className="material-symbols-outlined text-3xl text-white/20">language</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">No websites yet</h2>
                <p className="mt-1 text-sm text-white/40">Create your first AI website to get started.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {sites.map((s) => {
                  const filled = s.pages.reduce((sum, p) => sum + p.sections.filter((sec) => sec.content.trim().length > 0).length, 0);
                  const total = s.pages.reduce((sum, p) => sum + p.sections.length, 0);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => openSite(s.id)}
                      className="flex w-full flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-4 text-left transition hover:border-white/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3 sm:contents">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                          <span className="material-symbols-outlined text-lg text-cyan-400">language</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{s.title}</p>
                          <p className="mt-0.5 text-xs text-white/40">{s.pages.length} pages &middot; {filled}/{total} sections filled</p>
                        </div>
                        <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                      </div>
                      <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          s.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}>{s.status}</span>
                        <span className="whitespace-nowrap text-[10px] text-white/30">{s.updatedAt}</span>
                        <span className="material-symbols-outlined hidden text-lg text-white/20 sm:block">chevron_right</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view === "edit" && activeSite && (
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
                    value={activeSite.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20 sm:text-xl"
                    placeholder="Website title"
                  />
                  <input
                    value={activeSite.niche}
                    onChange={(e) => updateField("niche", e.target.value)}
                    className="mt-0.5 w-full bg-transparent text-xs text-white/30 outline-none placeholder:text-white/15"
                    placeholder="Describe the niche or industry..."
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
                  <span className={`material-symbols-outlined shrink-0 text-sm ${generating ? "animate-spin" : ""}`}>{generating ? "progress_activity" : "auto_awesome"}</span>
                  {generating ? "Generating..." : "Generate"}
                </button>
                <button
                  type="button"
                  onClick={() => toast({ title: "Exported to GHL", description: "Website pushed to your GoHighLevel workspace." })}
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:px-3"
                >
                  <span className="material-symbols-outlined shrink-0 text-sm">publish</span>
                  <span className="sm:hidden">Export</span>
                  <span className="hidden sm:inline">Export to GHL</span>
                </button>
                <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  activeSite.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>{activeSite.status}</span>
                <button
                  type="button"
                  onClick={togglePublish}
                  className={`min-h-[36px] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                    activeSite.status === "draft"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  }`}
                >
                  <span className="sm:hidden">{activeSite.status === "draft" ? "Publish" : "Revert"}</span>
                  <span className="hidden sm:inline">{activeSite.status === "draft" ? "Publish" : "Revert to Draft"}</span>
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface px-4 py-3 sm:flex-row sm:items-center sm:gap-2 sm:px-5">
              <div className="flex shrink-0 items-center gap-2 text-xs text-white/30">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {filledSections} of {totalSections} sections filled
              </div>
              <div className="flex min-w-0 flex-1 flex-wrap gap-1 sm:justify-end">
                {activeSite.pages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePageId(p.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-3 sm:text-xs ${
                      activePageId === p.id
                        ? "bg-cc-primary text-white"
                        : "text-white/40 hover:bg-white/5 hover:text-white/60"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {activeSitePage && (
              <div className="space-y-4">
                {activeSitePage.sections.map((section, i) => (
                  <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                    <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/10 text-[10px] font-bold text-cyan-400">
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
                      onChange={(e) => updateSection(activeSitePage.id, section.id, e.target.value)}
                      placeholder={`Write your ${section.label.toLowerCase()}...`}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cc-primary/50"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
