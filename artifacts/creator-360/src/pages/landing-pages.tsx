import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

interface LandingPage {
  id: string;
  title: string;
  type: "opt-in" | "sales" | "webinar" | "waitlist";
  status: "draft" | "published";
  updatedAt: string;
  sections: PageSection[];
}

interface PageSection {
  id: string;
  label: string;
  content: string;
}

const typeLabels: Record<LandingPage["type"], string> = {
  "opt-in": "Opt-in Page",
  sales: "Sales Page",
  webinar: "Webinar Registration",
  waitlist: "Waitlist Page",
};

const blankSections: PageSection[] = [
  { id: "headline", label: "Headline & Sub-headline", content: "" },
  { id: "hero", label: "Hero Section", content: "" },
  { id: "problem", label: "Problem / Pain", content: "" },
  { id: "solution", label: "Solution / Offer", content: "" },
  { id: "benefits", label: "Benefits & Bullets", content: "" },
  { id: "social-proof", label: "Social Proof", content: "" },
  { id: "cta", label: "Call to Action", content: "" },
];

const samplePages: LandingPage[] = [
  {
    id: "lp1",
    title: "Spring Enrollment Accelerator",
    type: "sales",
    status: "published",
    updatedAt: "1 day ago",
    sections: [
      { id: "headline", label: "Headline & Sub-headline", content: "Launch Your Course in 6 Weeks — Even If You're Starting From Scratch\nThe step-by-step accelerator that takes you from idea to first enrollment." },
      { id: "hero", label: "Hero Section", content: "Join 200+ creators who used the Spring Enrollment Accelerator to fill their first cohort. No tech headaches, no guessing — just a proven system." },
      { id: "problem", label: "Problem / Pain", content: "You've got the expertise but the tech, the marketing, and the launch plan feel overwhelming. Every week you delay is another week of revenue left on the table." },
      { id: "solution", label: "Solution / Offer", content: "A 6-week guided program with templates, live coaching calls, and a done-with-you launch sprint. You'll walk away with a live course and paying students." },
      { id: "benefits", label: "Benefits & Bullets", content: "Validated course topic in week 1\nComplete curriculum mapped by week 3\nSales page and email sequence built by week 5\nLive launch with real enrollments in week 6" },
      { id: "social-proof", label: "Social Proof", content: "\"I filled 47 seats in 11 days using the exact playbook from this program.\" — Sarah M., Career Coach" },
      { id: "cta", label: "Call to Action", content: "Book your free enrollment strategy call → Limited to 20 spots this cohort" },
    ],
  },
  {
    id: "lp2",
    title: "Course Launch Checklist Opt-in",
    type: "opt-in",
    status: "draft",
    updatedAt: "4 hours ago",
    sections: [
      { id: "headline", label: "Headline & Sub-headline", content: "The 27-Point Course Launch Checklist\nEverything you need before, during, and after launch day." },
      { id: "hero", label: "Hero Section", content: "Download the free checklist that 500+ course creators use to launch without missing a step." },
      { id: "problem", label: "Problem / Pain", content: "" },
      { id: "solution", label: "Solution / Offer", content: "" },
      { id: "benefits", label: "Benefits & Bullets", content: "" },
      { id: "social-proof", label: "Social Proof", content: "" },
      { id: "cta", label: "Call to Action", content: "" },
    ],
  },
];

const pageTypes: { value: LandingPage["type"]; label: string; icon: string; desc: string }[] = [
  { value: "opt-in", label: "Opt-in Page", icon: "person_add", desc: "Capture leads with a free offer" },
  { value: "sales", label: "Sales Page", icon: "storefront", desc: "Long-form page that sells a product" },
  { value: "webinar", label: "Webinar Registration", icon: "videocam", desc: "Drive sign-ups for a live event" },
  { value: "waitlist", label: "Waitlist Page", icon: "schedule", desc: "Build anticipation before launch" },
];

