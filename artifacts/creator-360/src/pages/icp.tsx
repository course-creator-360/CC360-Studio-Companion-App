import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface ICPSection {
  id: string;
  label: string;
  content: string;
}

interface ICPProfile {
  id: string;
  title: string;
  industry: string;
  status: "draft" | "published";
  updatedAt: string;
  sections: ICPSection[];
}

const blankSections: ICPSection[] = [
  { id: "demographics", label: "Demographics", content: "" },
  { id: "psychographics", label: "Psychographics", content: "" },
  { id: "pain-points", label: "Pain Points", content: "" },
  { id: "desired-outcomes", label: "Desired Outcomes", content: "" },
  { id: "buying-triggers", label: "Buying Triggers", content: "" },
  { id: "common-objections", label: "Common Objections", content: "" },
  { id: "messaging-angles", label: "Messaging Angles", content: "" },
];

const sampleProfiles: ICPProfile[] = [
  {
    id: "icp1",
    title: "Course Creator ICP — Career Changers",
    industry: "Online Education",
    status: "published",
    updatedAt: "2 days ago",
    sections: [
      {
        id: "demographics",
        label: "Demographics",
        content:
          "Primary age band 28–42; career changers leaving stable corporate or skilled-trade roles for online education and consulting. Roughly 62% women, 38% men; majority college-educated; US and UK-heavy with strong secondary presence in Canada and Australia. Household income typically $72K–$125K; often dual-income households with limited discretionary time. Urban and suburban; comfortable with Zoom, Slack, and async learning. Many have young children or caregiving responsibilities, so evening and weekend study blocks are the norm.",
      },
      {
        id: "psychographics",
        label: "Psychographics",
        content:
          "Driven by autonomy, dignity of work, and a desire to teach what they already know. Skeptical of hype and “six-figure in 30 days” promises; respond to proof, frameworks, and peer outcomes. Heavy researchers: compare programs, read reviews, and lurk in Facebook groups before buying. Identity shift is emotional—they want to feel legitimate calling themselves an educator or expert, not like they are “playing business.” Values community, accountability, and a clear syllabus more than raw motivation.",
      },
      {
        id: "pain-points",
        label: "Pain Points",
        content:
          "Tech stack overwhelm: funnels, email, landing pages, and course platforms feel like a second job. Fear of picking the wrong niche or offer and wasting six months. Imposter syndrome when pricing or showing up on video. Paralysis from too many free resources with no single path. Anxiety about audience size—believes they need thousands of followers before they can sell. Time fragmentation from day jobs makes consistency the hardest habit.",
      },
      {
        id: "desired-outcomes",
        label: "Desired Outcomes",
        content:
          "A structured, end-to-end path from validated idea to launched course with a small but real first cohort. Confidence explaining what they sell in one sentence. Predictable milestones: outline done, curriculum recorded, first payment collected. Desire for templates, checklists, and office hours rather than theory-only training. Longer-term: replace or meaningfully supplement W-2 income within 12–18 months while working sane hours.",
      },
      {
        id: "buying-triggers",
        label: "Buying Triggers",
        content:
          "Recent promotion denial, layoff scare, or return-to-office mandate. Tax refund or bonus season. Seeing a peer or former colleague succeed with a digital product. New Year or back-to-school mental “fresh start” energy. Enrollment deadlines or cohort start dates that match their calendar. Partner or family finally saying “if you are going to do this, do it properly.”",
      },
      {
        id: "common-objections",
        label: "Common Objections",
        content:
          "“I do not have an audience yet.” “The course market is saturated in my topic.” “I am not technical enough to build funnels.” “I cannot afford another program right now.” “I need to wait until my idea is perfect.” “I only have nights and weekends—is that enough?”",
      },
      {
        id: "messaging-angles",
        label: "Messaging Angles",
        content:
          "Lead with the safe container: a proven sequence from idea to launch, not charisma or hustle. Contrast “random YouTube university” with one accountable roadmap and deadlines. Reframe audience: you need a hundred true fans and a repeatable invite, not a viral brand. Use career-changer language: transferable expertise, second act, teach what you already know. Emphasize tech demystified—done-with-you setup and copy-paste templates. Risk reversal through cohort community and live Q&A, not vague “support.”",
      },
    ],
  },
  {
    id: "icp2",
    title: "Coaching ICP — Small Business Owners",
    industry: "Business Coaching",
    status: "draft",
    updatedAt: "5 hours ago",
    sections: [
      {
        id: "demographics",
        label: "Demographics",
        content:
          "Owners and founding partners of service businesses with roughly $250K–$2M annual revenue; teams of 3–25; concentrated in professional services, home services, and light e-commerce. Age 35–55; mix of first-time founders and second-act operators. Often the primary sales closer; office or hybrid; US-based with some Canada overlap.",
      },
      {
        id: "psychographics",
        label: "Psychographics",
        content:
          "Pragmatic and ROI-minded; impatient with abstract coaching. Want playbooks, scorecards, and clear weekly priorities. Pride in craftsmanship but frustrated that growth still depends on them personally. Open to investing if there is a defined outcome window (e.g., 90-day sprint). Read business podcasts and follow a few trusted operators; referrals weigh heavily.",
      },
      {
        id: "pain-points",
        label: "Pain Points",
        content:
          "Revenue plateaus when founder stops selling. Inconsistent pipeline—feast then famine. Hiring and delegation without losing quality. Unclear positioning vs. cheaper competitors. Lack of simple metrics beyond top-line revenue. Time eaten by admin and client delivery with no space for marketing.",
      },
      { id: "desired-outcomes", label: "Desired Outcomes", content: "" },
      { id: "buying-triggers", label: "Buying Triggers", content: "" },
      { id: "common-objections", label: "Common Objections", content: "" },
      { id: "messaging-angles", label: "Messaging Angles", content: "" },
    ],
  },
];

