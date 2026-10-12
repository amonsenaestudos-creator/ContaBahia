/**
 * Supabase (opcional).
 *
 * O GitHub Pages não executa código de servidor, então não há onde guardar chaves secretas.
 * O site usa apenas a URL do projeto e a chave pública (anon / publishable), que podem
 * aparecer no navegador: o que cada visitante pode fazer é limitado pelas políticas RLS de
 * `supabase/schema.sql` (enviar contatos e ler artigos publicados).
 *
 * Nunca use a chave `service_role` / secret aqui.
 */
export const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
export const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Cria o cliente sob demanda. O pacote é carregado com import dinâmico para não pesar no
 * carregamento inicial da página: no navegador ele só é baixado quando o formulário é enviado.
 */
export async function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