export default function LandingPages() {
  const { toast } = useToast();
  const [pages, setPages] = useState<LandingPage[]>(samplePages);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);

  const activePage = pages.find((p) => p.id === activeId) ?? null;

  const createPage = (type: LandingPage["type"]) => {
    const id = `lp${Date.now()}`;
    const newPage: LandingPage = {
      id,
      title: `Untitled ${typeLabels[type]}`,
      type,
      status: "draft",
      updatedAt: "Just now",
      sections: blankSections.map((s) => ({ ...s })),
    };
    setPages([newPage, ...pages]);
    setActiveId(id);
    setView("edit");
  };

  const openPage = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateField = (field: "title", value: string) => {
    setPages((prev) => prev.map((p) => (p.id === activeId ? { ...p, [field]: value, updatedAt: "Just now" } : p)));
  };

  const updateSection = (sectionId: string, content: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== activeId) return p;
        return { ...p, sections: p.sections.map((s) => (s.id === sectionId ? { ...s, content } : s)), updatedAt: "Just now" };
      }),
    );
  };

  const togglePublish = () => {
    const next = activePage?.status === "draft" ? "published" : "draft";
    setPages((prev) => prev.map((p) => (p.id === activeId ? { ...p, status: next as "draft" | "published", updatedAt: "Just now" } : p)));
    toast({ title: next === "published" ? "Page published" : "Reverted to draft" });
  };

  const filledCount = activePage?.sections.filter((s) => s.content.trim().length > 0).length ?? 0;

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-5xl px-8 py-8">
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
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Landing Pages</h1>
                <p className="mt-1 text-sm text-white/40">Generate high-converting opt-in and sales page copy.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {pageTypes.map((pt) => (
                <button
                  key={pt.value}
                  onClick={() => createPage(pt.value)}
                  className="flex items-start gap-4 rounded-2xl border border-dashed border-white/10 p-5 text-left transition hover:border-white/20 hover:bg-white/[0.02]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <span className="material-symbols-outlined text-xl">{pt.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{pt.label}</p>
                    <p className="mt-0.5 text-xs text-white/40">{pt.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {pages.length > 0 && (
              <>
                <h2 className="mt-8 text-xs font-bold uppercase tracking-wider text-white/40">Your Pages</h2>
                <div className="mt-3 space-y-3">
                  {pages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => openPage(p.id)}
                      className="flex w-full items-center gap-4 rounded-2xl border border-white/8 bg-cc-surface p-5 text-left transition hover:border-white/15"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                        <span className="material-symbols-outlined text-lg text-amber-400">web</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{p.title}</p>
                        <p className="mt-0.5 text-xs text-white/40">{typeLabels[p.type]}</p>
                      </div>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                      }`}>{p.status}</span>
                      <span className="text-[10px] text-white/30 whitespace-nowrap">{p.updatedAt}</span>
                      <span className="material-symbols-outlined text-lg text-white/20">chevron_right</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {view === "edit" && activePage && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => setView("list")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <div className="min-w-0 flex-1">
                <input
                  value={activePage.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full bg-transparent text-xl font-extrabold text-white outline-none placeholder:text-white/20"
                  placeholder="Page title"
                />
                <p className="text-xs text-white/30">{typeLabels[activePage.type]}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  activePage.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>{activePage.status}</span>
                <button
                  onClick={togglePublish}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activePage.status === "draft"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  }`}
                >
                  {activePage.status === "draft" ? "Publish" : "Revert to Draft"}
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-5">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {filledCount} of {activePage.sections.length} sections filled
              </div>
            </div>

            <div className="space-y-4">
              {activePage.sections.map((section, i) => (
                <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-[10px] font-bold text-amber-400">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white">{section.label}</h3>
                    {section.content.trim().length > 0 && (
                      <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                    )}
                  </div>
                  <textarea
                    rows={3}
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
