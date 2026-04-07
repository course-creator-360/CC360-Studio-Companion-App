import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";

const sections = [
  {
    label: "Community",
    desc: "Connect with fellow course creators, share wins, and get feedback",
    icon: "forum",
    color: "bg-blue-500/10 text-blue-400",
    borderColor: "border-blue-500/20",
    action: "external",
    href: "https://community.coursecreator360.com",
  },
  {
    label: "Affiliate Hub",
    desc: "Track your referrals, commissions, and sign up as an affiliate",
    icon: "handshake",
    color: "bg-emerald-500/10 text-emerald-400",
    borderColor: "border-emerald-500/20",
    action: "placeholder",
  },
  {
    label: "Courses",
    desc: "Access your enrolled courses and training materials",
    icon: "school",
    color: "bg-purple-500/10 text-purple-400",
    borderColor: "border-purple-500/20",
    action: "placeholder",
  },
  {
    label: "90-Minute Bootcamp",
    desc: "Watch the intensive bootcamp to jumpstart your course launch",
    icon: "rocket_launch",
    color: "bg-amber-500/10 text-amber-400",
    borderColor: "border-amber-500/20",
    action: "external",
    href: "https://coursecreator360.com/bootcamp",
  },
];

const courseList = [
  { title: "Course Creator Accelerator", lessons: 24, status: "enrolled", progress: 68 },
  { title: "Email Marketing Mastery", lessons: 12, status: "enrolled", progress: 25 },
  { title: "Webinar Funnel Blueprint", lessons: 8, status: "available", progress: 0 },
];

export default function CommunityHub() {
  const { toast } = useToast();

  return (
    <AppLayout>
      <div className={PAGE_SHELL}>
        <div className="mb-8">
          <h1 className="text-xl font-extrabold text-white sm:text-2xl">Community & Courses</h1>
          <p className="mt-1 text-sm text-white/40">
            Connect with creators, access training, and grow your affiliate network.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((s) => {
            const inner = (
              <div className={`group relative flex flex-col gap-4 rounded-2xl border p-6 transition ${s.borderColor} bg-cc-surface hover:border-white/20 cursor-pointer`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{s.label}</p>
                  <p className="mt-1 text-xs text-white/40">{s.desc}</p>
                </div>
                <span className="material-symbols-outlined absolute right-5 top-5 text-lg text-white/10 transition group-hover:text-white/30">
                  {s.action === "external" ? "open_in_new" : "arrow_forward"}
                </span>
              </div>
            );

            if (s.action === "external") {
              return (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              );
            }

            return (
              <button
                key={s.label}
                onClick={() => toast({ title: `${s.label}`, description: "Full experience coming soon. Stay tuned!" })}
                className="text-left"
              >
                {inner}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/40">Your Courses</h2>
          <div className="mt-4 space-y-3">
            {courseList.map((course) => (
              <div key={course.title} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-cc-surface p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                  <span className="material-symbols-outlined text-lg text-purple-400">school</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{course.title}</p>
                  <p className="mt-0.5 text-xs text-white/40">{course.lessons} lessons</p>
                </div>
                {course.status === "enrolled" ? (
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <div className="h-1.5 w-full rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-gradient-to-r from-cc-primary to-blue-400" style={{ width: `${course.progress}%` }} />
                      </div>
                      <p className="mt-1 text-[10px] text-white/30 text-right">{course.progress}%</p>
                    </div>
                    <button
                      onClick={() => toast({ title: "Continue course", description: "Course player opening soon." })}
                      className="rounded-lg bg-cc-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => toast({ title: "Enrollment", description: "Course enrollment coming soon." })}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/60 transition hover:text-white"
                  >
                    Enroll
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
