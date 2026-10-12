import { timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { getArticles } from "@/lib/articles";

export const runtime = "nodejs";

function getAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

function hasAdminAccess(request: Request) {
  const token = process.env.BLOG_ADMIN_TOKEN;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token || !supplied) return false;
  const expectedBytes = Buffer.from(token);
  const suppliedBytes = Buffer.from(supplied);
  return expectedBytes.length === suppliedBytes.length && timingSafeEqual(expectedBytes, suppliedBytes);
}

function articleInput(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  const excerpt = typeof input.excerpt === "string" ? input.excerpt.trim() : "";
  const category = typeof input.category === "string" ? input.category.trim() : "";
  const content = typeof input.content === "string" ? input.content.trim() : "";
  const coverImage = typeof input.coverImage === "string" ? input.coverImage.trim() : null;
  const publishedAt = typeof input.publishedAt === "string" && input.publishedAt ? input.publishedAt : null;

  if (!title || title.length > 220 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 240 || !excerpt || !category || category.length > 80 || !content) return null;
  return { title, slug, excerpt, category, content, cover_image: coverImage, published_at: publishedAt };
}

export async function GET(request: Request) {
  const articles = await getArticles(100);
  const category = new URL(request.url).searchParams.get("category");
  return Response.json(category ? articles.filter((article) => article.category.toLowerCase() === category.toLowerCase()) : articles, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

export async function POST(request: Request) {
  return writeArticle(request, "insert");
}

export async function PATCH(request: Request) {
  return writeArticle(request, "update");
}

export async function DELETE(request: Request) {
  if (!hasAdminAccess(request)) return Response.json({ message: "Acesso não autorizado." }, { status: 401 });
  const supabase = getAdminClient();
  if (!supabase) return Response.json({ message: "Configure a chave de serviço do Supabase para gerenciar artigos." }, { status: 503 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id || id.length > 80) return Response.json({ message: "Informe um identificador de artigo válido." }, { status: 400 });
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return Response.json({ message: "Não foi possível excluir o artigo." }, { status: 502 });
  return Response.json({ ok: true });
}

async function writeArticle(request: Request, operation: "insert" | "update") {
  if (!hasAdminAccess(request)) return Response.json({ message: "Acesso não autorizado." }, { status: 401 });
  const supabase = getAdminClient();
  if (!supabase) return Response.json({ message: "Configure a chave de serviço do Supabase para gerenciar artigos." }, { status: 503 });

  try {
    const body: unknown = await request.json();
    const fields = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const content = articleInput(body);
    if (!content) return Response.json({ message: "Confira título, slug, categoria, resumo e conteúdo do artigo." }, { status: 400 });

    const query = operation === "insert"
      ? supabase.from("articles").insert(content).select("id,title,slug").single()
      : typeof fields.id === "string"
        ? supabase.from("articles").update(content).eq("id", fields.id).select("id,title,slug").single()
        : null;

    if (!query) return Response.json({ message: "Informe o identificador do artigo." }, { status: 400 });
    const { data, error } = await query;
    if (error) {
      console.error("Supabase article write failed:", error.message);
      return Response.json({ message: "Não foi possível salvar o artigo. Confira o slug e tente novamente." }, { status: 502 });
    }
    return Response.json(data, { status: operation === "insert" ? 201 : 200 });
  } catch {
    return Response.json({ message: "Não foi possível interpretar o artigo enviado." }, { status: 400 });
  }
}
