import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Studio from "@/pages/studio";
import CreateAsset from "@/pages/create-asset";
import LandingPages from "@/pages/landing-pages";
import LeadMagnets from "@/pages/lead-magnets";
import Websites from "@/pages/websites";
import EditImport from "@/pages/edit-import";
import AuthSync from "@/pages/auth-sync";
import Billing from "@/pages/billing";
import TuesdayDemo from "@/pages/tuesday-demo";
import MarketResearch from "@/pages/market-research";
import ICPCreator from "@/pages/icp";
import CourseOutlines from "@/pages/course-outlines";
import Funnels from "@/pages/funnels";
import ShortForm from "@/pages/short-form";
import LongForm from "@/pages/long-form";
import Resources from "@/pages/resources";
import ResourcesTemplates from "@/pages/resources-templates";
import ResourcesCreatorPack from "@/pages/resources-creator-pack";
import CommunityHub from "@/pages/community-hub";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />

      {/* AI Studio hub + sub-routes */}
      <Route path="/studio" component={Studio} />
      <Route path="/studio/create" component={CreateAsset} />
      <Route path="/studio/research" component={MarketResearch} />
      <Route path="/studio/courses" component={CourseOutlines} />
      <Route path="/studio/funnels" component={Funnels} />
      <Route path="/studio/short-form" component={ShortForm} />
      <Route path="/studio/long-form" component={LongForm} />
      <Route path="/studio/icp" component={ICPCreator} />
      <Route path="/studio/landing-pages" component={LandingPages} />
      <Route path="/studio/lead-magnets" component={LeadMagnets} />
      <Route path="/studio/websites" component={Websites} />

      {/* Resources hub + sub-routes */}
      <Route path="/resources" component={Resources} />
      <Route path="/resources/templates" component={ResourcesTemplates} />
      <Route path="/resources/creator-pack" component={ResourcesCreatorPack} />

      {/* Community hub */}
      <Route path="/community" component={CommunityHub} />

      {/* Billing */}
      <Route path="/billing" component={Billing} />
      <Route path="/courses" component={Billing} />

      {/* Edit & Import (accessible via direct link, not in nav) */}
      <Route path="/cc360" component={EditImport} />
      <Route path="/edit-import" component={EditImport} />

      {/* Internal-only: auth config and demo */}
      <Route path="/affiliate" component={AuthSync} />
      <Route path="/auth" component={AuthSync} />
      <Route path="/templates" component={TuesdayDemo} />
      <Route path="/demo" component={TuesdayDemo} />

      {/* Backward-compat redirects */}
      <Route path="/ai-studio" component={() => <Redirect to="/studio/create" />} />
      <Route path="/create" component={() => <Redirect to="/studio/create" />} />
      <Route path="/market-research" component={() => <Redirect to="/studio/research" />} />
      <Route path="/course-outlines" component={() => <Redirect to="/studio/courses" />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="dark">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
