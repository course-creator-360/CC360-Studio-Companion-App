import { useState } from "react";
import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { PAGE_SHELL } from "@/lib/page-layout";
import { useToast } from "@/hooks/use-toast";

const prompts = [
  { id: "p1", title: "Course Topic Validator", category: "Research", prompt: "Act as a market research analyst. I want to create an online course about [TOPIC]. Analyze the market demand, competition level, and monetization potential. Give me a score from 1-10 on viability and explain why." },
  { id: "p2", title: "ICP Deep Dive", category: "Research", prompt: "Act as a customer research expert. My ideal customer is [DESCRIPTION]. Build a detailed ideal customer profile including demographics, psychographics, top 5 pain points, top 5 desired outcomes, buying triggers, and common objections." },
  { id: "p3", title: "Email Subject Line Generator", category: "Email", prompt: "Generate 20 email subject lines for a [TYPE] email about [TOPIC]. Include a mix of curiosity-driven, benefit-driven, urgency-driven, and personalized subject lines. Rate each on a scale of 1-10 for expected open rate." },
  { id: "p4", title: "Sales Page Headline Framework", category: "Copy", prompt: "Write 10 headline variations for a sales page selling [PRODUCT] to [AUDIENCE]. Use these frameworks: PAS, AIDA, Before-After-Bridge, and How-To. Make each headline specific and outcome-focused." },
  { id: "p5", title: "Webinar Title Generator", category: "Content", prompt: "Generate 15 webinar title options for a presentation about [TOPIC] targeting [AUDIENCE]. Each title should promise a specific outcome and create curiosity. Include a subtitle for each." },
  { id: "p6", title: "Lead Magnet Ideas", category: "Growth", prompt: "Give me 10 lead magnet ideas for a [NICHE] business targeting [AUDIENCE]. For each, include: the title, format (PDF, quiz, video, template), estimated creation time, and a one-line hook that would make someone opt in." },
  { id: "p7", title: "Welcome Sequence Writer", category: "Email", prompt: "Write a 5-email welcome sequence for new subscribers who opted in for [LEAD MAGNET]. The goal is to build trust and lead them to [CTA]. Include subject lines, preview text, and full email body for each." },
  { id: "p8", title: "Instagram Reel Script", category: "Social", prompt: "Write a 30-second Instagram Reel script about [TOPIC] for [AUDIENCE]. Structure: attention-grabbing hook (first 3 seconds), value delivery (20 seconds), CTA (7 seconds). Include on-screen text suggestions and hashtags." },
  { id: "p9", title: "Course Module Outliner", category: "Courses", prompt: "Create a detailed course outline for a [LENGTH]-week course on [TOPIC]. For each module, include: module title, learning objectives, 4-6 lesson titles, and one assignment. The course should take students from [START STATE] to [END STATE]." },
  { id: "p10", title: "Testimonial Request Email", category: "Email", prompt: "Write an email asking past customers of [PRODUCT] for a video testimonial. Make it easy to say yes by including 5 specific prompts they can answer on camera. Keep the tone warm and grateful, not transactional." },
  { id: "p11", title: "YouTube Video Script", category: "Content", prompt: "Write a full script for a [LENGTH]-minute YouTube video titled \"[TITLE]\" targeting [AUDIENCE]. Include: hook (first 15 seconds), intro, 3-5 main sections with transitions, and CTA. Add notes for B-roll and graphics." },
  { id: "p12", title: "Objection Handler", category: "Sales", prompt: "List the top 10 objections someone would have before buying [PRODUCT] at [PRICE]. For each objection, write: the objection in their words, the underlying fear, and a 2-3 sentence response that addresses it with empathy and proof." },
];

const categories = [...new Set(prompts.map((p) => p.category))];

export default function ResourcesCreatorPack() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? prompts.filter((p) => p.category === filter) : prompts;

  const copyToClipboard = (prompt: string, title: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      toast({ title: "Copied!", description: `"${title}" prompt copied to clipboard.` });
    });
  };

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
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-white">AI Creator Pack</h1>
          <p className="mt-1 text-sm text-white/40">
            {prompts.length} copy-and-paste AI prompts built for course creators. Click any card to copy.
          </p>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${!filter ? "bg-cc-primary text-white" : "text-white/40 hover:bg-white/5 hover:text-white/60"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === cat ? "bg-cc-primary text-white" : "text-white/40 hover:bg-white/5 hover:text-white/60"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => copyToClipboard(p.prompt, p.title)}
              className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-cc-surface p-5 text-left transition hover:border-white/15"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{p.title}</p>
                  <span className="mt-1 inline-block rounded-full bg-purple-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-400">
                    {p.category}
                  </span>
                </div>
                <span className="material-symbols-outlined text-lg text-white/10 transition group-hover:text-white/40">content_copy</span>
              </div>
              <p className="text-xs leading-relaxed text-white/40 line-clamp-3">{p.prompt}</p>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
