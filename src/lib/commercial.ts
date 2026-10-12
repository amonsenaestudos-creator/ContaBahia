/**
 * Clientes em destaque.
 *
 * Preencha somente com empresas autorizadas a exibir nome e logo.
 * Coloque os logos em `public/clientes/` e informe o caminho, por exemplo:
 * { name: "Empresa Exemplo", sector: "Comércio", logo: "/clientes/exemplo.svg" }
 */
export type Client = { name: string; sector: string; logo?: string; url?: string };
export const clients: Client[] = [];

/** Setores apresentados enquanto os logos autorizados dos clientes são adicionados. */
export const clientSectors = ["Comércio", "Prestação de serviços", "Profissionais liberais", "Oficinas", "Alimentação", "Transporte"];

/**
 * Planos de atendimento contábil.
 * A Conta Bahia trabalha com proposta personalizada; valores devem ser definidos pelo contador.
 */
export type Plan = { name: string; target: string; price: string; period: string; description: string; features: string[]; highlight?: boolean; cta: string };
export const plans: Plan[] = [
  {
    name: "MEI",
    target: "Para quem está formalizando",
    price: "Sob consulta",
    period: "proposta personalizada",
    description: "Orientação para manter as obrigações do microempreendedor em dia e compreender cada etapa da rotina.",
    features: ["Orientação sobre obrigações do MEI", "Apoio com documentos e declarações", "Canal direto com o contador"],
    cta: "Pedir proposta",
  },
  {
    name: "Empresa em operação",
    target: "Comércio e prestadores de serviço",
    price: "Sob consulta",
    period: "proposta personalizada",
    description: "Atendimento contábil, fiscal e trabalhista ajustado ao tamanho e à movimentação da sua empresa.",
    features: ["Escrituração contábil e fiscal", "Apuração de tributos e obrigações", "Folha de pagamento e eSocial", "Acompanhamento com o contador"],
    highlight: true,
    cta: "Pedir proposta",
  },
  {
    name: "Soluções especiais",
    target: "Projetos e demandas específicas",
    price: "Sob consulta",
    period: "escopo definido com você",
    description: "Para legalização, regularização, prestação de contas eleitoral e demandas que pedem análise própria.",
    features: ["Avaliação do cenário", "Escopo de atendimento definido", "Acompanhamento técnico", "Proposta sob medida"],
    cta: "Conversar sobre a demanda",
  },
];

/** Produtos efetivamente listados na loja do site anterior da Conta Bahia. */
export type System = { name: string; tag: string; description: string; features: string[]; price: string; type: "nfc" | "nfe" | "workshop" };
export const systems: System[] = [
  {
    name: "Sistema de Gestão Comercial + Emissor NFC-e",
    tag: "Gestão comercial",
    description: "Solução comercial com emissão de NFC-e para apoiar a rotina de vendas e documentos fiscais.",
    features: ["Gestão comercial", "Emissor de NFC-e", "Produto listado na loja Conta Bahia"],
    price: "R$ 450,00",
    type: "nfc",
  },
  {
    name: "Sistema de Gestão Comercial + NF-e + NFC-e",
    tag: "Mais vendido no site anterior",
    description: "Sistema de gestão comercial com emissão de NF-e e NFC-e para operações que precisam dos dois documentos.",
    features: ["Gestão comercial", "Emissor de NF-e", "Emissor de NFC-e", "Produto listado na loja Conta Bahia"],
    price: "R$ 1.020,00",
    type: "nfe",
  },
  {
    name: "Sistema de Gestão para Oficinas e Comércio",
    tag: "Oficinas e comércio",
    description: "Sistema de gestão voltado a oficinas e estabelecimentos comerciais, disponível no catálogo anterior.",
    features: ["Gestão para oficinas/comércio", "Apoio à rotina comercial", "Produto listado na loja Conta Bahia"],
    price: "R$ 280,00",
    type: "workshop",
  },
];
