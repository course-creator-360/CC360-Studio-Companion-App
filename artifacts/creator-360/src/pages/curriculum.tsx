import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useListProjects,
  useCreateProject,
  useListFunnels,
  useCreateFunnel,
  useUpdateFunnel,
  useInitializeFunnel,
  getListFunnelsQueryKey,
  getListProjectsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Curriculum() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState<"draft" | "published" | "archived">("draft");
  const { data: projects = [] } = useListProjects({ status: activeTab });
  
  const createProject = useCreateProject();
  useEffect(() => {
    if (projects.length === 0 && !createProject.isPending && activeTab === "draft") {
    }
  }, [projects.length, activeTab, createProject]);

  const activeProject = projects[0];
  const { data: funnels = [] } = useListFunnels({ projectId: activeProject?.id }, {
    query: { enabled: !!activeProject?.id }
  });
  const activeFunnel = funnels[0];

  const createFunnel = useCreateFunnel();
  const updateFunnel = useUpdateFunnel();
  const initializeFunnel = useInitializeFunnel ? useInitializeFunnel() : null;

  const [formData, setFormData] = useState({
    targetAudience: "",
    coreOffer: "",
    conversionGoal: "automated_webinar" as any,
    trafficSource: "meta_ads" as any,
  });

  useEffect(() => {
    if (activeFunnel) {
      setFormData({
        targetAudience: activeFunnel.targetAudience || "",
        coreOffer: activeFunnel.coreOffer || "",
        conversionGoal: activeFunnel.conversionGoal || "automated_webinar",
        trafficSource: activeFunnel.trafficSource || "meta_ads",
      });
    }
  }, [activeFunnel]);

  const handleInitialize = () => {
    if (!activeProject) {
      createProject.mutate({ data: { name: "New Campaign" } }, {
        onSuccess: (project) => {
          createFunnel.mutate({
            data: {
              projectId: project.id,
              ...formData
            }
          }, {
            onSuccess: (funnel) => {
              if (initializeFunnel) {
                initializeFunnel.mutate({ id: funnel.id }, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: getListFunnelsQueryKey() });
                    toast({
                      title: "Analysis Complete",
                      description: "Neural market research engine has initialized architecture.",
                    });
                  }
                });
              } else {
                toast({
                  title: "Analysis Started",
                  description: "Simulated initialization complete.",
                });
              }
            }
          });
        }
      });
      return;
    }

    if (!activeFunnel) {
      createFunnel.mutate({
        data: {
          projectId: activeProject.id,
          ...formData
        }
      }, {
        onSuccess: (funnel) => {
          if (initializeFunnel) {
            initializeFunnel.mutate({ id: funnel.id }, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getListFunnelsQueryKey() });
                toast({
                  title: "Analysis Complete",
                  description: "Neural market research engine has initialized architecture.",
                });
              }
            });
          }
        }
      });
    } else {
      updateFunnel.mutate({
        id: activeFunnel.id,
        data: formData
      }, {
        onSuccess: () => {
          if (initializeFunnel) {
            initializeFunnel.mutate({ id: activeFunnel.id }, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: getListFunnelsQueryKey() });
                toast({
                  title: "Analysis Complete",
                  description: "Neural market research engine has initialized architecture.",
                });
              }
            });
          }
        }
      });
    }
  };

  const isAnalyzing = initializeFunnel?.isPending || false;
  const progress = activeFunnel?.buildProgress || 0;
  const status = activeFunnel?.aiEngineStatus || "ready";

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-12 py-12">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cc-primary">Phase 01</span>
          <span className="w-8 h-[1px] bg-white/30"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Funnel Strategy</span>
        </div>

        <div className="mb-16">
          <h2 className="text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Funnel Strategy</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
            Construct the foundational architecture of your conversion path. This data initializes our neural market research engine to pinpoint your ideal audience segment.
          </p>
        </div>

        <div className="space-y-12">
          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-cc-primary mb-4 transition-colors group-focus-within:text-white">
              Target Audience
            </label>
            <div className="relative">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 text-white py-6 px-0 text-2xl font-light placeholder:text-white/20 resize-none transition-all border-b border-white/20 focus:border-cc-primary outline-none" 
                placeholder="Describe the specific profile, pain points, and desires of your ideal customer..." 
                rows={3}
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-cc-primary mb-4 transition-colors group-focus-within:text-white">
              Core Offer
            </label>
            <div className="relative">
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-white py-6 px-0 text-2xl font-light placeholder:text-white/20 transition-all border-b border-white/20 focus:border-cc-primary outline-none" 
                placeholder="e.g., The 12-Week Transformation Masterclass" 
                type="text"
                value={formData.coreOffer}
                onChange={(e) => setFormData({...formData, coreOffer: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-cc-primary mb-4">
                Primary Conversion Goal
              </label>
              <select 
                className="w-full bg-transparent border-none border-b border-white/20 focus:ring-0 focus:border-cc-primary text-white py-4 px-0 text-lg appearance-none cursor-pointer outline-none [&>option]:bg-cc-background"
                value={formData.conversionGoal}
                onChange={(e) => setFormData({...formData, conversionGoal: e.target.value as any})}
              >
                <option value="automated_webinar">Automated Webinar</option>
                <option value="lead_magnet">Lead Magnet Ebook</option>
                <option value="direct_sales">Direct Sales Page</option>
                <option value="free_consultation">Free Consultation Call</option>
                <option value="high_ticket_application">High-Ticket Application</option>
              </select>
            </div>

            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-cc-primary mb-4">
                Estimated Traffic Source
              </label>
              <select 
                className="w-full bg-transparent border-none border-b border-white/20 focus:ring-0 focus:border-cc-primary text-white py-4 px-0 text-lg appearance-none cursor-pointer outline-none [&>option]:bg-cc-background"
                value={formData.trafficSource}
                onChange={(e) => setFormData({...formData, trafficSource: e.target.value as any})}
              >
                <option value="meta_ads">Meta Paid Advertising</option>
                <option value="organic_seo">Organic Search / SEO</option>
                <option value="youtube">YouTube Content</option>
                <option value="linkedin">LinkedIn Outreach</option>
              </select>
            </div>
          </div>

          <div className="pt-12 flex flex-col items-start gap-8">
            <button 
              onClick={handleInitialize}
              disabled={isAnalyzing}
              className={`group relative inline-flex items-center gap-4 bg-cc-primary text-white px-10 py-5 rounded-lg font-bold text-sm tracking-widest uppercase neon-haze neon-haze-hover transition-all ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              {isAnalyzing ? 'Initializing...' : 'Initialize Market Research'}
              {!isAnalyzing && <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">trending_flat</span>}
            </button>
            <div className="flex items-center gap-4 text-white/40">
              <span className="material-symbols-outlined text-sm">info</span>
              <p className="text-xs font-medium tracking-tight">System will analyze 4.2M data points based on your inputs.</p>
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-3 gap-16 border-t border-white/10 pt-16">
          <div>
            <span className="text-3xl font-light text-white block mb-2">{progress}%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cc-primary">Build Progress</span>
            <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cc-primary transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div>
            <span className="text-3xl font-light text-white block mb-2 capitalize">
              {isAnalyzing ? 'Analyzing' : status}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cc-primary">AI Engine Status</span>
            <p className="text-[11px] text-white/40 mt-4 leading-relaxed italic">
              "{isAnalyzing ? 'Processing architecture parameters...' : status === 'complete' ? 'Analysis complete.' : 'Standing by for architecture parameters.'}"
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-cc-primary/20 flex items-center justify-center relative">
              <div className={`absolute inset-0 rounded-full border-t-2 border-cc-primary duration-[3000ms] opacity-50 ${isAnalyzing || status === 'analyzing' ? 'animate-spin' : ''}`}></div>
              <span className="material-symbols-outlined text-cc-primary text-3xl">memory</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
