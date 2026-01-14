import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { POSLayout } from "@/components/pos/POSLayout";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import POSPage from "./pages/POSPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import SettingsPage from "./pages/SettingsPage";
import CustomersPage from "./pages/CustomersPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/pos"
            element={
              <POSLayout>
                <POSPage />
              </POSLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <POSLayout>
                <DashboardPage />
              </POSLayout>
            }
          />
          <Route
            path="/products"
            element={
              <POSLayout>
                <ProductsPage />
              </POSLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <POSLayout>
                <CustomersPage />
              </POSLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <POSLayout>
                <ReportsPage />
              </POSLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <POSLayout>
                <SettingsPage />
              </POSLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
