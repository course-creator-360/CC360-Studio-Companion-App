import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface ResearchReport {
  id: string;
  title: string;
  audience: string;
  status: "draft" | "published";
  updatedAt: string;
  sections: ReportSection[];
}

interface ReportSection {
  id: string;
  heading: string;
  body: string;
}

const blankSections: ReportSection[] = [
  { id: "audience", heading: "Target Audience", body: "" },
  { id: "pain-desire", heading: "Pain Points & Desires", body: "" },
  { id: "competitors", heading: "Competitor Landscape", body: "" },
  { id: "opportunity", heading: "Market Opportunity", body: "" },
  { id: "positioning", heading: "Positioning & Messaging", body: "" },
];

const sampleReports: ResearchReport[] = [
  {
    id: "r1",
    title: "Spring Enrollment Market Analysis",
    audience: "Career changers aged 28–42 exploring online certification programs",
    status: "published",
    updatedAt: "2 days ago",
    sections: [
      { id: "audience", heading: "Target Audience", body: "Career changers aged 28–42 with 5+ years in a field they want to leave. Motivated by flexibility, income ceiling frustration, and desire for creative autonomy. Primarily female (68%), college-educated, mid-income households." },
      { id: "pain-desire", heading: "Pain Points & Desires", body: "Top pain: uncertainty about whether a course will actually lead to income. Desire: a clear, structured path from enrollment to first client. Secondary pain: overwhelm from too many options. Secondary desire: community and accountability." },
      { id: "competitors", heading: "Competitor Landscape", body: "3 direct competitors offering similar certification programs at $997–$2,497. Differentiators are weak — most rely on founder authority. Gap: none offer a done-with-you launch sprint after certification." },
      { id: "opportunity", heading: "Market Opportunity", body: "Online education market growing 14% YoY. Certification sub-niche underserved in the 'launch support' phase. Estimated addressable segment: 120K professionals actively searching per quarter." },
      { id: "positioning", heading: "Positioning & Messaging", body: "Lead with outcome ('your first 3 clients in 90 days') not curriculum. Position the certification as a vehicle, not the product. Emphasize the post-cert launch sprint as the unique wedge." },
    ],
  },
  {
    id: "r2",
    title: "Webinar Funnel Audience Research",
    audience: "Small business owners exploring webinar-based lead generation",
    status: "draft",
    updatedAt: "5 hours ago",
    sections: [
      { id: "audience", heading: "Target Audience", body: "Solopreneurs and small teams (1–5 people) doing $50K–$250K revenue. Already have an offer but struggle with consistent lead flow." },
      { id: "pain-desire", heading: "Pain Points & Desires", body: "Pain: feast-or-famine revenue cycles. Desire: a repeatable system that fills their calendar without cold outreach." },
      { id: "competitors", heading: "Competitor Landscape", body: "" },
      { id: "opportunity", heading: "Market Opportunity", body: "" },
      { id: "positioning", heading: "Positioning & Messaging", body: "" },
    ],
  },
];

