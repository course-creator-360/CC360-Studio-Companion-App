import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

interface Lesson {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseOutline {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published";
  updatedAt: string;
  modules: Module[];
}

let nextId = 1;
function uid() {
  return `id_${nextId++}`;
}
function lesson(title: string): Lesson {
  return { id: uid(), title };
}

const sampleOutlines: CourseOutline[] = [
  {
    id: "c1",
    title: "Course Creator Accelerator",
    description: "A 6-week program that takes aspiring course creators from idea to first enrollment.",
    status: "published",
    updatedAt: "1 day ago",
    modules: [
      { id: uid(), title: "Module 1: Market Validation", lessons: [lesson("Finding your profitable niche"), lesson("Audience interview framework"), lesson("Competitor gap analysis"), lesson("Validating demand before you build")] },
      { id: uid(), title: "Module 2: Curriculum Design", lessons: [lesson("Mapping the transformation arc"), lesson("Chunking content into modules"), lesson("Choosing delivery formats"), lesson("Building your lesson templates")] },
      { id: uid(), title: "Module 3: Content Production", lessons: [lesson("Recording setup on any budget"), lesson("Batch production workflow"), lesson("Editing and post-production essentials"), lesson("Creating supplemental materials")] },
      { id: uid(), title: "Module 4: Platform & Tech", lessons: [lesson("Choosing your course platform"), lesson("Setting up your sales page"), lesson("Payment and access automation"), lesson("Student onboarding sequence")] },
      { id: uid(), title: "Module 5: Launch Strategy", lessons: [lesson("Pre-launch audience building"), lesson("Launch email sequence"), lesson("Webinar funnel setup"), lesson("Launch week execution plan")] },
      { id: uid(), title: "Module 6: Scale & Optimize", lessons: [lesson("Collecting and using feedback"), lesson("Evergreen funnel conversion"), lesson("Upsell and backend offers"), lesson("Building a student community")] },
    ],
  },
  {
    id: "c2",
    title: "Email Marketing Mastery",
    description: "Help coaches and consultants build email lists that convert to high-ticket clients.",
    status: "draft",
    updatedAt: "3 hours ago",
    modules: [
      { id: uid(), title: "Module 1: List Building Foundations", lessons: [lesson("Lead magnet that actually converts"), lesson("Opt-in page best practices"), lesson("Traffic sources for list growth")] },
      { id: uid(), title: "Module 2: Nurture Sequences", lessons: [lesson("Welcome sequence blueprint"), lesson("Story-based nurture emails"), lesson("Segmentation strategy")] },
      { id: uid(), title: "Module 3: Sales Campaigns", lessons: [lesson("Launch sequence anatomy"), lesson("Objection-handling emails")] },
    ],
  },
];

export default function CourseOutlines() {
  const { toast } = useToast();
  const [outlines, setOutlines] = useState<CourseOutline[]>(sampleOutlines);
  const [view, setView] = useState<"list" | "edit">("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [addingModule, setAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [addingLessonIdx, setAddingLessonIdx] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");

  const activeOutline = outlines.find((o) => o.id === activeId) ?? null;

  const createOutline = () => {
    const id = `c${Date.now()}`;
    const newOutline: CourseOutline = {
      id,
      title: "Untitled Course",
      description: "",
      status: "draft",
      updatedAt: "Just now",
      modules: [],
    };
    setOutlines([newOutline, ...outlines]);
    setActiveId(id);
    setView("edit");
  };

  const openOutline = (id: string) => {
    setActiveId(id);
    setView("edit");
  };

  const updateField = (field: "title" | "description", value: string) => {
    setOutlines((prev) =>
      prev.map((o) => (o.id === activeId ? { ...o, [field]: value, updatedAt: "Just now" } : o)),
    );
  };

  const addModule = () => {
    if (!newModuleTitle.trim()) return;
    setOutlines((prev) =>
      prev.map((o) => {
        if (o.id !== activeId) return o;
        return { ...o, modules: [...o.modules, { id: uid(), title: newModuleTitle.trim(), lessons: [] }], updatedAt: "Just now" };
      }),
    );
    setNewModuleTitle("");
    setAddingModule(false);
  };

  const removeModule = (moduleId: string) => {
    setOutlines((prev) =>
      prev.map((o) => {
        if (o.id !== activeId) return o;
        return { ...o, modules: o.modules.filter((m) => m.id !== moduleId), updatedAt: "Just now" };
      }),
    );
  };

  const addLesson = (moduleId: string) => {
    if (!newLessonTitle.trim()) return;
    setOutlines((prev) =>
      prev.map((o) => {
        if (o.id !== activeId) return o;
        const modules = o.modules.map((m) => {
          if (m.id !== moduleId) return m;
          return { ...m, lessons: [...m.lessons, { id: uid(), title: newLessonTitle.trim() }] };
        });
        return { ...o, modules, updatedAt: "Just now" };
      }),
    );
    setNewLessonTitle("");
    setAddingLessonIdx(null);
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setOutlines((prev) =>
      prev.map((o) => {
        if (o.id !== activeId) return o;
        const modules = o.modules.map((m) => {
          if (m.id !== moduleId) return m;
          return { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) };
        });
        return { ...o, modules, updatedAt: "Just now" };
      }),
    );
  };

