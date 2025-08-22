import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { BookingProvider } from "./context/BookingContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeToggle } from "./components/ui/ThemeToggle";
import { BackToTop } from "./components/ui/BackToTop";
import Index from "./pages/Index";
import { default as RoutesPage } from "./pages/Routes";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import BookingHistory from "./pages/BookingHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BookingProvider>
        <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
              <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                  <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
              </AnimatePresence>
              <ThemeToggle />
              <BackToTop />
      </BrowserRouter>
    </TooltipProvider>
        </LanguageProvider>
      </BookingProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
