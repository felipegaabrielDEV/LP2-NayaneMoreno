/* ==========================================================================
   Dra. Nayane Moreno — interações da página
   Menu, links do WhatsApp, FAQ, galeria do consultório, revelar ao rolar e o
   botão da prévia que esconde os marcadores de pendência.
   Formulário antes do WhatsApp, origem por UTM (Tintim), eventos e cookies
   entram na prévia 2.
   ========================================================================== */
(function () {
    "use strict";
    document.documentElement.classList.add("js");

    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- WhatsApp ----------
       O número vem da meta tag "whatsapp-number" no <head>. Enquanto estiver
       vazio, o link abre o WhatsApp só com a mensagem, sem destinatário.
       Para mudar o texto de um botão, mexa em "mensagens" pela origem. */
    const numero = (document.querySelector('meta[name="whatsapp-number"]')?.content || "").replace(/\D/g, "");
    const base = "Olá! Vim pelo site e quero agendar uma avaliação de ortodontia com a Dra. Nayane Moreno.";
    const mensagens = {
        aparelho_metalico: "Olá! Vim pelo site e tenho interesse no aparelho metálico. Quero agendar uma avaliação com a Dra. Nayane Moreno.",
        aparelho_porcelana: "Olá! Vim pelo site e tenho interesse no aparelho de porcelana. Quero agendar uma avaliação com a Dra. Nayane Moreno.",
        aparelho_alinhador: "Olá! Vim pelo site e tenho interesse no alinhador transparente. Quero agendar uma avaliação com a Dra. Nayane Moreno.",
        convenios: "Olá! Vim pelo site e quero confirmar se o meu plano cobre ortodontia com a Dra. Nayane Moreno.",
        particular: "Olá! Vim pelo site e quero saber sobre o tratamento ortodôntico particular com a Dra. Nayane Moreno.",
        faq: "Olá! Vim pelo site e tenho uma dúvida sobre ortodontia.",
        horario: "Olá! Vim pelo site e quero saber os horários disponíveis para uma avaliação de ortodontia com a Dra. Nayane Moreno."
    };
    const linkWhats = origem => {
        const texto = encodeURIComponent(mensagens[origem] || base);
        return numero ? `https://wa.me/${numero}?text=${texto}` : `https://wa.me/?text=${texto}`;
    };
    document.querySelectorAll("[data-wa]").forEach(el => {
        el.href = linkWhats(el.dataset.waOrigin);
        el.target = "_blank";
        el.rel = "noopener";
    });

    /* ---------- Menu ---------- */
    const topo = document.getElementById("topo");
    const botaoMenu = document.querySelector(".menu-botao");
    const menuMovel = document.getElementById("menu-movel");
    const abrirMenu = abrir => {
        botaoMenu.setAttribute("aria-expanded", String(abrir));
        botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
        menuMovel.hidden = !abrir;
        document.body.classList.toggle("menu-aberto", abrir);
    };
    botaoMenu.addEventListener("click", () => abrirMenu(menuMovel.hidden));
    menuMovel.addEventListener("click", e => { if (e.target.closest("a")) abrirMenu(false); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !menuMovel.hidden) { abrirMenu(false); botaoMenu.focus(); }
    });

    const aoRolar = () => topo.classList.toggle("rolou", window.scrollY > 10);
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();

    // Destaca no menu a seção que está na tela.
    const linksMenu = [...document.querySelectorAll(".menu a")];
    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver(entradas => {
            entradas.forEach(en => {
                if (!en.isIntersecting) return;
                linksMenu.forEach(a => a.classList.toggle("ativo", a.getAttribute("href") === "#" + en.target.id));
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        linksMenu.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) obs.observe(s); });
    }

    /* ---------- Perguntas frequentes ----------
       Todas começam fechadas e só uma fica aberta por vez: ao abrir uma pergunta, a que estava aberta fecha.
       Clicar de novo na pergunta aberta fecha ela. Para voltar a permitir várias abertas, apague o bloco
       "fecha as outras". */
    const botoesFaq = document.querySelectorAll(".faq-item button");
    const raiz = document.documentElement;
    let travaFaq = null;
    /* Fluidez no celular. Como só uma pergunta fica aberta, tocar numa pergunta ABAIXO da aberta faria o conteúdo subir
       durante a animação e a pergunta tocada "andar" sob o dedo (o Safari do iPhone não corrige isso sozinho).
       Solução: a pergunta aberta que está ACIMA fecha na hora (sem animar) e a rolagem é corrigida uma única vez, então a
       pergunta tocada fica parada e só ela anima. As que estão abaixo fecham animando, sem mexer em nada acima.
       Por ~0,5 s também pausa as animações contínuas (botões, riscos do título), que repintam sombra e brilho. */
    const marcaMexendo = ms => { raiz.classList.add("faq-mexendo"); clearTimeout(travaFaq); travaFaq = setTimeout(() => raiz.classList.remove("faq-mexendo"), ms); };
    botoesFaq.forEach(botao => {
        botao.addEventListener("click", () => {
            const item = botao.closest(".faq-item");
            const abrir = botao.getAttribute("aria-expanded") !== "true";
            const todos = [...botoesFaq];
            const pos = todos.indexOf(botao);
            if (!reduzMovimento) marcaMexendo(560);
            if (abrir) {
                const topoAntes = botao.getBoundingClientRect().top;
                const acima = [];
                todos.forEach((outro, i) => {
                    if (outro === botao || outro.getAttribute("aria-expanded") !== "true") return;
                    const it = outro.closest(".faq-item");
                    if (i < pos) { it.classList.add("fecha-seco"); acima.push(it); }
                    outro.setAttribute("aria-expanded", "false");
                    it.classList.remove("aberto");
                });
                botao.setAttribute("aria-expanded", "true");
                item.classList.add("aberto");
                if (acima.length) {
                    /* mede depois do fechamento instantâneo e devolve a pergunta tocada ao mesmo lugar da tela */
                    const dif = botao.getBoundingClientRect().top - topoAntes;
                    if (Math.abs(dif) > 0.5) window.scrollBy(0, dif);
                    requestAnimationFrame(() => requestAnimationFrame(() => acima.forEach(it => it.classList.remove("fecha-seco"))));
                }
            } else {
                botao.setAttribute("aria-expanded", "false");
                item.classList.remove("aberto");
            }
        });
    });

    /* ---------- Galeria do consultório ---------- */
    const trilho = document.querySelector(".galeria-trilho");
    if (trilho) {
        const fotos = [...trilho.children];
        const pontos = document.querySelector(".galeria-pontos");
        fotos.forEach(() => pontos.appendChild(document.createElement("span")));
        const atual = () => Math.round(trilho.scrollLeft / (fotos[0].offsetWidth + 12));
        const contador = document.querySelector(".galeria-contador");
        const marcar = () => {
            const i = Math.min(atual(), fotos.length - 1);
            [...pontos.children].forEach((p, k) => p.classList.toggle("ativo", k === i));
            if (contador) contador.textContent = `${i + 1} / ${fotos.length}`;
        };
        const ir = i => {
            const alvo = Math.max(0, Math.min(fotos.length - 1, i));
            trilho.scrollTo({ left: fotos[alvo].offsetLeft - trilho.offsetLeft, behavior: reduzMovimento ? "auto" : "smooth" });
        };
        document.querySelectorAll(".galeria-seta").forEach(b => b.addEventListener("click", () => {
            const prox = atual() + Number(b.dataset.dir);
            ir(prox >= fotos.length ? 0 : prox < 0 ? fotos.length - 1 : prox);
        }));
        trilho.addEventListener("scroll", () => requestAnimationFrame(marcar), { passive: true });
        trilho.addEventListener("keydown", e => {
            if (e.key === "ArrowRight") { e.preventDefault(); ir(atual() + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); ir(atual() - 1); }
        });
        marcar();
    }

    /* ---------- Revelar ao rolar ---------- */
    const revelar = document.querySelectorAll(".revelar");
    if (reduzMovimento || !("IntersectionObserver" in window)) {
        revelar.forEach(el => el.classList.add("visivel"));
    } else {
        const obs = new IntersectionObserver(entradas => {
            entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visivel"); obs.unobserve(en.target); } });
        }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
        revelar.forEach(el => obs.observe(el));
    }

    /* ---------- Prévia: mostrar/ocultar pendências ---------- */
    const alternar = document.querySelector(".previa-alternar:not(.previa-fotos)");
    if (alternar) {
        alternar.addEventListener("click", () => {
            const ocultar = document.body.classList.toggle("sem-pendencias");
            alternar.setAttribute("aria-pressed", String(!ocultar));
            alternar.querySelector("span").textContent = ocultar ? "mostrar pendências" : "ocultar pendências";
        });
    }

    /* ---------- Números do topo: contagem ----------
       Cada número vai de data-inicio (hoje 0) até data-contar, com o prefixo de data-prefixo (hoje "+").
       Roda quando o número aparece na tela, uma única vez (sem hover, igual ao da Nutri Anna). Durante a contagem
       o cartão ganha a classe .contando (sobe e cresce um pouco, como no site da Nutri Anna).
       Para mudar o ponto de partida, troque data-inicio no HTML. */
    const contadores = document.querySelectorAll("[data-contar]");
    const contar = el => {
        if (reduzMovimento || el.dataset.rodando) return;
        const fim = Number(el.dataset.contar);
        const inicio = Number(el.dataset.inicio ?? 0);
        const pre = el.dataset.prefixo ?? "";
        const duracao = 1400;
        const cartao = el.closest("aside, li");
        el.dataset.rodando = "1";
        el.textContent = pre + inicio;
        cartao?.classList.add("contando");
        setTimeout(() => {
            let t0 = null;
            const passo = t => {
                t0 ??= t;
                const p = Math.min((t - t0) / duracao, 1);
                const suave = 1 - Math.pow(1 - p, 3);
                el.textContent = pre + Math.round(inicio + (fim - inicio) * suave);
                if (p < 1) requestAnimationFrame(passo);
                else { el.textContent = pre + fim; delete el.dataset.rodando; setTimeout(() => cartao?.classList.remove("contando"), 250); }
            };
            requestAnimationFrame(passo);
        }, 450);
    };
    if ("IntersectionObserver" in window) {
        /* Antes de aparecer, o número fica em +0 (como na Nutri Anna); com movimento reduzido ele já mostra o valor final */
        if (!reduzMovimento) contadores.forEach(el => { el.textContent = (el.dataset.prefixo ?? "") + Number(el.dataset.inicio ?? 0); });
        const obsNum = new IntersectionObserver(entradas => {
            entradas.forEach(en => { if (en.isIntersecting) { contar(en.target); obsNum.unobserve(en.target); } });
        }, { threshold: .65 });
        contadores.forEach(el => obsNum.observe(el));
    }

    /* ---------- Passo a passo no celular: a etapa no meio da tela "acende" ----------
       Faz o papel do hover do desktop: conforme a pessoa rola, o cartão que passa pela faixa central da tela ganha a classe
       .em-foco (o visual está no CSS, só no celular). Com movimento reduzido o cartão não se mexe (só o brilho). */
    {
        const etapas = [...document.querySelectorAll("#como-funciona .passo")];
        if (etapas.length && "IntersectionObserver" in window) {
            const obsFoco = new IntersectionObserver(entradas => {
                entradas.forEach(en => en.target.classList.toggle("em-foco", en.isIntersecting));
            }, { rootMargin: "-49% 0px -49% 0px", threshold: 0 });
            etapas.forEach(e => obsFoco.observe(e));
        }
    }

    /* ---------- Evolução do tratamento no celular: abas ligadas ao carrossel de vistas ----------
       No celular os 3 cartões ficam lado a lado com deslize (CSS). As abas rolam até a vista escolhida
       e acompanham o deslize do dedo. No tablet/desktop as abas ficam escondidas e nada disso roda. */
    {
        const trilho = document.querySelector("#evolucao .casos");
        const abas = [...document.querySelectorAll("#evolucao .caso-aba")];
        const vistas = trilho ? [...trilho.querySelectorAll(".caso")] : [];
        if (trilho && abas.length === vistas.length && abas.length) {
            const mobile = window.matchMedia("(max-width: 599px)");
            const marcar = i => abas.forEach((a, n) => a.setAttribute("aria-pressed", n === i ? "true" : "false"));
            abas.forEach((aba, i) => aba.addEventListener("click", () => {
                const folga = parseFloat(getComputedStyle(trilho).paddingLeft) || 0;
                trilho.scrollTo({ left: vistas[i].offsetLeft - folga, behavior: reduzMovimento ? "auto" : "smooth" });
                marcar(i);
            }));
            let quadro = 0;
            trilho.addEventListener("scroll", () => {
                if (!mobile.matches || quadro) return;
                quadro = requestAnimationFrame(() => {
                    quadro = 0;
                    const folga = parseFloat(getComputedStyle(trilho).paddingLeft) || 0;
                    let melhor = 0, dist = Infinity;
                    vistas.forEach((v, i) => { const d = Math.abs(v.offsetLeft - folga - trilho.scrollLeft); if (d < dist) { dist = d; melhor = i; } });
                    marcar(melhor);
                });
            }, { passive: true });
        }
    }

    /* ---------- Fotos ampliadas em tela cheia ----------
       Três grupos de fotos abrem em um <dialog> nativo (foco preso, Esc fecha), com botões de fechar, anterior e próxima:
       - Evolução do tratamento, Atendimento e Consultório: em qualquer tela, para ver os detalhes das imagens.
       As setas e o deslize navegam só dentro do grupo da foto aberta. Para desligar um grupo, apague a linha dele. */
    const telaPequena = window.matchMedia("(max-width: 1023px)");
    const grupos = [
        { itens: [...document.querySelectorAll("#evolucao .caso-foto")], sempre: true,
          nome: f => (f.closest(".caso")?.querySelector("h3")?.textContent || "Foto do caso") + " · " + (f.querySelector("figcaption")?.textContent || "") },
        { itens: [...document.querySelectorAll("#atendimento .atend figure")], sempre: true,
          nome: (f, i) => "Atendimento · foto " + (i + 1) },
        { itens: [...document.querySelectorAll("#consultorio .galeria-trilho figure")], sempre: true,
          nome: (f, i) => "Consultório · foto " + (i + 1) }
    ].filter(g => g.itens.length);
    if (grupos.length && typeof HTMLDialogElement === "function") {
        const dlg = document.createElement("dialog");
        dlg.className = "foto-ampliada";
        dlg.setAttribute("aria-label", "Foto ampliada");
        dlg.innerHTML = '<button type="button" class="foto-fechar" aria-label="Fechar foto">&times;</button>' +
            '<button type="button" class="foto-seta foto-ant" aria-label="Foto anterior">&#8249;</button>' +
            '<figure><img alt=""><figcaption></figcaption></figure>' +
            '<button type="button" class="foto-seta foto-prox" aria-label="Próxima foto">&#8250;</button>';
        document.body.appendChild(dlg);
        const img = dlg.querySelector("img"), legenda = dlg.querySelector("figcaption");
        let grupo = grupos[0], atual = 0, origem = null;
        const mostrar = i => {
            const total = grupo.itens.length;
            atual = (i + total) % total;
            const f = grupo.itens[atual], foto = f.querySelector("img");
            const nome = grupo.nome(f, atual);
            img.src = foto.currentSrc || foto.src;
            img.alt = foto.alt + (grupo.sempre ? "" : " (" + nome + ")");
            legenda.textContent = nome + "  ·  " + (atual + 1) + " de " + total;
        };
        const abrir = (g, i) => { getSelection()?.removeAllRanges(); grupo = g; origem = g.itens[i]; mostrar(i); if (!dlg.open) dlg.showModal(); document.documentElement.classList.add("foto-aberta"); };
        const fechar = () => { if (dlg.open) dlg.close(); };
        dlg.addEventListener("close", () => { document.documentElement.classList.remove("foto-aberta"); origem?.focus({ preventScroll: true }); });
        dlg.querySelector(".foto-fechar").addEventListener("click", fechar);
        dlg.querySelector(".foto-ant").addEventListener("click", () => mostrar(atual - 1));
        dlg.querySelector(".foto-prox").addEventListener("click", () => mostrar(atual + 1));
        dlg.addEventListener("mousedown", e => { if (e.detail > 1) e.preventDefault(); }); /* clique duplo não seleciona a foto */
        dlg.addEventListener("dblclick", () => getSelection()?.removeAllRanges());
        dlg.addEventListener("click", e => { if (e.target === dlg || e.target.tagName === "FIGURE") fechar(); });
        dlg.addEventListener("keydown", e => {
            if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(atual - 1); }
            if (e.key === "ArrowRight") { e.preventDefault(); mostrar(atual + 1); }
        });
        /* Gestos: deslizar para os lados troca de foto */
        let x0 = null;
        dlg.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
        dlg.addEventListener("touchend", e => {
            if (x0 === null) return;
            const dx = e.changedTouches[0].clientX - x0; x0 = null;
            if (Math.abs(dx) > 60) mostrar(atual + (dx < 0 ? 1 : -1));
        }, { passive: true });
        /* As fotos viram botões só quando o grupo está ativo na tela atual */
        const ativo = g => g.sempre || telaPequena.matches;
        const preparar = () => grupos.forEach(g => g.itens.forEach((f, i) => {
            if (ativo(g)) {
                f.setAttribute("tabindex", "0"); f.setAttribute("role", "button");
                f.setAttribute("aria-label", "Ampliar foto: " + g.nome(f, i));
            } else {
                f.removeAttribute("tabindex"); f.removeAttribute("role"); f.removeAttribute("aria-label");
            }
        }));
        grupos.forEach(g => g.itens.forEach((f, i) => {
            f.addEventListener("click", () => { if (ativo(g)) abrir(g, i); });
            f.addEventListener("keydown", e => { if (ativo(g) && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); abrir(g, i); } });
        }));
        telaPequena.addEventListener("change", () => { preparar(); if (dlg.open && !ativo(grupo)) dlg.close(); });
        preparar();
    }

    const ano = document.querySelector("[data-ano]");
    if (ano) ano.textContent = new Date().getFullYear();
})();
