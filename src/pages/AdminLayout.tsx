import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import { loginWithGoogle, logout, trackEvent } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Lock, LayoutDashboard, Settings, ListChecks, Users, LogOut, Gavel, Accessibility, Eye, Type, ZapOff, Check, Sun, Moon } from 'lucide-react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useA11y } from '../context/A11yContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const { isDark, settings, toggleDarkMode, toggleSetting } = useA11y();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    trackEvent('admin_logout', { user_email: user?.email });
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-2 border-primary/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tight">Admin Principal</CardTitle>
            <CardDescription className="text-lg">Faça login para gerenciar o sistema de julgamento.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button 
              onClick={loginWithGoogle}
              className="w-full h-16 bg-primary text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20"
            >
              Entrar com Google
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="w-full mt-4 text-muted-foreground uppercase text-xs font-bold tracking-widest"
            >
              Voltar para Loja
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-8">
          <Shield className="w-12 h-12 text-destructive" />
        </div>
        <h1 className="text-4xl font-black uppercase mb-4">Acesso Negado</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto mb-10">
          Você está logado como <strong>{user.email}</strong>, mas não possui privilégios de administrador.
        </p>
        <div className="flex gap-4">
          <Button onClick={handleLogout} variant="outline" className="rounded-2xl px-8 h-12 uppercase font-black tracking-widest">
            Sair
          </Button>
          <Button onClick={() => navigate('/')} className="rounded-2xl px-8 h-12 uppercase font-black tracking-widest bg-primary text-black">
            Ir para Loja
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Settings, label: 'Configuração', path: '/admin/settings' },
    { icon: ListChecks, label: 'Critérios', path: '/admin/criteria' },
    { icon: Gavel, label: 'Julgamento', path: '/admin/judging' },
    { icon: Users, label: 'Admins', path: '/admin/staff' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <span className="font-black uppercase tracking-tighter text-2xl">Admin <span className="text-primary">Hub</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all ${
                  isActive 
                    ? 'bg-primary text-black shadow-xl shadow-primary/20' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-muted-foreground'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-3">
              <img src={user.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'} className="w-10 h-10 rounded-full border-2 border-primary/20" alt="" />
              <div className="flex flex-col">
                <span className="text-sm font-black truncate max-w-[100px] uppercase tracking-tight">{user.displayName}</span>
                <span className="text-[10px] text-muted-foreground font-bold truncate">SUPERADMIN</span>
              </div>
            </div>
            
            <div className="flex gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-muted">
                    <Accessibility className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-4 rounded-2xl bg-card border-border shadow-2xl" side="top" align="end">
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => toggleSetting("highContrast")}
                      className={`flex items-center justify-between w-full p-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${settings.highContrast ? 'bg-primary text-black' : 'hover:bg-muted'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3" />
                        Contraste
                      </div>
                      {settings.highContrast && <Check className="w-3 h-3" />}
                    </button>
                    <button 
                      onClick={() => toggleSetting("dyslexic")}
                      className={`flex items-center justify-between w-full p-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${settings.dyslexic ? 'bg-primary text-black' : 'hover:bg-muted'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Type className="w-3 h-3" />
                        Dislexia
                      </div>
                      {settings.dyslexic && <Check className="w-3 h-3" />}
                    </button>
                    <button 
                      onClick={toggleDarkMode}
                      className="flex items-center justify-between w-full p-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-muted"
                    >
                      <div className="flex items-center gap-2">
                        {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                        {isDark ? 'Modo Claro' : 'Modo Escuro'}
                      </div>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Button 
            onClick={handleLogout} 
            variant="ghost" 
            className="w-full justify-start gap-4 text-xs font-black uppercase text-destructive tracking-widest hover:bg-destructive/5 hover:text-destructive rounded-2xl py-6"
          >
            <LogOut className="w-5 h-5" />
            Sair do Painel
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
