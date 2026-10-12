import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Marca Conta Bahia: cinco barras com alturas e bases alternadas.
 * O desenho é uma onda/sinal visual da marca original — não um gráfico crescente.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 68 66" fill="none" className={cn("size-11 shrink-0", className)}>
      {/* barra curta à esquerda */}
      <rect x="2" y="25" width="9" height="22" rx="1.5" fill="#6DCFF6" />
      {/* barra alta em azul-ciano */}
      <rect x="15" y="10" width="9" height="34" rx="1.5" fill="#40B8E8" />
      {/* barra média deslocada para baixo */}
      <rect x="28" y="24" width="9" height="30" rx="1.5" fill="#159ACA" />
      {/* barra azul profunda, mais baixa */}
      <rect x="41" y="27" width="9" height="38" rx="1.5" fill="#0D5DA6" />
      {/* barra alta em azul-marinho */}
      <rect x="54" y="1" width="10" height="49" rx="1.5" fill="#203B7B" />
    </svg>
  );
}

export function BrandWordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline leading-none", className)}>
      <span className="font-extrabold tracking-[-.04em] text-[#40B8E8]">Conta</span>
      <span className={cn("ml-[0.3em] font-extrabold tracking-[-.04em]", light ? "text-[#6DCFF6]" : "text-[#40B8E8]")}>Bahia</span>
    </span>
  );
}

export function Brand({ light = false, className, href }: { light?: boolean; className?: string; href?: string }) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BrandMark />
      <span className="leading-none">
        <BrandWordmark light={light} className="block text-[20px]" />
        <span className={cn("mt-[6px] block text-[8px] font-bold uppercase tracking-[.14em]", light ? "text-[#ff9696]" : "text-[#E30613]")}>Soluções Contábeis · Integrador de Negócios</span>
      </span>
    </span>
  );
  return href ? <Link href={href} aria-label="Conta Bahia Contabilidade, início">{content}</Link> : content;
}

export function HorizonMotif({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 500 500" fill="none" className={className}>
      {[170, 220, 270, 320, 370, 420].map((radius) => <circle key={radius} cx="470" cy="470" r={radius} stroke="currentColor" strokeWidth="1" />)}
    </svg>
  );
}
