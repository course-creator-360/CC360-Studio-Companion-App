import { AppLayout } from "@/components/layout/AppLayout";

export default function Analytics() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-12 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Performance Intelligence</h2>
          <p className="text-cc-on-surface-variant/70">Deep dive into your funnel conversion metrics.</p>
        </div>
        
        <div className="bg-cc-surface border border-cc-outline-variant/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <span className="material-symbols-outlined text-6xl text-cc-primary mb-6 opacity-50">monitoring</span>
          <h3 className="text-xl font-bold text-white mb-2">Data Aggregation in Progress</h3>
          <p className="text-cc-on-surface-variant/70 max-w-md">Your funnels need to process initial traffic before neural analytics can generate meaningful conversion models.</p>
        </div>
      </div>
    </AppLayout>
  );
}
