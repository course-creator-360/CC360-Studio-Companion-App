import { AppLayout } from "@/components/layout/AppLayout";

export default function Settings() {
  return (
    <AppLayout title="Settings">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">System Configuration</h2>
          <p className="text-muted-foreground">Manage global parameters for your command center.</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Account Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-brand-blue font-bold">Email Address</label>
                  <input type="text" disabled value="creator@example.com" className="w-full bg-black/20 border border-white/10 rounded-md py-3 px-4 text-white opacity-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-brand-blue font-bold">Creator Name</label>
                  <input type="text" defaultValue="Admin" className="w-full bg-black/20 border border-white/20 focus:border-brand-blue rounded-md py-3 px-4 text-white outline-none transition-colors" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-bold text-white mb-4">Integrations</h3>
              <p className="text-muted-foreground text-sm mb-4">Connect external services to the AI engine.</p>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md text-sm font-bold transition-colors">
                Connect Stripe
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
