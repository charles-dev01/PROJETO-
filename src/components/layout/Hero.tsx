import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "../../lib/firebase";

const BANNERS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/car1/1920/1080",
    title: "VENDEMOS O SEU CARRO",
    subtitle: "Rápido. Seguro. Sem dor de cabeça. A melhor avaliação do Brasil.",
    tag: "CARBUY PRO",
    accent: "bg-primary"
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/car2/1920/1080",
    title: "OFERTAS DA SEMANA",
    subtitle: "Carros revisados com garantia total de 1 ano. Preço justo sempre.",
    tag: "SELECTION",
    accent: "bg-secondary"
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/car3/1920/1080",
    title: "CRÉDITO APROVADO",
    subtitle: "Financie em até 60x com as melhores taxas do mercado nacional.",
    tag: "FINANCIE",
    accent: "bg-accent"
  }
];

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden" aria-label="Destaques">
      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full ml-0">
          {BANNERS.map((banner) => (
            <CarouselItem 
              key={banner.id} 
              className="relative h-full pl-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${banner.id} de ${BANNERS.length}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" aria-hidden="true" />
              <img 
                src={banner.image} 
                alt={`Banner: ${banner.title}. ${banner.subtitle}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 z-20 flex items-center px-4 md:px-20">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`inline-block px-4 py-2 ${banner.accent} text-black text-[10px] font-black tracking-[0.2em] uppercase rounded-full mb-8 shadow-xl shadow-black/10`}
                  >
                    {banner.tag}
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: "spring", damping: 20 }}
                    className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tighter uppercase"
                  >
                    {banner.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/80 font-medium max-w-xl mb-12 leading-relaxed"
                  >
                    {banner.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-5"
                  >
                    <button 
                      onClick={() => trackEvent('hero_cta_click', { type: 'explore', banner: banner.title })}
                      className="px-10 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 flex items-center group" 
                      aria-label={`Explorar ofertas de ${banner.title}`}
                    >
                      Explorar
                      <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                    </button>
                    <button 
                      onClick={() => trackEvent('hero_cta_click', { type: 'sell', banner: banner.title })}
                      className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-widest rounded-3xl border border-white/20 transition-all hover:bg-white/20" 
                      aria-label="Vender meu carro"
                    >
                      Vender
                    </button>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-40 right-4 md:right-20 z-30 flex gap-4">
          <CarouselPrevious 
            className="static translate-y-0 w-16 h-16 border border-white/20 bg-black/20 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all rounded-2xl" 
            aria-label="Banner anterior"
          />
          <CarouselNext 
            className="static translate-y-0 w-16 h-16 border border-white/20 bg-black/20 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all rounded-2xl" 
            aria-label="Próximo banner"
          />
        </div>
      </Carousel>
    </section>
  );
}
