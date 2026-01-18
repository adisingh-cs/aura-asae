import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LoadingScreen } from "./components/LoadingScreen";
import { MagicalCreaturesCanvas } from "./components/magical-creatures/MagicalCreaturesCanvas";
import { LocaleProvider } from "./lib/i18n/LocaleContext";
import { useAnalytics } from "./hooks/useAnalytics";
import Index from "./pages/Index";
import CountryLanding from "./pages/CountryLanding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

const App = () => (
  <LocaleProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoadingScreen />
          <MagicalCreaturesCanvas />
          <BrowserRouter>
            <AnalyticsWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/:countryCode" element={<CountryLanding />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnalyticsWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </LocaleProvider>
);

export default App;
