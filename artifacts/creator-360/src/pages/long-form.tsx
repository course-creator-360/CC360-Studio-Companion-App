import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface LongFormScript {
  id: string;
  title: string;
  format: "youtube" | "podcast" | "webinar";
  status: "draft" | "published";
  updatedAt: string;
  sections: ScriptSection[];
}

interface ScriptSection {
  id: string;
  label: string;
  content: string;
}

const formatLabels: Record<LongFormScript["format"], string> = {
  youtube: "YouTube Video",
  podcast: "Podcast Episode",
  webinar: "Webinar Script",
};

const blankSections: ScriptSection[] = [
  { id: "title-angle", label: "Title & Angle", content: "" },
  { id: "hook", label: "Hook (first 30 seconds)", content: "" },
  { id: "outline", label: "Outline / Structure", content: "" },
  { id: "body", label: "Script Body", content: "" },
  { id: "cta", label: "Call to Action", content: "" },
];

const sampleScripts: LongFormScript[] = [
  {
    id: "lf1",
    title: "How to Launch a Course in 6 Weeks",
    format: "youtube",
    status: "published",
    updatedAt: "1 day ago",
    sections: [
      {
        id: "title-angle",
        label: "Title & Angle",
        content:
          "Angle: Proof that a working professional can go from scattered ideas to a live, enrolling course in six weeks without quitting their day job. Title promise: a repeatable sprint, not inspiration porn.",
      },
      {
        id: "hook",
        label: "Hook (first 30 seconds)",
        content:
          "If you have been sitting on a course idea for months because the tech stack and the launch plan feel like a second job, you are not lazy — you are missing a system. In the next few minutes I am going to walk you through the exact six-week sprint we use with course creators so you know what to do every single week, including what to ignore until it actually matters.",
      },
      {
        id: "outline",
        label: "Outline / Structure",
        content:
          "1) Why most launches stall (clarity vs. volume)\n2) Week 1–2: validate the offer and name before you build\n3) Week 3–4: curriculum skeleton + one flagship lesson\n4) Week 5: sales page + email spine (not fifty emails)\n5) Week 6: live launch mechanics and enrollment goal\n6) Recap: the one metric that tells you to scale or fix",
      },
      {
        id: "body",
        label: "Script Body",
        content:
          "So here is the reframe most people need on day one. You do not need a perfect studio, a fifty-module mega course, or a funnel with twelve automations. You need one clear transformation, one primary buyer, and a launch you can actually execute while life still happens.\n\nWeek one is not filming. Week one is interviews and a one-page offer. You are looking for the phrase your audience already uses when they describe the problem. If you cannot explain the outcome in one sentence a friend would repeat at dinner, your title is still too clever.\n\nWeek two you lock the promise and the price band. Not forever — just for this cohort. Course creators ship faster when the offer has edges: who it is for, who it is not for, and what happens by the end. Ambiguity is what turns six weeks into six months.\n\nWeek three and four you build the spine. Three to five modules, each with a job to be done. Film or script your flagship lesson first — the one that delivers the emotional win. Everything else supports that moment. If someone only watched that lesson, they should still feel they got real value.\n\nWeek five is assets that sell: a simple long-form page, a five-email launch sequence, and one piece of proof — even if it is beta feedback from week one calls. You are not trying to win a design award. You are trying to make it obvious what to click and what happens next.\n\nWeek six you run a bounded launch: a start date, an end date, and a reason to decide now. Office hours, a short FAQ thread, a single bonus for fast action — pick one lever and commit. The goal of the first launch is learning and revenue, not perfection.\n\nIf you take one thing from this script, take the weekly focus. One primary deliverable per week beats a giant checklist you never finish. When you are ready to plug this into your own calendar, grab the companion outline in the description and map your dates — that is how this stops being content you watched and becomes a launch you run.",
      },
      {
        id: "cta",
        label: "Call to Action",
        content:
          "If you want the six-week map as a printable checklist plus the email subject lines we use during launch week, click the first link in the description. Subscribe if you are building a course business without burning out — I post a new deep dive every week.",
      },
    ],
  },
  {
    id: "lf2",
    title: "The Future of Online Education",
    format: "podcast",
    status: "draft",
    updatedAt: "3 hours ago",
    sections: [
      {
        id: "title-angle",
        label: "Title & Angle",
        content:
          "Angle: Where online education is heading for independent course creators — cohorts, AI as assistant not replacement, and trust as the real moat. Title frames a forward-looking conversation, not hype.",
      },
      {
        id: "hook",
        label: "Hook (first 30 seconds)",
        content:
          "Welcome back. Today we are asking a blunt question — is the golden age of passive video courses over, or is it just evolving? I have been talking to creators who are doubling down on live components, micro-credentials, and community, and the pattern is not random. Stick around for the three shifts I think actually matter for your next twelve months.",
      },
      { id: "outline", label: "Outline / Structure", content: "" },
      { id: "body", label: "Script Body", content: "" },
      { id: "cta", label: "Call to Action", content: "" },
    ],
  },
];

