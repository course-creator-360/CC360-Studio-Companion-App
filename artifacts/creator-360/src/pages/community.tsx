import { AppLayout } from "@/components/layout/AppLayout";

export default function Community() {
  return (
    <AppLayout title="Community">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Student Nexus</h2>
          <p className="text-muted-foreground">Manage your enrolled students and community engagement.</p>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 backdrop-blur-sm flex flex-col items-center justify-center text-center min-h-[400px]">
          <span className="material-symbols-outlined text-6xl text-brand-blue mb-6 opacity-50">groups</span>
          <h3 className="text-xl font-bold text-white mb-2">No Active Enrollments</h3>
          <p className="text-muted-foreground max-w-md">Publish your first funnel to start building your community network.</p>
        </div>
      </div>
    </AppLayout>
  );
}
