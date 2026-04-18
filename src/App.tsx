/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/layout/Hero";
import SearchBox from "@/src/components/shared/SearchBox";
import VehicleCard from "@/src/components/shared/VehicleCard";
import Footer from "@/src/components/layout/Footer";
import { MOCK_VEHICLES } from "@/src/lib/mockData";
import { semanticSearch } from "@/src/services/searchService";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";
import { A11yProvider, useA11y } from "./context/A11yContext";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import CriteriaManager from "./pages/CriteriaManager";
import JudgingSettings from "./pages/JudgingSettings";
import AnalyticsTracker from "./components/shared/AnalyticsTracker";

function Store() {
  const [vehicles, setVehicles] = React.useState(MOCK_VEHICLES);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setVehicles(MOCK_VEHICLES);
      return;
    }
    setIsSearching(true);
    try {
      const results = await semanticSearch(query);
      setVehicles(results);
    } catch (error) {
      console.error("Search failed:", error);
      setVehicles([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Pular para o conteúdo principal</a>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-500">
        <Navbar />
        
        <main id="main-content" className="pb-20" role="main">
          <Hero />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
            <SearchBox onSearch={handleSearch} isSearching={isSearching} />
          </div>

          <section className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-primary font-bold uppercase tracking-widest text-[10px] px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full w-fit">
                  EXCLUSIVIDADE CARBUY
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
                  Ofertas <span className="text-primary italic underline decoration-2 underline-offset-4">Premium</span>
                </h2>
                <p className="text-lg text-muted-foreground font-medium max-w-lg">
                  Curadoria manual dos melhores veículos do mercado com inspeção técnica rigorosa.
                </p>
              </div>
              <div className="flex items-center gap-3 px-8 py-4 bg-card border border-border rounded-3xl shadow-xl shadow-black/5 dark:shadow-white/5 text-foreground font-bold uppercase text-xs tracking-widest">
                <Sparkles className="w-4 h-4 text-primary" />
                {vehicles.length} OPORTUNIDADES
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {vehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.05 
                    }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {vehicles.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center bg-card border border-dashed border-border rounded-[3rem]"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">Vazio por aqui...</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto font-medium">
                  Não encontramos o que você descreveu. Que tal tentar uma busca mais ampla?
                </p>
                <button 
                  onClick={() => setVehicles(MOCK_VEHICLES)}
                  className="px-10 py-5 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                >
                  Ver Carros Disponíveis
                </button>
              </motion.div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <A11yProvider>
        <BrowserRouter>
          <AnalyticsTracker />
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<JudgingSettings />} />
              <Route path="criteria" element={<CriteriaManager />} />
              <Route path="judging" element={<div className="p-8"><h2 className="text-3xl font-black uppercase">Painel de Julgamento</h2><p className="text-muted-foreground mt-4">Página em desenvolvimento.</p></div>} />
              <Route path="staff" element={<div className="p-8"><h2 className="text-3xl font-black uppercase">Equipe Admin</h2><p className="text-muted-foreground mt-4">Página em desenvolvimento.</p></div>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </A11yProvider>
    </AuthProvider>
  );
}
