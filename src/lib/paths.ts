/**
 * Prefixo do site quando publicado em um subcaminho, como
 * https://usuario.github.io/ContaBahia/ → "/ContaBahia".
 *
 * `next/link` já aplica esse prefixo automaticamente, mas caminhos de arquivos da pasta
 * `public/` usados em `next/image`, `<img>` ou CSS precisam passar por `withBasePath`.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");

export function withBasePath(path: string) {
  // URLs externas (https://...), protocolos (data:, blob:) e caminhos relativos ficam como estão.
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
