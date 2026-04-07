import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

const initialSubject = "Your next best step for spring enrollment";
const initialBody = `Hey {{contact.first_name}},

You already raised your hand for the checklist, so the next step is simple:

Book a short application call and we will map the cleanest path to your next enrollment push.

Inside the call we will cover:
- the fastest win hiding in your current funnel
- the message angle most likely to convert warm leads
- the follow-up sequence that keeps momentum high

Use the application link below and pick a slot that works for you.

See you there,
Canyon`;

export default function EditImport() {
  const { toast } = useToast();
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [imported, setImported] = useState(false);

  const handleImport = () => {
    setImported(true);
    toast({ title: "Imported to GHL", description: "Email template created in your GoHighLevel workspace." });
  };

  return (
    <AppLayout>
      <div className="flex min-h-0 w-full min-w-0 flex-col lg:h-[calc(100vh-4rem)] lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col border-white/5 lg:border-r">
          <div className="flex flex-col gap-3 border-b border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="material-symbols-outlined shrink-0 text-lg text-white/30">mail</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Email 1 of 5</p>
                <p className="text-[10px] text-white/30">Spring Enrollment Nurture</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition hover:text-white">
                <span className="material-symbols-outlined text-sm">undo</span>
              </button>
              <button className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition hover:text-white">
                <span className="material-symbols-outlined text-sm">redo</span>
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/50 transition hover:text-white">
                <span className="material-symbols-outlined text-sm">auto_fix_high</span>
                Rewrite
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mx-auto max-w-2xl min-w-0">
              <div className="mb-4">
                <label htmlFor="subject" className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-white/30">Subject</label>
                <input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}
                  className="w-full border-b border-white/10 bg-transparent pb-2 text-lg font-semibold text-white outline-none transition focus:border-cc-primary/50" />
              </div>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={20}
                className="w-full resize-none bg-transparent text-sm leading-7 text-white/80 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex min-w-0 flex-wrap gap-2">
              <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40 transition hover:text-white">
                <span className="material-symbols-outlined text-sm">navigate_before</span>
              </button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className={`h-7 w-7 rounded-lg text-xs font-semibold transition ${n === 1 ? "bg-cc-primary text-white" : "bg-white/5 text-white/40 hover:text-white"}`}>{n}</button>
              ))}
              <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40 transition hover:text-white">
                <span className="material-symbols-outlined text-sm">navigate_next</span>
              </button>
            </div>
            <p className="text-center text-[10px] text-white/20 sm:text-right">Auto-saved</p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col border-t border-white/5 lg:w-[340px] lg:border-l lg:border-t-0">
          <div className="border-b border-white/5 px-4 py-3 sm:px-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">GHL Import</h3>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            <div className={`rounded-2xl border p-4 ${imported ? "border-emerald-500/20 bg-emerald-500/5" : "border-white/8 bg-cc-surface"}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${imported ? "bg-emerald-500/10" : "bg-white/5"}`}>
                  <span className={`material-symbols-outlined text-lg ${imported ? "text-emerald-400" : "text-white/30"}`}>
                    {imported ? "check_circle" : "cloud_upload"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{imported ? "Imported" : "Ready to import"}</p>
                  <p className="text-[10px] text-white/30">{imported ? "Template created in GHL" : "Email template draft"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-cc-surface p-4">
              <h4 className="text-xs font-semibold text-white/40">Destination</h4>
              <p className="mt-2 text-sm text-white">GHL Email Templates</p>
              <p className="text-xs text-white/30">CC360 workspace</p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-cc-surface p-4">
              <h4 className="text-xs font-semibold text-white/40">Mapped fields</h4>
              <div className="mt-3 space-y-2">
                {[
                  ["Subject", subject],
                  ["Body", "HTML + plain text"],
                  ["Tags", "companion-app, nurture"],
                  ["Campaign", "spring-enrollment"],
                ].map(([field, value]) => (
                  <div key={field} className="flex items-center justify-between text-xs">
                    <span className="text-white/30">{field}</span>
                    <span className="max-w-[160px] truncate text-white/60">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleImport}
              disabled={imported}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
                imported
                  ? "bg-emerald-500/10 text-emerald-400 cursor-default"
                  : "bg-cc-primary text-white hover:brightness-110"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{imported ? "check" : "publish"}</span>
              {imported ? "Imported successfully" : "Import to GHL"}
            </button>

            {imported && (
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-white/60 transition hover:text-white">
                <span className="material-symbols-outlined text-lg">open_in_new</span>
                Open in GoHighLevel
              </button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
