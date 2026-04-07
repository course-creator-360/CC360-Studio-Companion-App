import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";

const resources = [
  {
    label: "Template Hub",
    desc: "Import funnels, emails, automations, and more directly into CC360",
    icon: "dashboard_customize",
    href: "/resources/templates",
    color: "bg-blue-500/10 text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    label: "AI Creator Pack",
    desc: "12+ copy-and-paste AI prompts for course creators",
    icon: "smart_toy",
    href: "/resources/creator-pack",
    color: "bg-purple-500/10 text-purple-400",
    borderColor: "border-purple-500/20",
  },
  {
    label: "YouTube Thumbnail Templates",
    desc: "Proven thumbnail layouts and swipe files",
    icon: "image",
    href: "",
    color: "bg-rose-500/10 text-rose-400",
    borderColor: "border-rose-500/20",
    comingSoon: true,
  },
  {
    label: "100+ Hook Templates",
    desc: "Swipe file of high-performing hooks for any platform",
    icon: "format_quote",
    href: "",
    color: "bg-amber-500/10 text-amber-400",
    borderColor: "border-amber-500/20",
    comingSoon: true,
  },
];

export default function Resources() {
  const { toast } = useToast();

  return (
    <AppLayout>
      <div className={PAGE_SHELL}>
        <div className="mb-8">
          <h1 className="text-xl font-extrabold text-white sm:text-2xl">Resources & Materials</h1>
          <p className="mt-1 text-sm text-white/40">
            Templates, swipe files, and tools to accelerate your content creation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((r) => {
            const inner = (
              <div
                className={`group relative flex flex-col gap-4 rounded-2xl border p-6 transition ${
                  r.comingSoon
                    ? "border-white/8 bg-cc-surface cursor-default"
                    : `${r.borderColor} bg-cc-surface hover:border-white/20 cursor-pointer`
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${r.color}`}>
                  <span className="material-symbols-outlined text-2xl">{r.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{r.label}</p>
                    {r.comingSoon && (
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/30">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-white/40">{r.desc}</p>
                </div>
                {!r.comingSoon && (
                  <span className="material-symbols-outlined absolute right-5 top-5 text-lg text-white/10 transition group-hover:text-white/30">
                    arrow_forward
                  </span>
                )}
              </div>
            );

            if (r.comingSoon) {
              return (
                <button key={r.label} onClick={() => toast({ title: "Coming soon", description: `${r.label} will be available in a future update.` })}>
                  {inner}
                </button>
              );
            }

            return (
              <Link key={r.label} href={r.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