  const togglePublish = () => {
    const next = activeOutline?.status === "draft" ? "published" : "draft";
    setOutlines((prev) =>
      prev.map((o) => (o.id === activeId ? { ...o, status: next as "draft" | "published", updatedAt: "Just now" } : o)),
    );
    toast({ title: next === "published" ? "Course published" : "Reverted to draft" });
  };

  const totalLessons = activeOutline?.modules.reduce((sum, m) => sum + m.lessons.length, 0) ?? 0;

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-5xl px-8 py-8">
        {view === "list" && (
          <>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Course Outlines</h1>
                <p className="mt-1 text-sm text-white/40">Structure your courses with modules and lessons.</p>
              </div>
              <button
                onClick={createOutline}
                className="inline-flex items-center gap-2 rounded-xl bg-cc-primary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New Course
              </button>
            </div>

            {outlines.length === 0 ? (
              <div className="mt-16 flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <span className="material-symbols-outlined text-3xl text-white/20">school</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">No courses yet</h2>
                <p className="mt-1 text-sm text-white/40">Create your first course outline to get started.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {outlines.map((o) => {
                  const lessons = o.modules.reduce((s, m) => s + m.lessons.length, 0);
                  return (
                    <button
                      key={o.id}
                      onClick={() => openOutline(o.id)}
                      className="flex w-full items-center gap-4 rounded-2xl border border-white/8 bg-cc-surface p-5 text-left transition hover:border-white/15"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cc-primary/10">
                        <span className="material-symbols-outlined text-lg text-cc-primary">school</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{o.title}</p>
                        <p className="mt-0.5 text-xs text-white/40">
                          {o.modules.length} module{o.modules.length !== 1 ? "s" : ""} &middot; {lessons} lesson{lessons !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            o.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {o.status}
                        </span>
                        <span className="text-[10px] text-white/30 whitespace-nowrap">{o.updatedAt}</span>
                        <span className="material-symbols-outlined text-lg text-white/20">chevron_right</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view === "edit" && activeOutline && (
          <>
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => { setView("list"); setAddingModule(false); setAddingLessonIdx(null); }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <div className="min-w-0 flex-1">
                <input
                  value={activeOutline.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full bg-transparent text-xl font-extrabold text-white outline-none placeholder:text-white/20"
                  placeholder="Course title"
                />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    activeOutline.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {activeOutline.status}
                </span>
                <button
                  onClick={togglePublish}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activeOutline.status === "draft"
                      ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  }`}
                >
                  {activeOutline.status === "draft" ? "Publish" : "Revert to Draft"}
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-white/8 bg-cc-surface p-5">
              <label className="mb-1.5 block text-xs font-semibold text-white/50">Course Description</label>
              <textarea
                rows={2}
                value={activeOutline.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="What will students learn and achieve?"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cc-primary/50"
              />
              <div className="mt-3 flex items-center gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">view_module</span>
                  {activeOutline.modules.length} modules
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  {totalLessons} lessons
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {activeOutline.modules.map((mod, mi) => (
                <div key={mod.id} className="rounded-2xl border border-white/8 bg-cc-surface p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cc-primary/10 text-xs font-bold text-cc-primary">
                        {mi + 1}
                      </div>
                      <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                    </div>
                    <button
                      onClick={() => removeModule(mod.id)}
                      className="text-white/20 transition hover:text-red-400"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>

                  {mod.lessons.length > 0 && (
                    <div className="ml-9 space-y-1.5">
                      {mod.lessons.map((l) => (
                        <div key={l.id} className="group flex items-center gap-2 rounded-lg px-3 py-1.5 transition hover:bg-white/[0.03]">
                          <span className="material-symbols-outlined text-sm text-white/20">drag_indicator</span>
                          <span className="flex-1 text-sm text-white/70">{l.title}</span>
                          <button
                            onClick={() => removeLesson(mod.id, l.id)}
                            className="text-white/0 transition group-hover:text-white/30 hover:!text-red-400"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {addingLessonIdx === mod.id ? (
                    <div className="ml-9 mt-2 flex items-center gap-2">
                      <input
                        autoFocus
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") addLesson(mod.id); if (e.key === "Escape") setAddingLessonIdx(null); }}
                        placeholder="Lesson title"
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-cc-primary/50"
                      />
                      <button onClick={() => addLesson(mod.id)} className="rounded-lg bg-cc-primary px-3 py-1.5 text-xs font-semibold text-white">Add</button>
                      <button onClick={() => setAddingLessonIdx(null)} className="text-xs text-white/40">Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setAddingLessonIdx(mod.id); setNewLessonTitle(""); }}
                      className="ml-9 mt-2 flex items-center gap-1.5 text-xs font-medium text-cc-primary transition hover:brightness-125"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add lesson
                    </button>
                  )}
                </div>
              ))}
            </div>

            {addingModule ? (
              <div className="mt-4 flex items-center gap-2">
                <input
                  autoFocus
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") addModule(); if (e.key === "Escape") setAddingModule(false); }}
                  placeholder="Module title (e.g. Module 7: Advanced Strategies)"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-cc-primary/50"
                />
                <button onClick={addModule} className="rounded-xl bg-cc-primary px-4 py-2.5 text-sm font-bold text-white">Add</button>
                <button onClick={() => setAddingModule(false)} className="text-sm text-white/40">Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => { setAddingModule(true); setNewModuleTitle(""); }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 py-4 text-sm font-medium text-white/40 transition hover:border-white/20 hover:text-white/60"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Add Module
              </button>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
