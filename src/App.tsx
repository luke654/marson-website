import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import Vendita from "./pages/Vendita";
import Affitto from "./pages/Affitto";
import DettaglioImmobile from "./pages/DettaglioImmobile";
import VendiImmobile from "./pages/VendiImmobile";
import ChiSiamo from "./pages/ChiSiamo";
import DoveSiamo from "./pages/DoveSiamo";
import DettaglioSede from "./pages/DettaglioSede";
import Contattaci from "./pages/Contattaci";
import Recensioni from "./pages/Recensioni";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import DebugDescriptions from "./pages/DebugDescriptions";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Review Pages - NO Layout, NO redirects */}
          <Route path="/recensioni-legnano" element={<Recensioni forcedSede="legnano" />} />
          <Route path="/recensioni-canegrate" element={<Recensioni forcedSede="canegrate" />} />
          <Route path="/recensioni-sangiorgio" element={<Recensioni forcedSede="sangiorgio" />} />
          <Route path="/recensioni-sanvittoreolona" element={<Recensioni forcedSede="sanvittoreolona" />} />
          <Route path="/recensioni-villacortese" element={<Recensioni forcedSede="villacortese" />} />
          <Route path="/recensioni-bustogarolfo" element={<Recensioni forcedSede="bustogarolfo" />} />
          <Route path="/recensioni" element={<Recensioni />} />

          {/* All other pages use the standard Layout */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route index element={<Index />} />
            <Route path="chi-siamo" element={<ChiSiamo />} />
            <Route path="vendita" element={<Vendita />} />
            <Route path="affitto" element={<Affitto />} />
            <Route path="immobile/:id" element={<DettaglioImmobile />} />
            <Route path="vendi-immobile" element={<VendiImmobile />} />
            <Route path="dove-siamo" element={<DoveSiamo />} />
            <Route path="sede/:slug" element={<DettaglioSede />} />
            <Route path="contattaci" element={<Contattaci />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="debug" element={<DebugDescriptions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
