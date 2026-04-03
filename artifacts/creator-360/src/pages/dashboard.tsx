import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import {
  useHealthCheck,
} from "@workspace/api-client-react";

export default function Dashboard() {
  const { data: health } = useHealthCheck();

  return (
    <AppLayout>
      <div className="w-full max-w-6xl px-12 py-12 mx-auto flex flex-col justify-center min-h-[calc(100vh-4rem)]">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter mb-4">
            What do you want to do today?
          </h2>
          <div className="h-1 w-24 bg-cc-primary rounded-full mb-6"></div>
          <p className="text-cc-on-surface-variant text-lg max-w-xl font-medium leading-relaxed">
            Select an architected workflow to begin building your next high-converting asset. Every project is optimized for growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/ai-studio" aria-label="Build a Funnel — Launch the funnel architect">
            <div className="group relative bg-cc-surface p-8 rounded-2xl border border-cc-outline-variant/10 transition-all duration-300 hover:scale-[1.03] hover:bg-cc-surface-container card-glow cursor-pointer h-full">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cc-primary/10 text-cc-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined !text-3xl neon-icon-glow" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Build a Funnel</h3>
              <p className="text-cc-on-surface-variant text-sm mb-8 leading-relaxed">Design high-converting visitor journeys with our automated architectural frameworks.</p>
              <div className="flex items-center gap-2 text-cc-primary font-bold text-sm tracking-wide">
                <span>LAUNCH ARCHITECT</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

          <Link href="/templates" aria-label="Build a Lead Magnet — Start creating">
            <div className="group relative bg-cc-surface p-8 rounded-2xl border border-cc-outline-variant/10 transition-all duration-300 hover:scale-[1.03] hover:bg-cc-surface-container card-glow cursor-pointer h-full">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cc-primary/10 text-cc-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined !text-3xl neon-icon-glow" style={{ fontVariationSettings: "'FILL' 1" }}>nest_cam_magnet_mount</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Build a Lead Magnet</h3>
              <p className="text-cc-on-surface-variant text-sm mb-8 leading-relaxed">Create irresistible value propositions that turn casual browsers into loyal subscribers.</p>
              <div className="flex items-center gap-2 text-cc-primary font-bold text-sm tracking-wide">
                <span>START CREATING</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

          <Link href="/templates" aria-label="Write an Email — Open the email editor">
            <div className="group relative bg-cc-surface p-8 rounded-2xl border border-cc-outline-variant/10 transition-all duration-300 hover:scale-[1.03] hover:bg-cc-surface-container card-glow cursor-pointer h-full">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cc-primary/10 text-cc-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined !text-3xl neon-icon-glow" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Write an Email</h3>
              <p className="text-cc-on-surface-variant text-sm mb-8 leading-relaxed">Draft persuasive sequences or broadcast newsletters with precision-engineered AI tools.</p>
              <div className="flex items-center gap-2 text-cc-primary font-bold text-sm tracking-wide">
                <span>OPEN EDITOR</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex gap-4 mt-16 justify-center lg:justify-start">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cc-surface-container border border-cc-outline-variant/20 text-xs font-semibold text-cc-on-surface-variant">
            <span className={`w-2 h-2 rounded-full ${health ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
            {health ? 'System Operational' : 'Connecting...'}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cc-surface-container border border-cc-outline-variant/20 text-xs font-semibold text-cc-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Shortcut: ⌘ + K
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
