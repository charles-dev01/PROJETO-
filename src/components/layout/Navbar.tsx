import * as React from "react";
import { Heart, User, Menu, Moon, Sun, Accessibility, Eye, Type, ZapOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useA11y } from "@/src/context/A11yContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isDark, settings, toggleDarkMode, toggleSetting } = useA11y();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border h-20 flex items-center px-4 md:px-8" role="banner">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group" aria-label="CarBuy Home">
            <div className="w-10 h-10 bg-primary/20 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110" aria-hidden="true">
              <span className="text-primary font-black text-2xl italic">C</span>
            </div>
            <span className="text-foreground font-black text-3xl tracking-tighter uppercase hidden sm:block">
              CAR<span className="text-primary italic">BUY</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground" aria-label="Navegação Principal">
            <Link to="/" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2">Explorar</Link>
            <Link to="/" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2">Vender</Link>
            <Link to="/" className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2">Serviços</Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Accessibility Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-10 h-10 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
                aria-label="Acessibilidade"
              >
                <Accessibility className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 rounded-3xl bg-card border-border shadow-2xl" align="end">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-primary">Acessibilidade</h3>
              <div className="flex flex-col gap-2">
                <A11yToggle 
                  active={settings.highContrast} 
                  icon={<Eye className="w-4 h-4" />} 
                  label="Alto Contraste" 
                  onClick={() => toggleSetting("highContrast")} 
                />
                <A11yToggle 
                  active={settings.dyslexic} 
                  icon={<Type className="w-4 h-4" />} 
                  label="Fonte para Dislexia" 
                  onClick={() => toggleSetting("dyslexic")} 
                />
                <A11yToggle 
                  active={settings.reduceMotion} 
                  icon={<ZapOff className="w-4 h-4" />} 
                  label="Reduzir Movimento" 
                  onClick={() => toggleSetting("reduceMotion")} 
                />
              </div>
            </PopoverContent>
          </Popover>

          <Button 
            onClick={toggleDarkMode}
            variant="ghost" 
            size="icon" 
            className="w-10 h-10 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
            aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
          >
            {isDark ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5 text-black" aria-hidden="true" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex w-10 h-10 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
            aria-label="Favoritos"
          >
            <Heart className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
          </Button>

          <div className="hidden md:flex ml-2">
            <Link to="/admin">
              <Button className="bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex gap-3 px-6 h-10 shadow-lg shadow-primary/20">
                <User className="w-5 h-5" aria-hidden="true" />
                Painel
              </Button>
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden text-foreground border border-border rounded-xl w-10 h-10" aria-label="Menu Mobile">
            <Menu className="w-6 h-6" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function A11yToggle({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between w-full p-3 rounded-2xl transition-all ${active ? 'bg-primary text-black' : 'hover:bg-muted text-foreground'}`}
      aria-pressed={active}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {active && <Check className="w-4 h-4" />}
    </button>
  );
}
