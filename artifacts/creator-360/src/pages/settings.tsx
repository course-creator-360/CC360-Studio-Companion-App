import { AppLayout } from "@/components/layout/AppLayout";

export default function Settings() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-12 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">System Configuration</h2>
          <p className="text-cc-on-surface-variant/70">Manage global parameters for your command center.</p>
        </div>
        
        <div className="bg-cc-surface border border-cc-outline-variant/10 rounded-2xl p-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Account Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cc-primary font-bold">Email Address</label>
                  <input type="text" disabled value="creator@example.com" className="w-full bg-cc-surface-container border border-cc-outline-variant/10 rounded-lg py-3 px-4 text-white opacity-50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-cc-primary font-bold">Creator Name</label>
                  <input type="text" defaultValue="Alex Rivera" className="w-full bg-cc-surface-container border border-cc-outline-variant/20 focus:border-cc-primary rounded-lg py-3 px-4 text-white outline-none transition-colors" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-cc-outline-variant/10 pt-8">
              <h3 className="text-lg font-bold text-white mb-4">Integrations</h3>
              <p className="text-cc-on-surface-variant/70 text-sm mb-4">Connect external services to the AI engine.</p>
              <button className="bg-cc-surface-container hover:bg-cc-primary/10 text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors border border-cc-outline-variant/20">
                Connect Stripe
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