const scriptFormats: { value: LongFormScript["format"]; label: string; icon: string; desc: string }[] = [
  { value: "youtube", label: "YouTube Video", icon: "smart_display", desc: "Long-form video script with hooks and chapters" },
  { value: "podcast", label: "Podcast Episode", icon: "podcasts", desc: "Spoken intro, segments, and outro beats" },
  { value: "webinar", label: "Webinar Script", icon: "present_to_all", desc: "Slide-aware teaching and pitch flow" },
];

export default function LongForm() {
  const { toast } = useToast();
  const [scripts, setScripts] = useState<LongFormScript[]>(sampleScripts);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const activeScript = scripts.find((s) => s.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeScript) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, string> = {
        "title-angle":
          "Angle: A clear transformation for a specific learner. Title promises outcomes and timeframe, not buzzwords.",
        hook:
          "Stop me if this sounds familiar — you know your material cold, but every time you sit down to script a video or episode, the blank page wins. Here is a simple structure you can steal so the first thirty seconds do their job: pattern interrupt, stakes, and a promise you can actually keep.",
        outline:
          "1) Set context and who this is for\n2) Main teaching blocks (3–5 beats)\n3) Story or example that proves the point\n4) Objection you are answering head-on\n5) Transition to CTA\n6) Outro with one next step",
        body:
          "Now we walk through the core teaching. Start with the belief you are changing — what they think is true today that keeps them stuck. Name it in plain language. Then give them a framework they can remember without notes: three pillars, four steps, a before-and-after snapshot. Use one concrete example from your own students or clients; specificity beats adjectives every time.\n\nPace matters. For video, vary sentence length so the edit has natural breaths. For audio, signpost: \"Here is the part most people skip\" or \"If you only remember one thing, make it this.\" Repeat the main takeaway once in the middle and once before the CTA.\n\nWhen you address objections, do not dismiss them. Validate the fear — time, money, impostor syndrome — then show how your approach reduces risk: a guarantee, a small first step, or a clear scope boundary. You are not debating; you are helping them decide.\n\nBridge to the close by tying the lesson back to the opening hook. \"So that pattern we opened with — here is how you break it this week.\" Then hand off cleanly to your CTA without apologizing for selling. Confidence is kind.",
        cta:
          "If you want the outline template and example hooks for your niche, use the link in the description. Subscribe for weekly scripts and launch breakdowns — and hit reply or comment with the topic you want next.",
      };
      setScripts((prev) =>
        prev.map((s) => {
          if (s.id !== activeId) return s;
          return {
            ...s,
            sections: s.sections.map((sec) => (sec.content.trim() ? sec : { ...sec, content: sample[sec.id] ?? "" })),
            updatedAt: "Just now",
          };
        }),
      );
      setGenerating(false);
      toast({ title: "Long form script generated", description: `Used ${creditCosts.landingPage} credits` });
    }, 2000);
  };

  const createScript = (format: LongFormScript["format"]) => {
    const id = `lf${Date.now()}`;
    const newScript: LongFormScript = {
      id,
      title: `Untitled ${formatLabels[format]}`,
      format,
      status: "draft",
      updatedAt: "Just now",
      sections: blankSections.map((sec) => ({ ...sec })),
    };
    setScripts([newScript, ...scripts]);
    setActiveId(id);
    setView("edit");
  };

  const openScript = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateTitle = (value: string) => {
    setScripts((prev) => prev.map((s) => (s.id === activeId ? { ...s, title: value, updatedAt: "Just now" } : s)));
  };

  const updateSection = (sectionId: string, content: string) => {
    setScripts((prev) =>
      prev.map((s) => {
        if (s.id !== activeId) return s;
        return {
          ...s,
          sections: s.sections.map((sec) => (sec.id === sectionId ? { ...sec, content } : sec)),
          updatedAt: "Just now",
        };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeScript?.status === "draft" ? "published" : "draft";
    setScripts((prev) =>
      prev.map((s) => (s.id === activeId ? { ...s, status: next as "draft" | "published", updatedAt: "Just now" } : s)),
    );
    toast({ title: next === "published" ? "Script published" : "Reverted to draft" });
  };

  const filledCount = activeScript?.sections.filter((sec) => sec.content.trim().length > 0).length ?? 0;
  const totalSections = activeScript?.sections.length ?? 0;
  const progressPct = totalSections ? (filledCount / totalSections) * 100 : 0;

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
              <h1 className="text-xl font-extrabold text-white sm:text-2xl">Long Form Copywriter</h1>
              <p className="mt-1 text-sm text-white/40">YouTube scripts, webinar decks, and podcast outlines</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {scriptFormats.map((sf) => (
                <button
                  key={sf.value}
                  onClick={() => createScript(sf.value)}
                  className="flex items-start gap-4 rounded-2xl border border-dashed border-white/10 p-5 text-left transition hover:border-white/20 hover:bg-white/[0.02]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <span className="material-symbols-outlined text-xl">{sf.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{sf.label}</p>
                    <p className="mt-0.5 text-xs text-white/40">{sf.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {scripts.length > 0 && (
              <>
                <h2 className="mt-8 text-xs font-bold uppercase tracking-wider text-white/40">Your Scripts</h2>
                <div className="mt-3 space-y-3">
                  {scripts.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => openScript(s.id)}
                      className="flex w-full flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-4 text-left transition hover:border-white/15 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3 sm:contents">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                          <span className="material-symbols-outlined text-lg text-orange-400">article</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{s.title}</p>
                          <p className="mt-0.5 text-xs text-white/40">{formatLabels[s.format]}</p>
                        </div>
                        <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                      </div>
                      <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            s.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {s.status}
                        </span>
                        <span className="whitespace-nowrap text-[10px] text-white/30">{s.updatedAt}</span>
                        <span className="material-symbols-outlined hidden text-lg text-white/20 sm:block">chevron_right</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {view === "edit" && activeScript && (
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
                    value={activeScript.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    className="w-full bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20 sm:text-xl"
                    placeholder="Script title"
                  />
                  <p className="text-xs text-white/30">{formatLabels[activeScript.format]}</p>
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
                    toast({ title: "Exported to GHL", description: "Long form script pushed to your GoHighLevel workspace." })
                  }
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:px-3"
                >
                  <span className="material-symbols-outlined shrink-0 text-sm">publish</span>
                  <span className="sm:hidden">Export</span>
                  <span className="hidden sm:inline">Export to GHL</span>
                </button>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    activeScript.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {activeScript.status}
                </span>
                <button
                  type="button"
                  onClick={togglePublish}
                  className={`min-h-[36px] rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                    activeScript.status === "draft"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  }`}
                >
                  <span className="sm:hidden">{activeScript.status === "draft" ? "Publish" : "Revert"}</span>
                  <span className="hidden sm:inline">{activeScript.status === "draft" ? "Publish" : "Revert to Draft"}</span>
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                {filledCount} of {activeScript.sections.length} sections filled
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cc-primary transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {activeScript.sections.map((section, i) => (
                <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                  <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/10 text-[10px] font-bold text-orange-400">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-bold text-white">{section.label}</h3>
                    {section.content.trim().length > 0 && (
                      <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                    )}
                  </div>
                  <textarea
                    rows={section.id === "body" ? 5 : 3}
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