export default function ICPCreator() {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<ICPProfile[]>(sampleProfiles);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const activeProfile = profiles.find((p) => p.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeProfile) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, string> = {
        demographics:
          "Primary age band 28–42; career changers leaving stable corporate or skilled-trade roles for online education and consulting. Roughly 62% women, 38% men; majority college-educated; US and UK-heavy. Household income typically $72K–$125K; urban and suburban; limited discretionary time.",
        psychographics:
          "Driven by autonomy and teaching what they know. Skeptical of hype; respond to proof, frameworks, and peer outcomes. Heavy researchers before buying. Wants identity validation as a legitimate educator.",
        "pain-points":
          "Tech stack overwhelm, fear of wrong niche, imposter syndrome on pricing and video, paralysis from scattered free content, belief they need a huge audience first.",
        "desired-outcomes":
          "Structured path from validated idea to launched offer, clear milestones, templates and live support, meaningful income supplement within 12–18 months.",
        "buying-triggers":
          "Job frustration, bonus season, peer success stories, cohort deadlines, family encouragement to commit properly.",
        "common-objections":
          "No audience yet, market saturation fears, not technical enough, budget timing, waiting for a perfect idea, only nights and weekends available.",
        "messaging-angles":
          "Safe container and accountable roadmap vs. random learning. Teach what you already know. Demystify tech with templates. Community and deadlines over solo willpower.",
      };
      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id !== activeId) return p;
          return {
            ...p,
            sections: p.sections.map((s) =>
              s.content.trim() ? s : { ...s, content: sample[s.id] ?? "" },
            ),
            updatedAt: "Just now",
          };
        }),
      );
      setGenerating(false);
      toast({
        title: "ICP profile generated",
        description: `Used ${creditCosts.marketResearch} credits`,
      });
    }, 2000);
  };

  const createProfile = () => {
    const id = `icp${Date.now()}`;
    const newProfile: ICPProfile = {
      id,
      title: "Untitled ICP Profile",
      industry: "",
      status: "draft",
      updatedAt: "Just now",
      sections: blankSections.map((s) => ({ ...s })),
    };
    setProfiles([newProfile, ...profiles]);
    setActiveId(id);
    setView("edit");
  };

  const openProfile = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateField = (field: "title" | "industry", value: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === activeId ? { ...p, [field]: value, updatedAt: "Just now" } : p)),
    );
  };

  const updateSection = (sectionId: string, content: string) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== activeId) return p;
        const sections = p.sections.map((s) => (s.id === sectionId ? { ...s, content } : s));
        return { ...p, sections, updatedAt: "Just now" };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeProfile?.status === "draft" ? "published" : "draft";
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeId ? { ...p, status: next as "draft" | "published", updatedAt: "Just now" } : p,
      ),
    );
    toast({ title: next === "published" ? "Profile published" : "Reverted to draft" });
  };

  const completedCount = activeProfile?.sections.filter((s) => s.content.trim().length > 0).length ?? 0;
  const totalSections = activeProfile?.sections.length ?? 0;

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
                <h1 className="text-xl font-extrabold text-white sm:text-2xl">360 ICP Creator</h1>
                <p className="mt-1 text-sm text-white/40">
                  Build detailed ideal customer profiles for your offers.
                </p>
              </div>
              <button
                onClick={createProfile}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New ICP Profile
              </button>
            </div>

            {profiles.length === 0 ? (
              <div className="mt-16 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <span className="material-symbols-outlined text-3xl text-white/20">person_search</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">No profiles yet</h2>
                <p className="mt-1 text-sm text-white/40">Create your first ICP profile to get started.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => openProfile(p.id)}
                    className="flex w-full flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-4 text-left transition hover:border-white/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                  >
                    <div className="flex items-center gap-3 sm:contents">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                        <span className="material-symbols-outlined text-lg text-teal-400">person_search</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{p.title}</p>
                        <p className="mt-0.5 truncate text-xs text-white/40">
                          {p.industry || "No industry set"}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                    </div>
                    <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          p.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {p.status}
                      </span>
                      <span className="whitespace-nowrap text-[10px] text-white/30">{p.updatedAt}</span>
                      <span className="material-symbols-outlined hidden text-lg text-white/20 sm:block">
                        chevron_right
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {view === "edit" && activeProfile && (
          <>
            <div className="mb-6 space-y-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <button
                    onClick={() => setView("list")}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:text-white"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                  </button>
                  <div className="min-w-0 flex-1 space-y-1">
                    <input
                      value={activeProfile.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="w-full bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20 sm:text-xl"
                      placeholder="ICP title"
                    />
                    <input
                      value={activeProfile.industry}
                      onChange={(e) => updateField("industry", e.target.value)}
                      className="w-full bg-transparent text-xs text-white/30 outline-none placeholder:text-white/20"
                      placeholder="Industry or niche..."
                    />
                    <div className="flex items-center gap-2 pt-1 text-xs text-white/30">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      {completedCount} of {totalSections} sections filled
                    </div>
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
                      toast({
                        title: "Exported to GHL",
                        description: "ICP profile pushed to your GoHighLevel workspace.",
                      })
                    }
                    className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:px-3"
                  >
                    <span className="material-symbols-outlined shrink-0 text-sm">publish</span>
                    <span className="sm:hidden">Export</span>
                    <span className="hidden sm:inline">Export to GHL</span>
                  </button>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      activeProfile.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {activeProfile.status}
                  </span>
                  <button
                    type="button"
                    onClick={togglePublish}
                    className={`min-h-[36px] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                      activeProfile.status === "draft"
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                    }`}
                  >
                    <span className="sm:hidden">{activeProfile.status === "draft" ? "Publish" : "Revert"}</span>
                    <span className="hidden sm:inline">{activeProfile.status === "draft" ? "Publish" : "Revert to Draft"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {activeProfile.sections.map((section, i) => (
                <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                  <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-500/10 text-[10px] font-bold text-teal-400">
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
