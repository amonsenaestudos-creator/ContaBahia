#!/usr/bin/env node
/**
 * Servidor estático para testar a pasta `out/` do jeito que o GitHub Pages serve o site.
 *
 *   npm run build && npm run preview
 *
 * Para simular o endereço do GitHub Pages (https://usuario.github.io/ContaBahia/):
 *
 *   NEXT_PUBLIC_BASE_PATH=/ContaBahia npm run build
 *   NEXT_PUBLIC_BASE_PATH=/ContaBahia npm run preview
 *
 * (ou coloque NEXT_PUBLIC_BASE_PATH=/ContaBahia no arquivo .env.local)
 */
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const projectDir = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const root = path.join(projectDir, "out");

// Lê os mesmos arquivos .env que o `next build` (ex.: NEXT_PUBLIC_BASE_PATH em .env.local).
dotenv.config({ path: [".env.production.local", ".env.local", ".env.production", ".env"].map((file) => path.join(projectDir, file)), quiet: true });
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

if (!existsSync(path.join(root, "index.html"))) {
  console.error("A pasta out/ ainda não existe. Rode `npm run build` antes de `npm run preview`.");
  process.exit(1);
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function fileInfo(file) {
  try {
    return await stat(file);
  } catch {
    return null;
  }
}

function sendFile(request, response, status, file) {
  response.writeHead(status, { "Content-Type": contentTypes[path.extname(file).toLowerCase()] ?? "application/octet-stream" });
  if (request.method === "HEAD") return response.end();
  createReadStream(file).pipe(response);
}

function redirect(response, status, location) {
  response.writeHead(status, { Location: location });
  response.end();
}

async function notFound(request, response) {
  const page = path.join(root, "404.html");
  if ((await fileInfo(page))?.isFile()) return sendFile(request, response, 404, page);
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("404 — página não encontrada");
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    response.writeHead(400);
    return response.end("Requisição inválida");
  }

  if (basePath) {
    if (pathname === "/") return redirect(response, 302, `${basePath}/`);
    if (pathname === basePath) return redirect(response, 301, `${basePath}/${url.search}`);
    if (!pathname.startsWith(`${basePath}/`)) return notFound(request, response);
  }

  const target = path.join(root, pathname.slice(basePath.length));
  if (target !== root && !target.startsWith(root + path.sep)) return notFound(request, response);

  const info = await fileInfo(target);
  if (info?.isDirectory()) {
    // Igual ao GitHub Pages: /blog → /blog/ → blog/index.html
    if (!url.pathname.endsWith("/")) return redirect(response, 301, `${url.pathname}/${url.search}`);
    const index = path.join(target, "index.html");
    if ((await fileInfo(index))?.isFile()) return sendFile(request, response, 200, index);
  } else if (info?.isFile()) {
    return sendFile(request, response, 200, target);
  } else if ((await fileInfo(`${target}.html`))?.isFile()) {
    return sendFile(request, response, 200, `${target}.html`);
  }

  return notFound(request, response);
});

server.listen(port, host, () => {
  console.log(`Site estático disponível em http://localhost:${port}${basePath}/`);
});
