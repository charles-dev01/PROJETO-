import * as React from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, Calendar, Globe, Power, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../lib/firebase';
import { handleFirestoreError } from '../lib/errorUtils';

export default function JudgingSettings() {
  const [settings, setSettings] = React.useState({
    isActive: false,
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'judging_settings', 'global'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSettings({
          isActive: data.isActive || false,
          title: data.title || '',
          description: data.description || '',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
        });
      }
    });
    return unsubscribe;
  }, []);

  const toggleStatus = () => {
    const newStatus = !settings.isActive;
    setSettings(s => ({ ...s, isActive: newStatus }));
    trackEvent('toggle_system_status', { active: newStatus });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'judging_settings', 'global'), {
        ...settings,
        updatedAt: serverTimestamp(),
      });
      trackEvent('update_judging_settings', {
        isActive: settings.isActive,
        title: settings.title
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      handleFirestoreError(error, 'update', 'judging_settings/global');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-black uppercase tracking-tight">Configurações do Sistema</h1>
        <p className="text-muted-foreground font-medium">Controle a disponibilidade global e os detalhes da competição.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Status Control */}
        <Card className={`border-2 transition-all rounded-[2.5rem] p-8 ${settings.isActive ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
          <CardContent className="p-0 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${settings.isActive ? 'bg-primary text-black' : 'bg-muted text-muted-foreground'}`}>
                <Power className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase">Status do Sistema</h3>
                <p className="text-sm font-medium opacity-60">
                  {settings.isActive ? 'O sistema está ONLINE e aceitando julgamentos.' : 'O sistema está OFFLINE para todos os usuários.'}
                </p>
              </div>
            </div>
            <button 
              onClick={toggleStatus}
              className={`w-20 h-10 rounded-full p-1 transition-colors relative ${settings.isActive ? 'bg-primary' : 'bg-muted'}`}
            >
              <div className={`w-8 h-8 bg-white rounded-full shadow-lg transition-transform ${settings.isActive ? 'translate-x-10' : 'translate-x-0'}`} />
            </button>
          </CardContent>
        </Card>

        {/* Info Form */}
        <Card className="border-none shadow-xl shadow-black/5 dark:shadow-white/5 rounded-[2.5rem] p-10 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Informações Gerais</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Título do Evento</label>
                <Input 
                  value={settings.title}
                  onChange={(e) => setSettings(s => ({ ...s, title: e.target.value }))}
                  placeholder="Ex: Julgamento Classic Car Show 2026" 
                  className="h-14 rounded-2xl bg-muted border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Descrição</label>
                <Textarea 
                  value={settings.description}
                  onChange={(e) => setSettings(s => ({ ...s, description: e.target.value }))}
                  placeholder="Descreva as regras ou detalhes do evento..." 
                  className="min-h-[120px] rounded-2xl bg-muted border-none font-medium p-4 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Cronograma</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Início</label>
                  <Input 
                    type="datetime-local"
                    value={settings.startDate}
                    onChange={(e) => setSettings(s => ({ ...s, startDate: e.target.value }))}
                    className="h-14 rounded-2xl bg-muted border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Término</label>
                  <Input 
                    type="datetime-local"
                    value={settings.endDate}
                    onChange={(e) => setSettings(s => ({ ...s, endDate: e.target.value }))}
                    className="h-14 rounded-2xl bg-muted border-none font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
            <div className={`flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest transition-opacity ${showToast ? 'opacity-100' : 'opacity-0'}`}>
              <CheckCircle2 className="w-4 h-4" />
              Configurações Salvas!
            </div>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="h-16 px-12 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all min-w-[200px]"
            >
              {isSaving ? 'Salvando...' : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
