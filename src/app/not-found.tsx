import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// Vira o 404.html do site exportado: o GitHub Pages mostra esta página para endereços inexistentes.
export const metadata: Metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <>
      <Header home={false} />
      <main id="page-content" className="min-h-[70vh] bg-[#f4f7fb] py-12 sm:py-16">
        <div className="container-shell max-w-[760px]">
          <div className="rounded-[18px] border border-[#e0e7ed] bg-white p-6 text-center sm:p-12">
            <span className="eyebrow">Erro 404</span>
            <h1 className="mt-5 text-[clamp(2rem,4.8vw,3.2rem)] font-semibold tracking-[-.05em] text-[#173a60]">Página não encontrada.</h1>
            <p className="mx-auto mt-5 max-w-[460px] text-[14px] leading-[1.85] text-[#5d7083]">O endereço pode ter mudado ou a página não existe mais. Volte ao início ou confira os conteúdos do blog.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--cyan)] px-5 text-[12px] font-bold text-white transition-colors hover:bg-[#34a8d6]"><ArrowLeft size={14} /> Voltar ao início</Link>
              <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cddff3] px-5 text-[12px] font-bold text-[var(--cyan)] hover:bg-[#edf4ff]">Ver os conteúdos <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </main>
      <Footer home={false} />
    </>
  );
}
