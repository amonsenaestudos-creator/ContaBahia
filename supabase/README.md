# Supabase — Conta Bahia (opcional)

O site é estático (GitHub Pages) e conversa com o Supabase direto do navegador, usando apenas a URL do projeto e a **chave pública**. As políticas RLS de [`schema.sql`](./schema.sql) permitem somente:

- **inserir** solicitações válidas na tabela `leads` (formulário de contato). Visitantes não conseguem ler essa tabela;
- **ler** artigos publicados da tabela `articles` (com `published_at` preenchido e já alcançado).

Sem o Supabase, o formulário abre o aplicativo de e-mail do visitante com a mensagem pronta e o blog exibe os artigos demonstrativos.

## Configuração

1. Crie um projeto no Supabase e execute [`schema.sql`](./schema.sql) no **SQL Editor**.
2. Em **Project Settings → API Keys**, copie a URL do projeto e a chave pública (`anon` ou `publishable`).
3. No GitHub, em **Settings → Secrets and variables → Actions → Variables**, crie:
   - `NEXT_PUBLIC_SUPABASE_URL` = URL do projeto (`https://xxxx.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = chave pública
4. Rode o workflow de novo: **Actions → Deploy no GitHub Pages → Run workflow**.

> Nunca use a chave `service_role` / secret no site: tudo o que começa com `NEXT_PUBLIC_` fica visível no navegador.

## Contatos recebidos

Consulte a tabela `leads` no **Table Editor** do Supabase.

## Artigos do blog

Cadastre e edite os artigos direto no **Table Editor**, tabela `articles`:

- `title`: título do artigo;
- `slug`: endereço do artigo, só com minúsculas, números e hífens (ex.: `como-abrir-um-mei`);
- `excerpt`: resumo; `category`: categoria (vira um filtro no blog);
- `content`: texto, com parágrafos separados por uma linha em branco;
- `cover_image` (opcional): URL de uma imagem de capa;
- `published_at`: data de publicação. Deixe vazio para manter como rascunho.

Como o site é gerado no build, **rode o workflow de novo depois de publicar ou editar artigos**. Artigos com `published_at` no futuro entram no primeiro deploy feito depois dessa data.

Os textos usados sem conexão com o Supabase são demonstrativos. Revise as informações e substitua-os por conteúdo aprovado antes de divulgar o site.
