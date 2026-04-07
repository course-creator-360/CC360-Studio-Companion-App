import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { label: "Funnel Templates", desc: "Opt-in, webinar, and sales funnels ready to import", icon: "filter_alt", count: 12 },
  { label: "Email Templates", desc: "Welcome sequences, launch campaigns, and follow-ups", icon: "mail", count: 24 },
  { label: "Automation Workflows", desc: "Lead nurture, onboarding, and re-engagement flows", icon: "account_tree", count: 8 },
  { label: "Form & Survey Templates", desc: "Application forms, feedback surveys, and quizzes", icon: "assignment", count: 15 },
  { label: "Website Templates", desc: "Full website layouts for coaches and creators", icon: "language", count: 6 },
  { label: "Social Media Templates", desc: "Post templates, carousel layouts, and story frameworks", icon: "share", count: 18 },
];

export default function ResourcesTemplates() {
  const { toast } = useToast();

  return (
    <AppLayout>
      <div className={PAGE_SHELL}>
        <div className="mb-1">
          <Link href="/resources">
            <span className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-white/30 transition hover:text-white/60">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Resources
            </span>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white">Template Hub</h1>
          <p className="mt-1 text-sm text-white/40">
            Browse and import templates directly into your CC360 account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => toast({ title: `${cat.label}`, description: `${cat.count} templates available. Import feature coming soon.` })}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-cc-surface p-6 text-left transition hover:border-white/15"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{cat.label}</p>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold text-white/30">{cat.count}</span>
                </div>
                <p className="mt-1 text-xs text-white/40">{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
