import * as React from "react";
import { Search, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { trackEvent } from "@/src/lib/firebase";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function SearchBox({ onSearch, isSearching }: SearchBoxProps) {
  const [category, setCategory] = React.useState("carros");
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    onSearch(query);
    if (query.trim()) {
      trackEvent('perform_search', { query: query.trim(), category });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", damping: 20 }}
      className="w-full max-w-5xl mx-auto px-4"
    >
      <Card className="p-2 border border-border bg-card shadow-2xl shadow-black/5 dark:shadow-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="flex flex-col gap-2">
          {/* Category Selector */}
          <Tabs defaultValue="carros" className="w-full" onValueChange={setCategory}>
            <TabsList className="bg-muted p-1 border-0 h-16 w-full rounded-[2rem]">
              <TabsTrigger 
                value="carros" 
                className="flex-1 rounded-[1.8rem] data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm font-black tracking-widest uppercase text-xs transition-all h-full"
              >
                CARROS
              </TabsTrigger>
              <TabsTrigger 
                value="motos" 
                className="flex-1 rounded-[1.8rem] data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm font-black tracking-widest uppercase text-xs transition-all h-full"
              >
                MOTOS
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="p-8 flex flex-col gap-8">
            {/* Search Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 relative group">
                <label 
                  htmlFor="location-search"
                  className="absolute -top-3 left-6 px-2 bg-card text-[10px] font-black uppercase tracking-widest text-primary z-10 transition-colors group-focus-within:text-foreground"
                >
                  Localização
                </label>
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" aria-hidden="true" />
                <Input 
                  id="location-search"
                  placeholder="BRASIL" 
                  className="pl-14 h-16 bg-muted/30 dark:bg-muted/10 border-muted focus:bg-card focus:border-primary transition-all rounded-2xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground/30"
                />
              </div>
              <div className="md:col-span-8 relative group">
                <label 
                  htmlFor="vehicle-query"
                  className="absolute -top-3 left-6 px-2 bg-card text-[10px] font-black uppercase tracking-widest text-primary z-10 transition-colors group-focus-within:text-foreground"
                >
                  O que você busca?
                </label>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                  <Search className={`w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors ${isSearching ? 'animate-spin' : ''}`} aria-hidden="true" />
                </div>
                <Input 
                  id="vehicle-query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="EX: BMW M3 2024..." 
                  className="pl-14 h-16 bg-muted/30 dark:bg-muted/10 border-muted focus:bg-card focus:border-secondary transition-all rounded-2xl font-bold tracking-tight text-foreground placeholder:text-muted-foreground/30 pr-44"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 px-2">
                  <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-primary hover:bg-primary/90 text-black font-black px-8 h-12 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-xs"
                    aria-label={isSearching ? "Buscando veículos..." : "Executar busca"}
                  >
                    {isSearching ? "Buscando..." : "Explorar"}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4" role="group" aria-label="Filtros rápidos">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-4 opacity-50" aria-hidden="true">Principais Buscas:</span>
               {["SUV", "Automático", "Teto Solar", "Diesel", "7 Lugares"].map((tag) => (
                 <button 
                   key={tag} 
                   onClick={() => { 
                     setQuery(tag); 
                     onSearch(tag); 
                     trackEvent('quick_filter_click', { tag, category });
                   }}
                   className="px-6 py-2 border border-border bg-card hover:bg-primary hover:text-black hover:border-primary text-[10px] font-black uppercase tracking-widest transition-all rounded-full shadow-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
                   aria-label={`Filtrar por ${tag}`}
                 >
                   {tag}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
