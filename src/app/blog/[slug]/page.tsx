import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { whatsappLink } from "@/lib/site";
import { getArticleBySlug } from "@/lib/articles";

type ArticlePageProps = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return article ? { title: article.title, description: article.excerpt } : { title: "Artigo não encontrado" };
}

function formattedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const paragraphs = article.content.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <Header home={false} />
      <main id="page-content" className="bg-[#f4f7fb]">
        <div className="container-shell py-12 sm:py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#617588] transition hover:text-[#2367c8]"><ArrowLeft size={14} /> Todos os artigos</Link>
          <article className="mx-auto mt-8 max-w-[760px] rounded-[18px] border border-[#e0e7ed] bg-white p-6 sm:p-12">
            <span className="eyebrow">{article.category}</span>
            <h1 className="mt-5 text-[clamp(2rem,4.8vw,3.2rem)] font-semibold leading-[1.12] tracking-[-.05em] text-[#173a60]">{article.title}</h1>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#586e83]">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-[#e4eaf0] pb-7 text-[11px] font-semibold text-[#8699a9]"><CalendarDays size={14} /> Publicado em <time dateTime={article.publishedAt}>{formattedDate(article.publishedAt)}</time><span className="mx-1">·</span>Conta Bahia</div>
            <div className="mt-8 space-y-5 text-[14px] leading-[1.95] text-[#465e74]">{paragraphs.map((paragraph, index) => <p key={`${article.id}-${index}`}>{paragraph}</p>)}</div>
            <div className="mt-12 rounded-[14px] bg-[#edf3f8] p-6 sm:p-7"><p className="text-[17px] font-bold text-[#173a60]">Quer conversar sobre este assunto?</p><p className="mt-1.5 text-[12px] leading-relaxed text-[#5d7083]">João Márcio pode ajudar a entender o que se aplica à sua realidade.</p><a href={whatsappLink(`Olá, João Márcio! Li o artigo "${article.title}" e gostaria de conversar.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-[var(--cyan)] hover:underline">Falar com João Márcio <ArrowRight size={15} /></a></div>
          </article>
        </div>
      </main>
      <Footer home={false} />
    </>
  );
}
