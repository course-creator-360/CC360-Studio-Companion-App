import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";
import { creditCosts } from "@/lib/companion-demo-data";

interface ShortFormScript {
  id: string;
  title: string;
  platform: "reels" | "shorts" | "tiktok";
  status: "draft" | "published";
  updatedAt: string;
  sections: ScriptSection[];
}

interface ScriptSection {
  id: string;
  label: string;
  content: string;
}

const blankSections: ScriptSection[] = [
  { id: "hook", label: "Hook", content: "" },
  { id: "body", label: "Body", content: "" },
  { id: "cta", label: "CTA", content: "" },
  { id: "hashtags", label: "Hashtags", content: "" },
];

const platformLabels: Record<ShortFormScript["platform"], string> = {
  reels: "Instagram Reels",
  shorts: "YouTube Shorts",
  tiktok: "TikTok",
};

const platformIcons: Record<ShortFormScript["platform"], string> = {
  reels: "movie",
  shorts: "smart_display",
  tiktok: "music_note",
};

const platformOptions: { value: ShortFormScript["platform"]; label: string; desc: string }[] = [
  { value: "reels", label: "Instagram Reels", desc: "Vertical scripts tuned for Reels" },
  { value: "shorts", label: "YouTube Shorts", desc: "Punchy hooks for Shorts" },
  { value: "tiktok", label: "TikTok", desc: "Fast-paced TikTok copy" },
];

const sampleScripts: ShortFormScript[] = [
  {
    id: "sf1",
    title: "Why Most Course Launches Fail",
    platform: "reels",
    status: "published",
    updatedAt: "2 days ago",
    sections: [
      {
        id: "hook",
        label: "Hook",
        content: "Most course launches fail before the cart opens — and it's not your content.",
      },
      {
        id: "body",
        label: "Body",
        content:
          "The silent killer is cold traffic. You built the offer but skipped the runway. Tease one transformation every day for 14 days. Stack proof. Name the drop date. Then flip the switch — your list should already be leaning in.",
      },
      {
        id: "cta",
        label: "CTA",
        content: "Save this. Follow for the full launch playbook. Comment LAUNCH and I'll DM the checklist.",
      },
      {
        id: "hashtags",
        label: "Hashtags",
        content: "#coursecreator #onlinecourse #launchtips #digitalproducts #coach",
      },
    ],
  },
  {
    id: "sf2",
    title: "3 Signs You're Ready to Launch",
    platform: "tiktok",
    status: "draft",
    updatedAt: "4 hours ago",
    sections: [
      {
        id: "hook",
        label: "Hook",
        content: "POV: you're about to launch and you're not sure you're ready — here are 3 signs you actually are.",
      },
      { id: "body", label: "Body", content: "" },
      { id: "cta", label: "CTA", content: "" },
      { id: "hashtags", label: "Hashtags", content: "" },
    ],
  },
];

export default function ShortForm() {
  const { toast } = useToast();
  const [scripts, setScripts] = useState<ShortFormScript[]>(sampleScripts);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const activeScript = scripts.find((s) => s.id === activeId) ?? null;

  const handleGenerate = () => {
    if (!activeScript) return;
    setGenerating(true);
    setTimeout(() => {
      const sample: Record<string, string> = {
        hook: "Stop scrolling if you're launching a course this quarter — this one line changes everything.",
        body: "Lead with the outcome, not the curriculum. Show the before state in 2 seconds, the after in 3, then one proof beat. Keep sentences under 8 words. Cut every adjective that doesn't earn its rent.",
        cta: "Follow for part 2. Comment READY if you want my hook formula.",
        hashtags: "#coursecreator #shortform #launch #creator #tips",
      };
      setScripts((prev) =>
        prev.map((s) => {
          if (s.id !== activeId) return s;
          return {
            ...s,
            sections: s.sections.map((sec) =>
              sec.content.trim() ? sec : { ...sec, content: sample[sec.id] ?? "" },
            ),
            updatedAt: "Just now",
          };
        }),
      );
      setGenerating(false);
      toast({ title: "Short form generated", description: `Used ${creditCosts.sms} credits` });
    }, 2000);
  };

  const createScript = (platform: ShortFormScript["platform"]) => {
    const id = `sf${Date.now()}`;
    const newScript: ShortFormScript = {
      id,
      title: `Untitled ${platformLabels[platform]} Script`,
      platform,
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
    setScripts((prev) =>
      prev.map((s) => (s.id === activeId ? { ...s, title: value, updatedAt: "Just now" } : s)),
    );
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
      prev.map((s) =>
        s.id === activeId ? { ...s, status: next as "draft" | "published", updatedAt: "Just now" } : s,
      ),
    );
    toast({ title: next === "published" ? "Script published" : "Reverted to draft" });
  };

  const filledCount = activeScript?.sections.filter((sec) => sec.content.trim().length > 0).length ?? 0;

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
              <h1 className="text-xl font-extrabold text-white sm:text-2xl">Short Form Copywriter</h1>
              <p className="mt-1 text-sm text-white/40">Scripts for Reels, Shorts, and TikToks</p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {platformOptions.map((po) => (
                <button
                  key={po.value}
                  onClick={() => createScript(po.value)}
                  className="flex items-start gap-4 rounded-2xl border border-dashed border-white/10 p-5 text-left transition hover:border-white/20 hover:bg-white/[0.02]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                    <span className="material-symbols-outlined text-xl">{platformIcons[po.value]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{po.label}</p>
                    <p className="mt-0.5 text-xs text-white/40">{po.desc}</p>
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
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10">
                          <span className="material-symbols-outlined text-lg text-pink-400">
                            {platformIcons[s.platform]}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{s.title}</p>
                          <p className="mt-0.5 text-xs text-white/40">{platformLabels[s.platform]}</p>
                        </div>
                        <span className="material-symbols-outlined text-lg text-white/20 sm:hidden">chevron_right</span>
                      </div>
                      <div className="flex items-center gap-3 pl-[52px] sm:pl-0">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            s.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
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
                  <p className="text-xs text-white/30">{platformLabels[activeScript.platform]}</p>
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
                      description: "Short form script pushed to your GoHighLevel workspace.",
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
                    activeScript.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
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
            </div>

            <div className="space-y-4">
              {activeScript.sections.map((section, i) => (
                <div key={section.id} className="rounded-2xl border border-white/8 bg-cc-surface p-4 sm:p-5">
                  <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-pink-500/10 text-[10px] font-bold text-pink-400">
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
