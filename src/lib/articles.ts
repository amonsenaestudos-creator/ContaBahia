import "server-only";

import { getSupabaseClient } from "@/lib/supabase";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  coverImage: string | null;
  publishedAt: string;
};

const sampleArticles: Article[] = [
  {
    id: "sample-pronampe",
    title: "Quem tem direito ao PRONAMPE e como solicitar?",
    slug: "quem-tem-direito-ao-pronampe",
    excerpt:
      "Entenda como funciona o programa, quais empresas podem participar e o que preparar antes de conversar com o banco.",
    category: "Gestão financeira",
    content:
      "O PRONAMPE foi criado para apoiar micro e pequenas empresas com crédito destinado ao fortalecimento das operações. As regras, os limites e a disponibilidade podem mudar a cada edição do programa.\n\nEm geral, podem ser elegíveis empresas enquadradas como MEI, microempresa ou empresa de pequeno porte, desde que atendam aos critérios definidos na legislação e pela instituição financeira. A análise de crédito e a liberação são feitas pelo banco participante.\n\nAntes de solicitar, organize o faturamento informado à Receita Federal, os documentos cadastrais e o fluxo de caixa do negócio. Uma contabilidade atualizada ajuda a entender quanto crédito faz sentido para a sua empresa assumir.\n\nConverse com seu contador e com a instituição financeira para confirmar as condições válidas no momento da solicitação. Cada caso pode ter exigências próprias.",
    coverImage: null,
    publishedAt: "2025-05-20T12:00:00.000Z",
  },
  {
    id: "sample-admissao",
    title: "Quais documentos são necessários para admitir um funcionário?",
    slug: "documentos-necessarios-para-admissao",
    excerpt:
      "Um checklist prático para organizar a admissão, cumprir prazos e começar a relação de trabalho com segurança.",
    category: "Departamento pessoal",
    content:
      "Uma admissão tranquila começa antes do primeiro dia de trabalho. O empregador deve solicitar os dados pessoais e cadastrais necessários para o registro e para os eventos do eSocial.\n\nTenha em mãos documentos de identificação, CPF, comprovante de endereço, dados bancários para pagamento e informações sobre dependentes, quando aplicável. Também é importante registrar cargo, salário, jornada, data de início e benefícios acordados.\n\nO exame admissional deve ocorrer antes do início das atividades, conforme as regras de saúde e segurança ocupacional aplicáveis. A empresa também precisa respeitar o prazo de envio das informações ao eSocial.\n\nA lista pode variar de acordo com a função e a convenção coletiva. Alinhe o checklist com o escritório contábil para evitar retrabalho e manter tudo em dia.",
    coverImage: null,
    publishedAt: "2025-05-12T12:00:00.000Z",
  },
  {
    id: "sample-mei-nfe",
    title: "Como as regras de emissão de NFS-e impactam o MEI?",
    slug: "mei-regras-emissao-nota-fiscal",
    excerpt:
      "Saiba quando emitir nota fiscal, quais mudanças acompanhar e como manter a rotina do MEI organizada.",
    category: "MEI",
    content:
      "A nota fiscal é obrigatória quando o MEI presta serviços ou vende produtos para outra empresa, salvo situações específicas previstas nas regras aplicáveis. Para consumidores pessoas físicas, a emissão geralmente é dispensada, exceto quando solicitada.\n\nOs prestadores de serviços MEI utilizam o padrão nacional de NFS-e. O acesso é feito pelo portal ou aplicativo oficial, com cadastro e dados da atividade atualizados. Regras e procedimentos podem ser alterados, por isso vale consultar os canais oficiais.\n\nMantenha seus comprovantes organizados e acompanhe o faturamento para respeitar o limite anual do MEI. Emitir notas corretamente também facilita a comprovação de renda e a gestão do negócio.\n\nEm caso de dúvida sobre uma operação ou sobre o seu enquadramento, procure orientação contábil antes de emitir ou cancelar documentos fiscais.",
    coverImage: null,
    publishedAt: "2025-05-05T12:00:00.000Z",
  },
  {
    id: "sample-ir",
    title: "Imposto de Renda: o que organizar antes da declaração?",
    slug: "imposto-de-renda-documentos-para-declarar",
    excerpt: "Um guia para reunir informes e comprovantes com antecedência e tornar a declaração mais tranquila.",
    category: "Imposto de Renda",
    content:
      "Organizar os documentos ao longo do ano reduz o risco de esquecer informações importantes na declaração do Imposto de Renda. Comece reunindo informes de rendimentos, comprovantes de despesas dedutíveis e documentos sobre bens e direitos.\n\nTambém podem ser necessários dados de dependentes, recibos médicos, informações de previdência e comprovantes de pagamentos ou doações. A documentação adequada depende da situação de cada contribuinte.\n\nCompare as informações pré-preenchidas com seus próprios documentos antes de transmitir a declaração. A responsabilidade pela veracidade e completude dos dados é do contribuinte.\n\nOs critérios de obrigatoriedade e prazos são definidos pela Receita Federal a cada exercício. Consulte as regras oficiais do ano correspondente e procure orientação se houver dúvidas.",
    coverImage: null,
    publishedAt: "2025-04-27T12:00:00.000Z",
  },
  {
    id: "sample-eleitoral",
    title: "Prestação de contas eleitoral: como organizar os documentos?",
    slug: "organizacao-documentos-prestacao-contas-eleitoral",
    excerpt: "Boas práticas para registrar receitas e despesas e manter os comprovantes da campanha em ordem.",
    category: "Prestação de Contas",
    content:
      "A organização documental é fundamental durante todo o período de campanha. Registre receitas e despesas à medida que ocorrerem e guarde os comprovantes correspondentes em um local seguro e de fácil consulta.\n\nMantenha contratos, notas fiscais, recibos, extratos bancários e documentos de arrecadação associados a cada movimentação. Um fluxo de conferência regular ajuda a identificar pendências com antecedência.\n\nAs regras eleitorais, os sistemas e os prazos podem variar conforme a eleição e as orientações da Justiça Eleitoral. Consulte sempre as resoluções vigentes e os canais oficiais do Tribunal Superior Eleitoral.\n\nA equipe contábil pode apoiar a organização e a análise técnica dos registros, sem substituir a verificação das regras específicas de cada candidatura ou partido.",
    coverImage: null,
    publishedAt: "2025-04-18T12:00:00.000Z",
  },
];

