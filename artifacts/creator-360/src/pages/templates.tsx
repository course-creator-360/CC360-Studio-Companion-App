import { AppLayout } from "@/components/layout/AppLayout";

export default function Templates() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-12 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Template Library</h2>
          <p className="text-cc-on-surface-variant/70">Pre-built frameworks for funnels, lead magnets, and email sequences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cc-surface border border-cc-outline-variant/10 rounded-2xl p-6 card-glow cursor-pointer hover:bg-cc-surface-container transition-all group">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cc-primary/10 text-cc-primary">
              <span className="material-symbols-outlined neon-icon-glow" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Webinar Funnel</h3>
            <p className="text-cc-on-surface-variant/70 text-sm mb-4">Automated webinar registration and follow-up sequence.</p>
            <span className="text-xs text-cc-primary font-bold uppercase tracking-wider">Coming Soon</span>
          </div>

          <div className="bg-cc-surface border border-cc-outline-variant/10 rounded-2xl p-6 card-glow cursor-pointer hover:bg-cc-surface-container transition-all group">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cc-primary/10 text-cc-primary">
              <span className="material-symbols-outlined neon-icon-glow" style={{ fontVariationSettings: "'FILL' 1" }}>nest_cam_magnet_mount</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ebook Lead Magnet</h3>
            <p className="text-cc-on-surface-variant/70 text-sm mb-4">Downloadable guide with opt-in capture page.</p>
            <span className="text-xs text-cc-primary font-bold uppercase tracking-wider">Coming Soon</span>
          </div>

          <div className="bg-cc-surface border border-cc-outline-variant/10 rounded-2xl p-6 card-glow cursor-pointer hover:bg-cc-surface-container transition-all group">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cc-primary/10 text-cc-primary">
              <span className="material-symbols-outlined neon-icon-glow" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Welcome Sequence</h3>
            <p className="text-cc-on-surface-variant/70 text-sm mb-4">5-email onboarding series for new subscribers.</p>
            <span className="text-xs text-cc-primary font-bold uppercase tracking-wider">Coming Soon</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
