import { Heart, MapPin, Calendar, Gauge, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/src/lib/firebase";

interface VehicleProps {
  id: string;
  make: string;
  model: string;
  version: string;
  price: number;
  year: string;
  km: number;
  location: string;
  image: string;
  isNew?: boolean;
}

export default function VehicleCard({ vehicle }: { vehicle: VehicleProps }) {
  return (
    <Card 
      as="article"
      onClick={() => trackEvent('vehicle_card_click', { make: vehicle.make, model: vehicle.model, id: vehicle.id })}
      className="group overflow-hidden border border-border bg-card cursor-pointer transition-all duration-500 rounded-[2.5rem] hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-2"
    >
      <div className="relative aspect-[16/11] overflow-hidden m-2 rounded-[2rem]">
        <img 
          src={vehicle.image} 
          alt={`Foto do veículo ${vehicle.make} ${vehicle.model} ${vehicle.version}, ano ${vehicle.year}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            trackEvent('vehicle_favorite_click', { make: vehicle.make, model: vehicle.model, id: vehicle.id });
          }}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center rounded-2xl hover:bg-white hover:text-black transition-all"
          aria-label={`Adicionar ${vehicle.make} ${vehicle.model} aos favoritos`}
        >
          <Heart className="w-5 h-5 transition-transform active:scale-125" aria-hidden="true" />
        </button>

        {vehicle.isNew && (
          <div 
            className="absolute bottom-4 left-4 bg-primary text-black font-black text-[10px] tracking-widest px-4 py-2 uppercase rounded-full shadow-lg shadow-white/10"
            role="status"
          >
            Destaque
          </div>
        )}
      </div>

      <CardContent className="p-8 pt-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight leading-none mb-1">
                {vehicle.make} <span className="text-muted-foreground font-black">{vehicle.model}</span>
              </h3>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                {vehicle.version}
              </p>
            </div>
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-black transition-colors" aria-hidden="true">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
          
          <div className="mt-4 flex items-baseline gap-1 text-foreground" aria-label={`Preço: ${vehicle.price.toLocaleString('pt-BR')} reais`}>
            <span className="text-sm font-bold opacity-50" aria-hidden="true">R$</span>
            <span className="text-3xl font-black tracking-tight leading-none">
              {vehicle.price.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8 pt-0 flex flex-col gap-6">
        <div className="flex items-center gap-6 w-full py-4 border-t border-border" role="list" aria-label="Especificações do veículo">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground" role="listitem">
            <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="sr-only">Ano: </span>{vehicle.year}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground border-l border-border pl-6" role="listitem">
            <Gauge className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="sr-only">Quilometragem: </span>{vehicle.km.toLocaleString('pt-BR')} KM
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">
          <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="sr-only">Localização: </span>{vehicle.location}
        </div>
      </CardFooter>
    </Card>
  );
}
