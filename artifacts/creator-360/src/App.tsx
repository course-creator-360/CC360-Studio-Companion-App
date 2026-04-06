import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
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
      <Route path="/ai-studio" component={CreateAsset} />
      <Route path="/create" component={CreateAsset} />
      <Route path="/cc360" component={EditImport} />
      <Route path="/edit-import" component={EditImport} />
      <Route path="/affiliate" component={AuthSync} />
      <Route path="/auth" component={AuthSync} />
      <Route path="/market-research" component={MarketResearch} />
      <Route path="/course-outlines" component={CourseOutlines} />
      <Route path="/courses" component={Billing} />
      <Route path="/billing" component={Billing} />
      <Route path="/templates" component={TuesdayDemo} />
      <Route path="/demo" component={TuesdayDemo} />
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
