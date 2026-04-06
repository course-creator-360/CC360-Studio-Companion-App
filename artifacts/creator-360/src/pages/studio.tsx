import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";

const tools = [
  {
    label: "Course Outlines",
    desc: "Structure courses with modules and lessons",
    icon: "school",
    href: "/studio/courses",
    color: "bg-blue-500/10 text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    label: "Market Research",
    desc: "Audience research and competitor analysis",
    icon: "query_stats",
    href: "/studio/research",
    color: "bg-purple-500/10 text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    label: "Email & SMS",
    desc: "Nurture sequences, broadcasts, and SMS campaigns",
    icon: "mail",
    href: "/studio/create",
    color: "bg-emerald-500/10 text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    label: "Landing Pages",
    desc: "Opt-in and sales page copy",
    icon: "web",
    href: "/studio/landing-pages",
    color: "bg-amber-500/10 text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    label: "Lead Magnets",
    desc: "Downloadable guides, checklists, and PDFs",
    icon: "download",
    href: "/studio/lead-magnets",
    color: "bg-rose-500/10 text-rose-400",
    borderColor: "border-rose-500/20",
  },
  {
    label: "AI Websites",
    desc: "Full website copy and structure",
    icon: "language",
    href: "/studio/websites",
    color: "bg-cyan-500/10 text-cyan-400",
    borderColor: "border-cyan-500/20",
  },
];

export default function Studio() {
  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-5xl px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white">AI Studio</h1>
          <p className="mt-1 text-sm text-white/40">
            Choose a tool to get started. Every asset you create can be edited and imported to GHL.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.label} href={tool.href}>
              <div
                className={`group relative flex flex-col gap-4 rounded-2xl border p-6 transition ${tool.borderColor} bg-cc-surface hover:border-white/20 cursor-pointer`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                  <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{tool.label}</p>
                  <p className="mt-1 text-xs text-white/40">{tool.desc}</p>
                </div>
                <span className="material-symbols-outlined absolute right-5 top-5 text-lg text-white/10 transition group-hover:text-white/30">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
