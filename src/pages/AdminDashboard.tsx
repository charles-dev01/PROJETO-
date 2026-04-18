import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gavel, Users, Trophy, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Submissões', value: '128', icon: Gavel, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Juízes Ativos', value: '12', icon: Users, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Avaliados', value: '84', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Rankings', value: '5', icon: Trophy, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
          Olá, <span className="text-primary italic">{(user?.displayName || 'Admin').split(' ')[0]}</span>!
        </h1>
        <p className="text-lg text-muted-foreground font-medium">Benvindo ao centro de comando do sistema de julgamento CarBuy.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-xl shadow-black/5 dark:shadow-white/5 rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary/20`}>
                  <stat.icon className={`w-7 h-7 ${stat.color} transition-colors group-hover:text-primary`} />
                </div>
                <span className="text-4xl font-black tracking-tight">{stat.value}</span>
              </div>
              <div>
                <CardTitle className="text-xs uppercase tracking-[0.2em] font-black text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </CardTitle>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-black/5 dark:shadow-white/5 rounded-[2.5rem] p-8">
          <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Atividade Recente</CardTitle>
              <CardDescription className="font-medium">Últimos julgamentos e submissões.</CardDescription>
            </div>
            <div className="px-4 py-2 bg-muted rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Tempo Real
            </div>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white dark:bg-zinc-900 border border-border rounded-xl overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/car${i}/100/100`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black uppercase text-sm tracking-tight group-hover:text-primary transition-colors">Porsche 911 GT3 RS</h4>
                  <p className="text-xs text-muted-foreground font-medium">Avaliado por <span className="font-bold text-foreground">Carlos Judge</span></p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-primary">9.8</span>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">2 min atrás</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-none shadow-xl shadow-black/5 dark:shadow-white/5 rounded-[2.5rem] bg-zinc-900 dark:bg-primary p-8 text-white dark:text-black">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-2xl font-black uppercase tracking-tight">Status do Sistema</CardTitle>
            <CardDescription className={user ? 'text-zinc-400 dark:text-black/60' : 'text-zinc-500'}>Saúde global dos módulos.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <span>Auth Google</span>
                <span className="flex items-center gap-2 text-emerald-400 dark:text-black">
                  <div className="w-2 h-2 bg-emerald-400 dark:bg-black rounded-full animate-pulse" />
                  Operacional
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <span>Firestore</span>
                <span className="flex items-center gap-2 text-emerald-400 dark:text-black">
                  <div className="w-2 h-2 bg-emerald-400 dark:bg-black rounded-full animate-pulse" />
                  Operacional
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <span>Inscrições</span>
                <span className="flex items-center gap-2 text-amber-400 dark:text-black">
                  <AlertCircle className="w-3 h-3" />
                  Pausado
                </span>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800 dark:border-black/10">
              <p className="text-xs font-medium leading-relaxed mb-6 opacity-80">
                O sistema de julgamento está configurado para encerrar em <span className="font-black uppercase tracking-widest underline underline-offset-4">4 dias</span>.
              </p>
              <button className="w-full h-14 bg-primary dark:bg-black text-black dark:text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-105 transition-transform">
                Ver Relatório
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
