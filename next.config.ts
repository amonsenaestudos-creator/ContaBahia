import type { NextConfig } from "next";

/**
 * Configuração para o GitHub Pages.
 *
 * O GitHub Pages só hospeda arquivos estáticos (HTML, CSS, JS e imagens). Por isso o
 * `next build` exporta o site completo para a pasta `out/` (`output: "export"`).
 *
 * Em https://<usuario>.github.io/<repositorio>/ todas as URLs precisam do prefixo
 * `/<repositorio>`. O workflow `.github/workflows/deploy-pages.yml` informa esse prefixo
 * em NEXT_PUBLIC_BASE_PATH. Localmente (ou com domínio próprio) a variável fica vazia
 * e o site roda na raiz.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Gera /blog/index.html em vez de /blog.html: é o formato que o GitHub Pages serve melhor.
  trailingSlash: true,
  // Não existe servidor de otimização de imagens em hospedagem estática.
  images: { unoptimized: true },
};

export default nextConfig;
