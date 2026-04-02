import { AppLayout } from "@/components/layout/AppLayout";

export default function Analytics() {
  return (
    <AppLayout title="Analytics">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Performance Intelligence</h2>
          <p className="text-muted-foreground">Deep dive into your funnel conversion metrics.</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 backdrop-blur-sm flex flex-col items-center justify-center text-center min-h-[400px]">
          <span className="material-symbols-outlined text-6xl text-brand-blue mb-6 opacity-50">monitoring</span>
          <h3 className="text-xl font-bold text-white mb-2">Data Aggregation in Progress</h3>
          <p className="text-muted-foreground max-w-md">Your funnels need to process initial traffic before neural analytics can generate meaningful conversion models.</p>
        </div>
      </div>
    </AppLayout>
  );
}
