# Conta Bahia Contabilidade — site

Site institucional da Conta Bahia (Next.js 16 + Tailwind CSS 4), publicado como **site estático no GitHub Pages**.

**Endereço:** https://amonsenaestudos-creator.github.io/ContaBahia/

## Publicar no GitHub Pages

O deploy é automático, feito pelo workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. Em **Settings → Pages → Build and deployment → Source**, deixe selecionado **GitHub Actions** (só precisa ser feito uma vez).
2. Faça push (ou o merge de um pull request) na branch `main`.
3. Acompanhe na aba **Actions** o workflow **Deploy no GitHub Pages**. Quando ele terminar (1 a 2 minutos), o site estará no endereço acima.

Para publicar de novo sem mudar o código (por exemplo, depois de cadastrar artigos no Supabase ou alterar variáveis), use **Actions → Deploy no GitHub Pages → Run workflow**.

Pull requests para a `main` também rodam o workflow, mas só para conferir se o site compila. Nesse caso, nada é publicado.

### Como funciona

- `npm run build` gera o site completo na pasta `out/` (`output: "export"` em [`next.config.ts`](next.config.ts)).
- O site fica em um subcaminho (`/ContaBahia`). O workflow informa esse prefixo em `NEXT_PUBLIC_BASE_PATH`, então links, scripts e imagens funcionam no GitHub Pages. Com um domínio próprio, o prefixo fica vazio automaticamente.
- O GitHub Pages não executa código de servidor, então o site não tem rotas `/api` nem banco PostgreSQL próprio:
  - **Formulário de contato:** com o Supabase configurado, grava direto na tabela `leads` usando a chave pública (protegida pelas políticas RLS). Sem o Supabase, abre o aplicativo de e-mail do visitante com a mensagem pronta para o e-mail de contato.
  - **Blog:** os artigos são lidos durante o build. Com o Supabase, os artigos publicados lá entram no site a cada deploy. Sem ele, aparecem os artigos de exemplo de [`src/lib/articles.ts`](src/lib/articles.ts).

## Configurações opcionais

Em **Settings → Secrets and variables → Actions → aba Variables → New repository variable**:

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase (`https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave **pública** do Supabase (anon ou publishable). Nunca use a `service_role`/secret. |
| `NEXT_PUBLIC_CONTACT_PHONE` | Telefone exibido no site |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail de contato (também recebe as mensagens do formulário quando não há Supabase) |
| `NEXT_PUBLIC_OFFICE_LOCATION` | Endereço exibido no site |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp com DDI e DDD, ex.: `5571999999999`. Sem ele, os botões de conversa ligam para o telefone. |
| `NEXT_PUBLIC_WHATSAPP_DISPLAY` | Como o número de WhatsApp aparece escrito |

Sem essas variáveis, o site usa os dados padrão de [`src/lib/site.ts`](src/lib/site.ts). Depois de criar ou alterar uma variável, rode o workflow de novo (**Run workflow**). Para preparar o Supabase, veja [`supabase/README.md`](supabase/README.md).

> Tudo que começa com `NEXT_PUBLIC_` fica visível no navegador. Por isso o site só usa chaves públicas.

## Imagens

As fotos ilustrativas ficam em `public/images/` (`atendimento-contabil.jpg` e `rotina-contabil.jpg`). Para trocá-las, envie novos arquivos com **os mesmos nomes** (no GitHub: abra a pasta `public/images` → **Add file → Upload files**). O site é publicado de novo automaticamente.

Logos de clientes autorizados: coloque os arquivos em `public/clientes/` e cadastre-os em [`src/lib/commercial.ts`](src/lib/commercial.ts).

## Rodar no computador

Requer Node.js 20.9 ou mais recente (recomendado: 22).

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:3000
npm run build     # gera o site estático em out/
npm run preview   # serve a pasta out/ em http://localhost:3000
```

Para simular exatamente o endereço do GitHub Pages, coloque `NEXT_PUBLIC_BASE_PATH=/ContaBahia` no arquivo `.env.local` (ou na linha de comando) antes do build e do preview. O site abre em http://localhost:3000/ContaBahia/.

Outras variáveis locais também podem ficar em `.env.local`. Use [`.env.example`](.env.example) como modelo.

Verificações: `npm run lint` e `npm run typecheck`.