export default function MarketResearch() {
  const { toast } = useToast();
  const [reports, setReports] = useState<ResearchReport[]>(sampleReports);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);

  const [generating, setGenerating] = useState(false);
  const activeReport = reports.find((r) => r.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeReport) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, string> = {
        audience: "Career changers aged 28–42 with 5+ years in a field they want to leave. Motivated by flexibility, income ceiling frustration, and desire for creative autonomy. Primarily female (68%), college-educated, mid-income households.",
        "pain-desire": "Top pain: uncertainty about whether a course will actually lead to income. Desire: a clear, structured path from enrollment to first client. Secondary pain: overwhelm from too many options. Secondary desire: community and accountability.",
        competitors: "3 direct competitors offering similar programs at $997–$2,497. Differentiators are weak — most rely on founder authority. Gap: none offer a done-with-you launch sprint after certification.",
        opportunity: "Online education market growing 14% YoY. Certification sub-niche underserved in the 'launch support' phase. Estimated addressable segment: 120K professionals actively searching per quarter.",
        positioning: "Lead with outcome ('your first 3 clients in 90 days') not curriculum. Position the certification as a vehicle, not the product. Emphasize the post-cert launch sprint as the unique wedge.",
      };
      setReports((prev) =>
        prev.map((r) => {
          if (r.id !== activeId) return r;
          return { ...r, sections: r.sections.map((s) => s.body.trim() ? s : { ...s, body: sample[s.id] ?? "" }), updatedAt: "Just now" };
        }),
      );
      setGenerating(false);
      toast({ title: "Research report generated", description: `Used ${creditCosts.marketResearch} credits` });
    }, 2000);
  };

  const createReport = () => {
    const id = `r${Date.now()}`;
    const newReport: ResearchReport = {
      id,
      title: "Untitled Research Report",
      audience: "",
      status: "draft",
      updatedAt: "Just now",
      sections: blankSections.map((s) => ({ ...s })),
    };
    setReports([newReport, ...reports]);
    setActiveId(id);
    setView("edit");
  };

  const openReport = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateField = (field: "title" | "audience", value: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === activeId ? { ...r, [field]: value, updatedAt: "Just now" } : r)),
    );
  };

  const updateSection = (sectionId: string, body: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== activeId) return r;
        const sections = r.sections.map((s) => (s.id === sectionId ? { ...s, body } : s));
        return { ...r, sections, updatedAt: "Just now" };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeReport?.status === "draft" ? "published" : "draft";
    setReports((prev) =>
      prev.map((r) => (r.id === activeId ? { ...r, status: next as "draft" | "published", updatedAt: "Just now" } : r)),
    );
    toast({ title: next === "published" ? "Report published" : "Reverted to draft" });
  };

  const completedCount = activeReport?.sections.filter((s) => s.body.trim().length > 0).length ?? 0;
  const totalSections = activeReport?.sections.length ?? 0;

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
                <h1 className="text-xl font-extrabold text-white sm:text-2xl">Market Research</h1>
                <p className="mt-1 text-sm text-white/40">Create and manage audience research reports for your courses.</p>
              </div>
              <button
                onClick={createReport}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New Report
              </button>
            </div>

            {reports.length === 0 ? (
              <div className="mt-16 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <span className="material-symbols-outlined text-3xl text-white/20">query_stats</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">No reports yet</h2>
                <p className="mt-1 text-sm text-white/40">Create your first market research report to get started.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {reports.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => openReport(r.id)}
                    className="flex w-full flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-4 text-left transition hover:border-white/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3 sm:contents">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cc-primary/10">
                        <span className="material-symbols-outlined text-lg text-cc-primary">query_stats</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{r.title}</p>
                        <p className="mt-0.5 truncate text-xs text-white/40">{r.audience || "No audience defined"}</p>
                      </div>
                      <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                    </div>
                    <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          r.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {r.status}
                      </span>
                      <span className="text-[10px] text-white/30 whitespace-nowrap">{r.updatedAt}</span>
                      <span className="material-symbols-outlined hidden text-lg text-white/20 sm:block">chevron_right</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {view === "edit" && activeReport && (
          <>
            <div className="mb-6 space-y-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
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
                      value={activeReport.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="w-full bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20 sm:text-xl"
                      placeholder="Report title"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pl-11 lg:min-w-0 lg:flex-1 lg:justify-end lg:pl-0">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating}
                    className="flex min-h-[36px] min-w-0 items-center gap-1.5 rounded-lg bg-cc-primary/10 px-2.5 py-1.5 text-xs font-semibold text-cc-primary transition hover:bg-cc-primary/20 disabled:opacity-50 sm:px-3"
                  >
                    <span className={`material-symbols-outlined shrink-0 text-sm ${generating ? "animate-spin" : ""}`}>{generating ? "progress_activity" : "auto_awesome"}</span>
                    {generating ? (
                      "Generating..."
                    ) : (
                      <>
                        <span className="sm:hidden">Generate</span>
                        <span className="hidden sm:inline">Generate Report</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => toast({ title: "Exported to GHL", description: "Research report pushed to your GoHighLevel workspace." })}
                    className="flex min-h-[36px] min-w-0 items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:px-3"
                  >
                    <span className="material-symbols-outlined shrink-0 text-sm">publish</span>
                    <span className="sm:hidden">Export</span>
                    <span className="hidden sm:inline">Export to GHL</span>
                  </button>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      activeReport.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {activeReport.status}
                  </span>
                  <button
                    type="button"
                    onClick={togglePublish}
                    className={`min-h-[36px] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                      activeReport.status === "draft"
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                    }`}
                  >
                    <span className="sm:hidden">{activeReport.status === "draft" ? "Publish" : "Revert"}</span>
                    <span className="hidden sm:inline">{activeReport.status === "draft" ? "Publish" : "Revert to Draft"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
              <label className="mb-1.5 block text-xs font-semibold text-white/50">Target Audience</label>
              <textarea
                rows={2}
                value={activeReport.audience}
                onChange={(e) => updateField("audience", e.target.value)}
                placeholder="Describe who this research is about..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cc-primary/50"
              />
              <div className="mt-3 flex items-center gap-2 text-xs text-white/30">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {completedCount} of {totalSections} sections filled
              </div>
            </div>

            <div className="space-y-4">
              {activeReport.sections.map((section, i) => (
                <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                  <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cc-primary/10 text-[10px] font-bold text-cc-primary">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white">{section.heading}</h3>
                    {section.body.trim().length > 0 && (
                      <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={section.body}
                    onChange={(e) => updateSection(section.id, e.target.value)}
                    placeholder={`Write your ${section.heading.toLowerCase()} findings...`}
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
