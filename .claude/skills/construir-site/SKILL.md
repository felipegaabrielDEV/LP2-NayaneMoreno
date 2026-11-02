---
name: construir-site
description: Constrói o site da Dra. Nayane em camadas (identidade, textos, estrutura, interações, formulário, rastreamento e publicação), no padrão técnico das LPs anteriores. Use quando o briefing estiver pronto, ou para continuar a construção entre uma prévia e outra.
---

# Construir o site

Leia antes: o `CLAUDE.md`, o briefing no Drive ("Briefing do site — Dra. Nayane Moreno"), `docs/referencias.md` e o [`padrao-tecnico.md`](padrao-tecnico.md) desta pasta.

## 0. Antes de escrever código

Confira e liste o que falta, sem travar o que já dá para fazer:

- briefing com públicos, mensagem central e arquitetura decididos;
- marca: logotipo em boa resolução, cores e fontes (se não houver manual, derive do logotipo e proponha);
- fotos reais: profissional, consultório, espaço infantil, equipe;
- dados: WhatsApp, endereço completo, horários, convênios ativos, Instagram, domínio;
- o que pode ser publicado (regras do `CLAUDE.md`).

O que faltar vira `[PENDENTE: …]` no lugar certo e entra na lista do README.

## 1. Identidade

Defina os tokens em `:root` (cores com contraste AA para texto, tipografia, raio, sombras, espaçamento) e os componentes base: botão de WhatsApp, botão secundário, cartão, FAQ, carrossel. A identidade é da Dra. Nayane: acolhedora para pais e crianças, séria para adultos. Não reaproveite paleta nem fontes de outros clientes.

## 2. Textos primeiro

Escreva o texto de cada seção a partir do briefing antes de desenhar. Para o topo da página, proponha três títulos com abordagens diferentes (sinal, causa, resultado de rotina) e recomende um. Regras:

- frases curtas, palavras do público, um termo técnico só quando explicado;
- cada seção responde a uma pergunta que o visitante faria naquele momento;
- toda afirmação sobre ela é verificável; nada de superlativo nem promessa;
- chamada para ação com verbo e benefício ("Agendar a avaliação pelo WhatsApp"), repetida nos pontos de decisão.

## 3. Prévia 1 (~50%)

Página inicial completa e navegável no celular, com a identidade aplicada e os textos da primeira versão:

menu · topo · sinais e situações que o visitante reconhece · como ela avalia (protocolo) · serviços (Miofuncional, Ortodontia, Clínica geral) · sobre a Dra. Nayane · como é a primeira consulta · convênios (se liberados) · perguntas frequentes · chamada final · rodapé com CRO.

A ordem final das seções vem do briefing. Botões de WhatsApp já funcionando com `data-wa`; ainda sem formulário e sem rastreamento. `noindex` obrigatório.

## 4. Prévia 2 (~90%)

Ajustes da prévia 1 e o restante do padrão técnico: formulário antes do WhatsApp, eventos, GTM com consentimento, aviso de cookies, política de privacidade, página 404, dados para o Google (`Dentist`), imagem de compartilhamento 1200 × 630, `sitemap.xml`, README completo. Páginas por serviço, se estiverem no escopo combinado, reaproveitam os mesmos componentes.

## 5. Lançamento

Depois da aprovação final: remover o `noindex`, conferir `canonical`, `og:url` e dados para o Google com o domínio definitivo, configurar o domínio no GitHub Pages, validar os eventos no modo de visualização do GTM com o gestor de tráfego e atualizar o README.

## A cada bloco pronto

1. Sirva localmente (`python3 -m http.server 8000`) e veja de verdade: capture a página com Playwright nas larguras do padrão e confira se não há rolagem horizontal, texto cortado ou sobreposição.
2. Confira teclado, foco visível e `prefers-reduced-motion`.
3. Rode a busca de termos proibidos (lista no `padrao-tecnico.md`).
4. Faça o commit com uma mensagem clara.
