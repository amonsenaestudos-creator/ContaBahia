# Supabase — Conta Bahia

## Configuração

1. Crie um projeto no Supabase e execute [`schema.sql`](./schema.sql) no SQL Editor.
2. Configure `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` no ambiente do servidor. A chave `service_role` nunca deve ser exposta ao navegador.
3. Sem essas variáveis, o formulário usa o PostgreSQL local do projeto como fallback; o blog exibe artigos demonstrativos.
4. Opcionalmente, configure `BLOG_ADMIN_TOKEN` para habilitar as operações protegidas de gerenciamento de artigos.

## API

- `GET /api/articles` — lista artigos publicados; aceita `?category=MEI`.
- `POST /api/articles` — cria artigo; requer `Authorization: Bearer <BLOG_ADMIN_TOKEN>`.
- `PATCH /api/articles` — atualiza artigo; inclui `id` e os campos editoriais no JSON.
- `DELETE /api/articles?id=<uuid>` — exclui artigo; requer o mesmo bearer token.
- `POST /api/leads` — valida e armazena a solicitação de contato na tabela `leads`.

Corpo para `POST`/`PATCH` de artigos: `title`, `slug` (minúsculas e hífens), `excerpt`, `category`, `content`, `coverImage` (opcional) e `publishedAt` (ISO 8601; deixe vazio para manter como rascunho). O site só exibe artigos com data de publicação preenchida e já alcançada.

Os textos do blog usados sem conexão Supabase são demonstrativos. Revise as informações e substitua-os por conteúdo aprovado antes de publicar.
