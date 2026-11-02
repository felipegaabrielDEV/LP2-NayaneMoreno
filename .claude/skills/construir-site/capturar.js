/* --------------------------------------------------------------------------
   Captura a página em todas as larguras do padrão e aponta rolagem horizontal
   e erros do console. Uso, com o site servido localmente:

     NODE_PATH=$(npm root -g) node .claude/skills/construir-site/capturar.js \
       http://localhost:8000/ <pasta-de-saida>

   Salve as capturas fora do repositório (na pasta temporária da sessão).
   Erros de rede de GTM, fontes ou widgets externos são esperados quando a
   sessão não tem acesso a esses endereços; os demais precisam ser corrigidos.
   -------------------------------------------------------------------------- */
const { chromium } = require("playwright");

const [url = "http://localhost:8000/", out = "capturas"] = process.argv.slice(2);
const larguras = [320, 375, 390, 430, 768, 1024, 1366, 1920];

(async () => {
    const browser = await chromium.launch();
    for (const width of larguras) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        const erros = [];
        page.on("pageerror", e => erros.push(e.message));
        page.on("console", m => m.type() === "error" && erros.push(m.text()));
        await page.goto(url, { waitUntil: "networkidle" });
        const sobra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        await page.screenshot({ path: `${out}/${width}.png`, fullPage: true });
        console.log(`${width}px: ${sobra > 0 ? `ROLAGEM HORIZONTAL de ${sobra}px` : "ok"}${erros.length ? ` · erros: ${erros.join(" | ")}` : ""}`);
        await page.close();
    }
    await browser.close();
})();
