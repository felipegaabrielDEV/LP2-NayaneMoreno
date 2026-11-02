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
        faq: "Olá! Vim pelo site e tenho uma dúvida sobre ortodontia."
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

    /* ---------- Perguntas frequentes ---------- */
    document.querySelectorAll(".faq-item button").forEach(botao => {
        botao.addEventListener("click", () => {
            const item = botao.closest(".faq-item");
            const abrir = botao.getAttribute("aria-expanded") !== "true";
            botao.setAttribute("aria-expanded", String(abrir));
            item.classList.toggle("aberto", abrir);
        });
    });

    /* ---------- Galeria do consultório ---------- */
    const trilho = document.querySelector(".galeria-trilho");
    if (trilho) {
        const fotos = [...trilho.children];
        const pontos = document.querySelector(".galeria-pontos");
        fotos.forEach(() => pontos.appendChild(document.createElement("span")));
        const atual = () => Math.round(trilho.scrollLeft / (fotos[0].offsetWidth + 12));
        const marcar = () => [...pontos.children].forEach((p, i) => p.classList.toggle("ativo", i === Math.min(atual(), fotos.length - 1)));
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
    const alternar = document.querySelector(".previa-alternar");
    if (alternar) {
        alternar.addEventListener("click", () => {
            const ocultar = document.body.classList.toggle("sem-pendencias");
            alternar.setAttribute("aria-pressed", String(!ocultar));
            alternar.querySelector("span").textContent = ocultar ? "mostrar pendências" : "ocultar pendências";
        });
    }

    /* ---------- Números do topo: contagem regressiva ----------
       Cada número começa em data-inicio e desce até data-contar. Roda quando
       o número aparece na tela e de novo ao passar o mouse (só com mouse).
       Para contar de 0 para cima, troque data-inicio por "0" no HTML. */
    const contadores = document.querySelectorAll("[data-contar]");
    const contar = el => {
        if (reduzMovimento || el.dataset.rodando) return;
        const fim = Number(el.dataset.contar);
        const inicio = Number(el.dataset.inicio ?? 0);
        const duracao = 1100;
        let t0 = null;
        el.dataset.rodando = "1";
        const passo = t => {
            t0 ??= t;
            const p = Math.min((t - t0) / duracao, 1);
            const suave = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(inicio + (fim - inicio) * suave);
            if (p < 1) requestAnimationFrame(passo);
            else { el.textContent = fim; delete el.dataset.rodando; }
        };
        requestAnimationFrame(passo);
    };
    if ("IntersectionObserver" in window) {
        const obsNum = new IntersectionObserver(entradas => {
            entradas.forEach(en => { if (en.isIntersecting) { contar(en.target); obsNum.unobserve(en.target); } });
        }, { threshold: .6 });
        contadores.forEach(el => obsNum.observe(el));
    }
    if (window.matchMedia("(hover: hover)").matches) {
        contadores.forEach(el => el.closest("li").addEventListener("mouseenter", () => contar(el)));
    }

    const ano = document.querySelector("[data-ano]");
    if (ano) ano.textContent = new Date().getFullYear();
})();
