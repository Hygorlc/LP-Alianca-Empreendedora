import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import LandingPage from "@/pages/LandingPage";
import Inscricao from "@/pages/Inscricao";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/inscricao" component={Inscricao} />
        {/* Fallback para a landing page */}
        <Route component={LandingPage} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
