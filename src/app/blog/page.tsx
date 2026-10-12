import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = { title: "Blog de contabilidade e gestão", description: "Artigos da Conta Bahia sobre MEI, impostos, gestão, departamento pessoal e prestação de contas." };

export default async function BlogPage() {
  const articles = await getArticles(100);
  return <><Header home={false} /><main id="page-content" className="min-h-[70vh] bg-white"><div className="container-shell pt-8"><Link href="/#inicio" className="inline-flex items-center gap-2 text-xs font-bold text-[#617588] transition hover:text-[#2367c8]"><ArrowLeft size={14} /> Voltar ao início</Link></div><BlogSection articles={articles} allArticles /></main><Footer home={false} /></>;
}
