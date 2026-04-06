import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Studio from "@/pages/studio";
import CreateAsset from "@/pages/create-asset";
import EditImport from "@/pages/edit-import";
import AuthSync from "@/pages/auth-sync";
import Billing from "@/pages/billing";
import TuesdayDemo from "@/pages/tuesday-demo";
import MarketResearch from "@/pages/market-research";
import CourseOutlines from "@/pages/course-outlines";

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
