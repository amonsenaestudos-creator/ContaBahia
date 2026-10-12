"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { HorizonMotif } from "@/components/Brand";
import { Reveal } from "@/components/motion/Reveal";

type ArticlePreview = { id: string; title: string; slug: string; excerpt: string; category: string; publishedAt: string; coverImage: string | null };
const covers = ["bg-[var(--navy)] text-white", "bg-[#e6effb] text-[#194a82]", "bg-[var(--cyan)] text-white"];
function readableDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Conta Bahia" : new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(date); }

export function BlogSection({ articles, allArticles = false }: { articles: ArticlePreview[]; allArticles?: boolean }) {
  const categories = useMemo(() => ["Todos", ...Array.from(new Set(articles.map((article) => article.category)))], [articles]);
  const [selected, setSelected] = useState("Todos");
  const reduce = useReducedMotion();
  const groupId = useId();
  const filtered = selected === "Todos" ? articles : articles.filter((article) => article.category === selected);
  const visible = allArticles ? filtered : filtered.slice(0, 3);
  const Heading = allArticles ? "h1" : "h2";

  return (
    <section id="blog" className="section-space bg-white">
      <div className="container-shell">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><span className="eyebrow">05 / Conteúdos & notícias</span><Heading className="display-heading mt-5 max-w-[640px]">Boas ideias também<br />fazem o negócio crescer.</Heading><p className="mt-4 max-w-[510px] text-[13px] leading-relaxed text-[#677f97]">Contabilidade, gestão e informação útil para o seu próximo passo.</p></div>
          {!allArticles && <Link href="/blog" className="group inline-flex items-center gap-2 text-[12px] font-bold text-[var(--cyan)]">Todos os artigos <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>}
        </Reveal>
        <LayoutGroup id={groupId}>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filtrar artigos por categoria">
            {categories.map((category) => <button type="button" key={category} onClick={() => setSelected(category)} aria-pressed={selected === category} className={`relative shrink-0 rounded-full px-4 py-2.5 text-[11px] font-bold transition-colors ${selected === category ? "text-white" : "bg-[#f4f7fb] text-[#6a8299] hover:text-[var(--cyan)]"}`}>{selected === category && <motion.span layoutId="active-blog-filter" className="absolute inset-0 rounded-full bg-[var(--navy)]" transition={{ type: "spring", stiffness: 350, damping: 31 }} />}<span className="relative">{category}</span></button>)}
          </div>
          <motion.div layout className="relative mt-5 grid gap-5 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((article) => {
                const index = articles.findIndex((item) => item.id === article.id);
                return (
                  <motion.article data-blog-card key={article.id} layout initial={reduce ? false : { opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: .95 }} whileHover={reduce ? {} : { y: -5 }} transition={{ layout: { type: "spring", stiffness: 240, damping: 26 }, opacity: { duration: .2 }, y: { duration: .35 }, scale: { duration: .2 } }} className="group overflow-hidden rounded-[19px] border border-[#e0e9f3] bg-white">
                    <Link href={`/blog/${article.slug}`} aria-label={`Ler ${article.title}`} className="flex h-full flex-col">
                      <div className={`relative flex h-[185px] flex-col justify-between overflow-hidden p-6 ${covers[index % covers.length]}`}>
                        {article.coverImage ? <div role="img" aria-label={article.title} className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `linear-gradient(0deg,rgba(11,36,67,.45),rgba(11,36,67,.2)),url("${article.coverImage.replaceAll('"', "%22")}")` }} /> : <HorizonMotif className="absolute -bottom-32 -right-28 size-[410px] text-current opacity-20 transition duration-700 group-hover:rotate-6" />}
                        <p className="relative text-[9px] font-semibold uppercase tracking-[.17em] opacity-70">conta bahia / ideias que orientam</p>
                        <div className="relative flex items-end justify-between gap-6"><p className="max-w-[220px] text-[23px] font-semibold leading-tight tracking-[-.045em]">{article.category}</p><ArrowUpRight size={22} strokeWidth={1.5} className="shrink-0 opacity-65" /></div>
                      </div>
                      <div className="flex flex-1 flex-col p-6"><span className="flex items-center gap-1.5 text-[9px] font-semibold text-[#7c93a9]"><CalendarDays size={12} />{readableDate(article.publishedAt)}</span><h3 className="mt-3 min-h-[48px] text-[16px] font-bold leading-[1.45] tracking-[-.03em] text-[var(--ink)] transition group-hover:text-[var(--cyan)]">{article.title}</h3><p className="mt-3 line-clamp-2 text-[12px] leading-[1.75] text-[#698197]">{article.excerpt}</p><span className="mt-auto flex items-center gap-2 pt-6 text-[11px] font-bold text-[var(--cyan)]">Continuar lendo <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <span className="sr-only" aria-live="polite">{visible.length} {visible.length === 1 ? "artigo nesta categoria" : "artigos nesta categoria"}</span>
        {visible.length === 0 && <p className="mt-5 rounded-xl border border-dashed border-[#d8e5f4] bg-[#f4f7fb] py-12 text-center text-[13px] text-[#627a92]">Ainda não há artigos nesta categoria.</p>}
      </div>
    </section>
  );
}
