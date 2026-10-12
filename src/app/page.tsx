import { About } from "@/components/About";
import { BlogSection } from "@/components/BlogSection";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { ContaBox } from "@/components/ContaBox";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JourneyGuide } from "@/components/TaxCalculator";
import { Services } from "@/components/Services";
import { Systems } from "@/components/Systems";
import { Testimonials } from "@/components/Testimonials";
import { ValueProps } from "@/components/ValueProps";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const articles = await getArticles(12);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <ValueProps />
        <Services />
        <Systems />
        <JourneyGuide />
        <ContaBox />
        <Clients />
        <About />
        <Testimonials />
        <BlogSection articles={articles} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
