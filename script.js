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

    /* ---------- Animações só onde a pessoa está vendo ----------
       O site tem dezenas de animações infinitas (brilho dos botões, ícones, fio, bráquete). Mesmo fora da tela elas obrigam o
       navegador a recalcular estilos a cada quadro, o que "tremia" a abertura das perguntas no celular. Aqui cada seção
       que sai da tela ganha a classe .parada (o CSS pausa as animações dela); ao voltar para a tela, a classe sai. */
    if ("IntersectionObserver" in window && !reduzMovimento) {
        const obsParada = new IntersectionObserver(entradas => {
            entradas.forEach(en => en.target.classList.toggle("parada", !en.isIntersecting));
        }, { rootMargin: "120px 0px 120px 0px" });
        document.querySelectorAll("main > section, .rodape").forEach(el => obsParada.observe(el));
    }

    /* ---------- Perguntas frequentes ----------
       Todas começam fechadas e só uma fica aberta por vez: ao abrir uma pergunta, a que estava aberta fecha.
       Clicar de novo na pergunta aberta fecha ela. Para voltar a permitir várias abertas, apague o bloco
       "fecha as outras". */
    const botoesFaq = document.querySelectorAll(".faq-item button");
    const raiz = document.documentElement;
    let travaFaq = null;
    /* Fluidez no celular (técnica FLIP): a pergunta abre/fecha NA HORA no layout e, para parecer animado, as perguntas que
       mudaram de lugar deslizam do lugar antigo para o novo só com `transform` (a placa de vídeo faz isso sem repintar nada),
       e a resposta aparece com um fade. Antes animávamos a altura do cartão, o que repintava tudo abaixo a cada quadro e
       "tremia" no iPhone. Como só uma pergunta fica aberta, a que estava aberta fecha junto, e a rolagem é corrigida uma
       vez para a pergunta tocada ficar parada sob o dedo (o Safari do iPhone não faz isso sozinho).
       Por ~0,5 s também pausa as animações contínuas do site (classe .faq-mexendo). */
    const itensFaq = [...document.querySelectorAll("#duvidas .faq-item")];
    const marcaMexendo = ms => { raiz.classList.add("faq-mexendo"); clearTimeout(travaFaq); travaFaq = setTimeout(() => raiz.classList.remove("faq-mexendo"), ms); };
    const suave = "cubic-bezier(.22, .61, .36, 1)";
    botoesFaq.forEach(botao => {
        botao.addEventListener("click", () => {
            const item = botao.closest(".faq-item");
            const abrir = botao.getAttribute("aria-expanded") !== "true";
            if (!reduzMovimento) marcaMexendo(560);
            const topoAntes = botao.getBoundingClientRect().top;
            const antes = itensFaq.map(it => it.getBoundingClientRect().top);
            if (abrir) {
                botoesFaq.forEach(outro => {
                    if (outro === botao || outro.getAttribute("aria-expanded") !== "true") return;
                    outro.setAttribute("aria-expanded", "false");
                    outro.closest(".faq-item").classList.remove("aberto");
                });
            }
            botao.setAttribute("aria-expanded", abrir ? "true" : "false");
            item.classList.toggle("aberto", abrir);
            /* mantém a pergunta tocada no mesmo lugar da tela (as de cima podem ter fechado e mudado a altura da página) */
            const dif = botao.getBoundingClientRect().top - topoAntes;
            if (Math.abs(dif) > 0.5) window.scrollBy(0, dif);
            if (reduzMovimento || !item.animate) return;
            itensFaq.forEach((it, i) => {
                const d = antes[i] - it.getBoundingClientRect().top;
                if (Math.abs(d) > 0.5) it.animate([{ transform: "translateY(" + d + "px)" }, { transform: "translateY(0)" }], { duration: 340, easing: suave });
            });
            if (abrir) {
                const resp = item.querySelector(".faq-resposta > div > p");
                if (resp) resp.animate([{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300, delay: 60, easing: suave, fill: "backwards" });
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
