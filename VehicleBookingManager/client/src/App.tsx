import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/context/auth-context";

// ✅ Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import UserLogin from "@/pages/user/login";
import UserRegister from "@/pages/user/register";
import OwnerLogin from "@/pages/owner/login";
import OwnerRegister from "@/pages/owner/register";
import OwnerDashboard from "@/pages/owner/dashboard";
import Vehicles from "@/pages/vehicles";
import CostCalculator from "@/pages/cost-calculator";
import BookingPage from "@/pages/booking";
import RegisterChoice from "@/pages/RegisterChoice";
import LoginChoice from "@/pages/LoginChoice";
import UserDashboard from "@/pages/user/dashboards";


function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Global Navbar */}
      <Navbar />

      {/* ✅ Main Page Container */}
      <main className="flex-grow">
        <Switch>
          {/* ---------- Main Routes ---------- */}
          <Route path="/" component={Home} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/calculator" component={CostCalculator} />

          {/* ---------- Auth Routes ---------- */}
          <Route path="/user/login" component={UserLogin} />
          <Route path="/user/register" component={UserRegister} />
          <Route path="/owner/login" component={OwnerLogin} />
          <Route path="/owner/register" component={OwnerRegister} />

          {/* ---------- Dashboard & Booking ---------- */}
          <Route path="/owner/dashboard" component={OwnerDashboard} />
          {/* Expose owner dashboard at "/dashboard" as requested */}
          <Route path="/dashboard" component={OwnerDashboard} />
          <Route path="/booking/:vehicleId" component={BookingPage} />

          {/* ---------- Registration Choice ---------- */}
          <Route path="/register" component={RegisterChoice} />
          <Route path="/logins" component={LoginChoice} />
          {/* User dashboard moved to /user/dashboard to avoid collision */}
          <Route path="/user/dashboard" component={UserDashboard} />


          {/* ---------- 404 Fallback ---------- */}
          <Route component={NotFound} />
        </Switch>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vehicle-booking-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
