import { AppLayout } from "@/components/layout/AppLayout";
import { 
  useGetDashboardSummary, 
  getGetDashboardSummaryQueryKey,
  useGetRecentActivity,
  getGetRecentActivityQueryKey,
  useHealthCheck,
  getHealthCheckQueryKey
} from "@workspace/api-client-react";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary();
  const { data: activity, isLoading: loadingActivity } = useGetRecentActivity();
  const { data: health } = useHealthCheck();

  return (
    <AppLayout title="Dashboard">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Mission Control</h2>
          <p className="text-muted-foreground">Overview of your digital empire and active funnels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-4">Total Projects</h3>
            {loadingSummary ? (
              <div className="h-10 w-16 bg-white/10 animate-pulse rounded"></div>
            ) : (
              <p className="text-4xl font-light text-white">{summary?.totalProjects || 0}</p>
            )}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-4">Active Funnels</h3>
            {loadingSummary ? (
              <div className="h-10 w-16 bg-white/10 animate-pulse rounded"></div>
            ) : (
              <p className="text-4xl font-light text-white">{summary?.totalFunnels || 0}</p>
            )}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-4">AI Engine</h3>
            {loadingSummary ? (
              <div className="h-10 w-24 bg-white/10 animate-pulse rounded mt-2"></div>
            ) : (
              <p className="text-xl font-light text-white mt-2 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${summary?.aiEngineReady ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                {summary?.aiEngineReady ? 'Ready' : 'Initializing'}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm min-h-[300px]">
              {loadingActivity ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-white/20"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        <div className="h-3 bg-white/5 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activity && activity.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {activity.map((item) => (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-3 h-3 rounded-full border border-white/30 bg-background group-[.is-active]:bg-brand-blue group-[.is-active]:border-brand-blue/30 group-hover:scale-150 transition-transform duration-300 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(4,117,255,0.5)]"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-white text-sm capitalize">{item.type.replace(/_/g, ' ')}</div>
                          <time className="text-xs text-brand-blue/80 font-mono">{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</time>
                        </div>
                        <div className="text-muted-foreground text-sm leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground pt-20">
                  No recent activity.
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">System Status</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm min-h-[300px]">
               <div className="space-y-4">
                 <div className="flex justify-between items-center pb-4 border-b border-white/10">
                   <span className="text-sm text-muted-foreground">API Connection</span>
                   <span className={`text-sm ${health ? 'text-green-400' : 'text-yellow-400'}`}>{health ? 'Online' : 'Checking'}</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-white/10">
                   <span className="text-sm text-muted-foreground">Neural Engine</span>
                   <span className="text-sm text-green-400">Online</span>
                 </div>
                 <div className="flex justify-between items-center pb-4">
                   <span className="text-sm text-muted-foreground">Build Queue</span>
                   <span className="text-sm text-white">Empty</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
