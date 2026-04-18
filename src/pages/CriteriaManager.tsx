import * as React from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Check, X, AlertTriangle, Layers } from 'lucide-react';
import { trackEvent } from '../lib/firebase';
import { handleFirestoreError } from '../lib/errorUtils';

interface Criterion {
  id: string;
  label: string;
  weight: number;
  maxScore: number;
}

export default function CriteriaManager() {
  const [criteria, setCriteria] = React.useState<Criterion[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isAdding, setIsAdding] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState('');
  const [newWeight, setNewWeight] = React.useState(1);
  const [newMaxScore, setNewMaxScore] = React.useState(10);

  React.useEffect(() => {
    const q = query(collection(db, 'criteria'), orderBy('label'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Criterion));
      setCriteria(docs);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleAdd = async () => {
    if (!newLabel) return;
    try {
      await addDoc(collection(db, 'criteria'), {
        label: newLabel,
        weight: Number(newWeight),
        maxScore: Number(newMaxScore)
      });
      trackEvent('add_criterion', {
        label: newLabel,
        weight: newWeight,
        maxScore: newMaxScore
      });
      setNewLabel('');
      setIsAdding(false);
    } catch (error) {
      handleFirestoreError(error, 'create', 'criteria');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'criteria', id));
      trackEvent('delete_criterion', { id });
    } catch (error) {
      handleFirestoreError(error, 'delete', `criteria/${id}`);
    }
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Critérios de Julgamento</h1>
          <p className="text-muted-foreground font-medium">Defina os parâmetros técnicos que os juízes devem avaliar.</p>
        </div>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-primary text-black font-black uppercase tracking-widest rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Critério
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {criteria.map((c) => (
            <Card key={c.id} className="border-none shadow-xl shadow-black/5 dark:shadow-white/5 rounded-3xl group overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center font-black text-xl">
                    {c.label.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-lg group-hover:text-primary transition-colors">{c.label}</h3>
                    <div className="flex gap-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">
                      <span>Peso: <span className="text-foreground">{c.weight}</span></span>
                      <span>Nota Máx: <span className="text-foreground">{c.maxScore}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={() => handleDelete(c.id)}
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl hover:bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {criteria.length === 0 && !loading && (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-[2.5rem]">
              <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground font-medium">Nenhum critério definido ainda.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Summary Card */}
          <Card className="border-none shadow-2xl shadow-primary/10 rounded-[2.5rem] bg-zinc-900 dark:bg-card p-8 text-white dark:text-foreground">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Status Geral</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-60">Total de Critérios</span>
                <span className="text-3xl font-black tracking-tight">{criteria.length}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-60">Soma dos Pesos</span>
                <span className="text-3xl font-black tracking-tight">{totalWeight}</span>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                {totalWeight !== 1 && totalWeight > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-[10px] font-bold leading-relaxed text-amber-500 uppercase">
                      Recomendação: A soma dos pesos deve ser exatamente 1.0 para uma média ponderada equilibrada.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add Form Overlay/Drawer mock */}
          {isAdding && (
            <Card className="border-none shadow-2xl shadow-primary/20 rounded-[2.5rem] p-8 border-t-4 border-primary animate-in slide-in-from-right-8 duration-300">
              <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-black uppercase">Novo Critério</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Nome do Critério</label>
                  <Input 
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Ex: Performance, Design..." 
                    className="h-14 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-primary font-bold placeholder:font-medium" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Peso (0-1)</label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={newWeight}
                      onChange={(e) => setNewWeight(Number(e.target.value))}
                      className="h-14 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-primary font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Nota Máxima</label>
                    <Input 
                      type="number"
                      value={newMaxScore}
                      onChange={(e) => setNewMaxScore(Number(e.target.value))}
                      className="h-14 rounded-2xl bg-muted border-none focus:ring-2 focus:ring-primary font-bold" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAdd}
                  disabled={!newLabel}
                  className="w-full h-16 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Criar Critério
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
