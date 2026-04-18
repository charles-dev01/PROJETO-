import { Facebook, Instagram, Twitter, Youtube, Zap, ArrowRight } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-32 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Brand */}
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/20 flex items-center justify-center rounded-2xl shadow-xl shadow-primary/5 transition-transform hover:rotate-6">
                <span className="text-primary font-black text-3xl italic">C</span>
              </div>
              <span className="text-foreground font-black text-4xl tracking-tighter uppercase">
                CAR<span className="text-primary italic">BUY</span>
              </span>
            </div>
            <p className="text-sm font-bold uppercase text-muted-foreground leading-relaxed tracking-widest max-w-xs opacity-70">
              Transformando a forma como você encontra sua próxima paixão sobre rodas.
            </p>
            <div className="flex items-center gap-4" role="group" aria-label="Redes Sociais">
              <ButtonIcon icon={<Facebook className="w-5 h-5" />} label="Facebook" />
              <ButtonIcon icon={<Instagram className="w-5 h-5" />} label="Instagram" />
              <ButtonIcon icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              <ButtonIcon icon={<Youtube className="w-5 h-5" />} label="Youtube" />
            </div>
          </div>

          {/* Links */}
          <FooterColumn 
            title="SQUAD" 
            links={["Carros Usados", "Carros Novos", "Motos Usadas", "Motos Novas", "Leilão"]} 
          />
          <FooterColumn 
            title="NEGOCIAR" 
            links={["Vender meu Carro", "Vender minha Moto", "Gerenciar Anúncio", "Tabela FIPE"]} 
          />
          <FooterColumn 
            title="INFO" 
            links={["Sobre Nós", "Trabalhe Conosco", "Políticas", "Termos", "Blog CarBuy"]} 
          />
        </div>

        <div className="pt-16 border-t border-border flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
              © 2026 CarBuy S.A. GLOBAL REACH.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-4 py-2 rounded-full w-fit" role="status">
              <Zap className="w-4 h-4 fill-current" aria-hidden="true" />
              INTEGRATED BY AI STUDIO
            </div>
          </div>
          <div className="flex items-center gap-8" role="img" aria-label="Métodos de pagamento aceitos: Visa e Mastercard">
            <div className="px-6 py-3 bg-muted/50 rounded-2xl border border-border grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
            </div>
            <div className="px-6 py-3 bg-muted/50 rounded-2xl border border-border grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: string[] }) {
  return (
    <nav className="flex flex-col gap-10" aria-label={title}>
      <h4 className="text-xs font-black text-foreground uppercase tracking-[0.3em] pb-4 border-b border-primary/30 w-fit">{title}</h4>
      <ul className="flex flex-col gap-5">
        {links.map((link) => (
          <li key={link}>
            <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all flex items-center group">
              <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-3" aria-hidden="true" />
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ButtonIcon({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button 
      className="w-14 h-14 bg-muted hover:bg-primary text-foreground hover:text-black transition-all rounded-[1.5rem] flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