function toArticle(row: Record<string, unknown>): Article {
  return {
    id: String(row.id ?? row.slug ?? "article"),
    title: String(row.title ?? "Artigo Conta Bahia"),
    slug: String(row.slug ?? "artigo"),
    excerpt: String(row.excerpt ?? ""),
    category: String(row.category ?? "Contabilidade"),
    content: String(row.content ?? ""),
    coverImage: typeof row.cover_image === "string" ? row.cover_image : null,
    publishedAt: String(row.published_at ?? row.created_at ?? new Date().toISOString()),
  };
}

export async function getArticles(limit = 6): Promise<Article[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return sampleArticles.slice(0, limit);

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("id,title,slug,excerpt,category,content,cover_image,published_at,created_at")
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data?.length) return sampleArticles.slice(0, limit);
    return (data as unknown as Record<string, unknown>[]).map(toArticle);
  } catch {
    return sampleArticles.slice(0, limit);
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id,title,slug,excerpt,category,content,cover_image,published_at,created_at")
        .eq("slug", slug)
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .maybeSingle();

      if (!error && data) return toArticle(data as unknown as Record<string, unknown>);
    } catch {
      // Os artigos de exemplo continuam disponíveis se o Supabase estiver indisponível.
    }
  }

  return sampleArticles.find((article) => article.slug === slug) ?? null;
}
