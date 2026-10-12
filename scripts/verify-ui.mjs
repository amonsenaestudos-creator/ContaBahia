import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
// Site estático: rode `npm run build && npm run preview` antes. Para testar com o prefixo do
// GitHub Pages, use PREVIEW_URL=http://localhost:3000/ContaBahia (com o build feito com o mesmo prefixo).
const baseURL = (process.env.PREVIEW_URL || "http://localhost:3000").replace(/\/+$/, "");
const homeURL = `${baseURL}/`;
const hasRemoteSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("artifacts", { recursive: true });

const scrollTo = async (selector) => {
  await page.locator(selector).evaluate((element) => element.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(650);
};
const canvasImage = () => page.locator("canvas[data-kokonut='beams-background']").evaluate((canvas) => canvas.toDataURL());

try {
  const response = await page.goto(homeURL, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  await page.waitForTimeout(1200);
  const firstFrame = await canvasImage();
  await page.waitForTimeout(600);
  assert.notEqual(await canvasImage(), firstFrame, "Beams canvas should animate");
  const firstText = await page.locator("[data-kokonut='type-writer']").textContent();
  await page.waitForTimeout(2800);
  assert.notEqual(await page.locator("[data-kokonut='type-writer']").textContent(), firstText, "Typewriter text should change");
  await page.getByRole("button", { name: "Pausar animações do destaque" }).click();
  await page.waitForTimeout(180);
  const pausedFrame = await canvasImage();
  await page.waitForTimeout(500);
  assert.equal(await canvasImage(), pausedFrame, "Beams should pause");

  const heroButton = page.locator("#inicio [data-kokonut='slide-text-button'] a");
  const hoverLabel = heroButton.getByText("Converse com João Márcio", { exact: true });
  const beforeHover = await hoverLabel.evaluate((element) => getComputedStyle(element).transform);
  await heroButton.hover();
  await page.waitForTimeout(400);
  assert.notEqual(await hoverLabel.evaluate((element) => getComputedStyle(element).transform), beforeHover, "Slide Text Button should animate on hover");
  await page.mouse.move(20, 20);
  await page.waitForTimeout(420);
  await page.screenshot({ path: "artifacts/desktop-hero.png" });

  await scrollTo("#servicos");
  await page.waitForTimeout(400);
  const details = page.getByRole("button", { name: "O que está incluído" }).first();
  await details.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await details.click();
  await page.locator("#service-detail-0").getByText("Balanços e demonstrações", { exact: true }).waitFor({ state: "visible" });
  assert.equal(await page.getByRole("button", { name: "Menos detalhes" }).getAttribute("aria-expanded"), "true");
  await page.screenshot({ path: "artifacts/desktop-services.png" });

  await scrollTo("#orientacao");
  await page.getByRole("tab", { name: "Quero trocar de contador" }).click();
  await page.getByRole("heading", { name: "Uma transição mais tranquila." }).waitFor({ state: "visible" });
  await page.getByRole("tab", { name: "Quero trocar de contador" }).press("ArrowRight");
  assert.equal(await page.getByRole("tab", { name: "Já tenho empresa" }).getAttribute("aria-selected"), "true");

  await scrollTo("#sistemas");
  await page.getByRole("tab", { name: "Loja de sistemas" }).click();
  await page.getByRole("heading", { name: "Sistema de Gestão Comercial + Emissor NFC-e" }).waitFor({ state: "visible" });
  await page.screenshot({ path: "artifacts/desktop-systems.png" });

  await scrollTo("#ferramentas");
  await page.getByRole("button", { name: "Simular sincronização" }).click();
  await page.getByText("DADOS SINCRONIZADOS", { exact: true }).waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Reiniciar demonstração" }).click();
  await page.getByText("AGUARDANDO ENVIO", { exact: true }).waitFor({ state: "visible" });

  await scrollTo("#blog");
  await page.getByRole("button", { name: "MEI", exact: true }).click();
  await page.waitForTimeout(650);
  assert.equal(await page.locator("[data-blog-card]").count(), 1);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.waitForTimeout(450);
  assert.equal(await page.locator("[data-blog-card]").count(), 3);

  await scrollTo("#contato");
  await page.getByRole("button", { name: "Ver região no mapa" }).click();
  await page.locator("#contact-map iframe").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Fechar mapa" }).click();
  const form = page.getByRole("form", { name: "Formulário de contato" });
  await form.locator("[name=name]").fill("Verificação automatizada da interface");
  await form.locator("[name=email]").fill("interface@example.invalid");
  await form.locator("[name=phone]").fill("telefone");
  await form.locator("[name=companyType]").selectOption("Já tenho empresa");
  await form.locator("[name=message]").fill("Teste funcional da validação do formulário. Não entrar em contato.");
  await form.getByRole("button", { name: "Enviar solicitação" }).click();
  await form.getByRole("alert").getByText("Informe um telefone ou WhatsApp válido.").waitFor({ state: "visible" });

  if (!hasRemoteSupabase) {
    // Sem Supabase, o formulário abre o e-mail do visitante com a mensagem pronta (nada é gravado).
    await form.locator("[name=phone]").fill("71900000000");
    await form.getByRole("button", { name: "Enviar solicitação" }).click();
    await page.getByRole("heading", { name: "Falta só enviar o e-mail." }).waitFor({ state: "visible" });
    const mailto = await page.locator("[data-lead-mailto]").getAttribute("href");
    assert.ok(mailto?.startsWith("mailto:"), "Fallback should prepare a mailto: link");
    assert.ok(mailto.includes(encodeURIComponent("interface@example.invalid")), "mailto: body should include the visitor e-mail");
    await page.getByRole("button", { name: "Voltar ao formulário" }).click();
    await page.getByRole("form", { name: "Formulário de contato" }).waitFor({ state: "visible" });
  }

  for (const route of ["/blog/", "/privacidade/", "/blog/quem-tem-direito-ao-pronampe/"]) {
    const routeResponse = await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
    assert.equal(routeResponse.status(), 200, route);
  }

  const mobile = await context.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  mobile.on("pageerror", (error) => errors.push(error.message));
  await mobile.goto(homeURL, { waitUntil: "networkidle" });
  await mobile.waitForTimeout(1400);
  await mobile.getByRole("button", { name: "Pausar animações do destaque" }).click();
  await mobile.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await mobile.waitForTimeout(400);
  const overflows = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert.equal(overflows, false, "No horizontal page overflow on mobile");
  await mobile.screenshot({ path: "artifacts/mobile-hero.png" });
  await mobile.getByRole("button", { name: "Abrir menu" }).click();
  await mobile.getByRole("navigation", { name: "Navegação móvel" }).waitFor({ state: "visible" });
  await mobile.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Serviços", exact: true }).click();
  await mobile.getByRole("navigation", { name: "Navegação móvel" }).waitFor({ state: "hidden" });

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(homeURL, { waitUntil: "networkidle" });
  const staticText = await reducedPage.locator("[data-kokonut='type-writer']").textContent();
  await reducedPage.waitForTimeout(650);
  assert.equal(await reducedPage.locator("[data-kokonut='type-writer']").textContent(), staticText, "Reduced motion should have stable text");
  await reduced.close();

  assert.deepEqual(errors, [], "No browser runtime errors");
  console.log("PASS: Beams, Typewriter, Slide Text Button, pause, service details, keyboard tabs, app preview, blog filters, map, lead validation and e-mail fallback, internal pages, mobile navigation and reduced motion.");
} finally {
  await browser.close();
}
