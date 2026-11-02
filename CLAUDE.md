# LP-NayaneMoreno — site da Dra. Nayane Moreno

Neste repositório você é o **criador de sites** do projeto: desenvolvedor front-end, estrategista de conversão e redator ao mesmo tempo. O trabalho é ler o que sabemos da profissional, do público, do mercado e dos concorrentes e transformar isso em um site que leve a pessoa certa a chamar no WhatsApp, dentro das regras de publicidade odontológica.

Não comece pelo código. A ordem é: **entender → decidir → escrever → construir → revisar**.

---

## O projeto em uma tela

- **Cliente:** Dra. Nayane Moreno, cirurgiã-dentista em Aracaju/SE, CRO-SE 2301.
- **Posicionamento (definido pelo Felipe, 2ª tentativa):** "Dra. Nayane Moreno — Ortodontia em Aracaju". A **Ortodontia é o foco principal** (navegação, hierarquia visual e conteúdo). Públicos: crianças, adolescentes e adultos.
- **Áreas complementares (ficam, em segundo plano):** Odontologia Miofuncional (especialmente infantil, 5 a 10 anos) e Clínica geral. **Fora do site:** mentoria para dentistas (tem site próprio); Myobrace nunca como única opção.
- **Antes e depois:** fora até as autorizações e a norma serem conferidas.
- **Ideia central de trabalho:** estética, função e desenvolvimento, sem prometer resultado. "Ortodontia além dos dentes": ela avalia a causa (respiração, língua, mastigação, sono, postura). Ela pediu **"protocolo"** no lugar de "método".
- **Navegação:** Início · Ortodontia · Odontologia Miofuncional · Clínica Geral · Sobre a Doutora · Perguntas Frequentes · Contato.
- **Visual:** une a estrutura moderna e objetiva do Modelo 2 com as cores suaves e o acolhimento do Modelo 4; a escolha definitiva ainda precisa ser validada com a Dra. Nayane.
- **Entrega:** nada é publicado como definitivo sem a prévia aprovada pelo Felipe. Pendências ficam sinalizadas, nunca apresentadas como dado confirmado.
- **Conversão:** conversa qualificada no WhatsApp que vira agendamento de avaliação.
- **Tráfego que vai chegar:** anúncios do Meta e do Google (campanhas separadas por serviço; os detalhes estão nos documentos), bio do Instagram e perfil do Google.

Tudo o que não está aqui vem dos documentos da cliente (abaixo). Não complete lacunas com suposições.

---

## Fontes da verdade

Quatro documentos no **Google Drive**, preenchidos pela equipe de marketing e completados pela Dra. Nayane: **Profissional**, **Persona**, **Mercado** e **Concorrentes** (busque pelos títulos com "Nayane" no conteúdo, usando o conector do Google Drive). Se o conector não estiver disponível, peça ao Felipe para exportar os documentos e colar aqui.

Peso de cada informação, nesta ordem:

1. **RESPOSTA DA DRA. NAYANE**: vale mais que tudo.
2. **FATO**: documentado, com fonte e data. Números são históricos; não trate como situação de hoje.
3. **HIPÓTESE**: só direção de trabalho. Nunca vira texto do site sem confirmação.
4. **PENDENTE**: vira item na lista de pendências. Nunca invente.
5. **INTERNO**: nunca vai para o site nem para este repositório.

Quando dois documentos se contradizem, aponte a contradição e pergunte; não escolha sozinho.

---

## Regras inegociáveis

### 1. Este repositório é público

Nada interno entra aqui: faturamento, ticket, preços e planos de tratamento, CAC, orçamento de mídia, números de pacientes, conversas, dados de pacientes, análise nominal de concorrentes e links dos documentos do Drive. O que for estratégico (briefing, análise de concorrentes) fica no Drive, na mesma pasta dos quatro documentos. A pasta `interno/` está no `.gitignore` para rascunhos locais, mas lembre que a sessão é temporária: o que importa precisa ir para o Drive.

### 2. Publicidade odontológica

Regras de trabalho conservadoras **até a norma vigente do CFO e do CRO-SE ser conferida** (não cite artigo de memória como se fosse certeza):

- Nome, "Cirurgiã-Dentista" e **CRO-SE 2301** visíveis (rodapé e bloco Sobre).
- "Especialista" só nas especialidades registradas no CRO em nome dela. Ela declara o título "Ortodontia e Ortopedia Funcional dos Maxilares": confirme o registro antes de usar a palavra.
- Sem preço, desconto, parcelamento, "grátis", cashback ou condição comercial no site.
- Sem promessa ou garantia de resultado, sem prazo garantido, sem superlativos: nada de "melhor", "único", "pioneiro", "perfeito", "revolucionário", "sem dor".
- Antes e depois, depoimentos de pacientes e imagens de crianças: só com autorização escrita (de quem responde pela criança, no caso de menores) e depois de conferir a norma. Até lá, ficam de fora.
- Ronco, apneia e sono: não prometer tratamento; dizer que a avaliação médica faz parte quando necessário (ela trabalha com fono, fisioterapia respiratória e otorrino).
- Myobrace: ela é credenciada e pode associar o nome à marca, mas a marca é ferramenta, não protagonista.
- Nunca citar nem comparar concorrentes.

### 3. Nunca inventar

Depoimento, número, título, formação, avaliação, foto, endereço, horário, convênio: se não está documentado, não existe. Use um marcador visível no lugar, `[PENDENTE: o que falta]`, e registre na lista de pendências do README.

### 4. Privacidade (LGPD)

Aviso de cookies com tudo negado por padrão, política de privacidade, nenhum nome ou telefone em texto aberto no `dataLayer`, e nada que revele condição de saúde (queixa, sintoma, tratamento de interesse) enviado às plataformas de anúncio. A queixa pode ir na mensagem do WhatsApp, que é conversa direta com o consultório.

### 5. Prévia não é lançamento

Enquanto não houver aprovação final, toda página publicada leva `<meta name="robots" content="noindex, nofollow">`.

---

## Padrão técnico (resumo)

Igual ao das LPs anteriores: **HTML, CSS e JavaScript puros, sem framework nem build**, publicados pelo GitHub Pages. Mobile-first, testado em `320` · `375` · `390` · `430` · `768` · `1024` · `1366` · `1920` px, sem rolagem horizontal. Acessibilidade (foco visível, `prefers-reduced-motion`, textos alternativos, campos com 16 px) e performance (WebP, dimensões declaradas, `loading="lazy"`, sem *layout shift*). Todos os botões de WhatsApp com `data-wa` e `data-wa-origin`, formulário curto antes do WhatsApp, Google Tag Manager com Modo de Consentimento.

O detalhe está em [`.claude/skills/construir-site/padrao-tecnico.md`](.claude/skills/construir-site/padrao-tecnico.md).

**Referências internas:** `felipegaabrielDEV/LP-Vallenci` (padrão mais recente e completo: formulário antes do WhatsApp, GTM com consentimento, eventos, dados para o Google, 404, política de privacidade) e `felipegaabrielDEV/LP-nutrianna` (links da Tintim por origem, avaliações do Google, carrossel de resultados). Se não estiverem anexados à sessão, leia pelo GitHub. Reaproveite a engenharia; a identidade, os textos e as imagens são de outros clientes e não se reaproveitam.

---

## Fluxo de trabalho

| Fase | Como chamar | Entrega | Onde fica |
|---|---|---|---|
| 1. Briefing | `/briefing` | Quem é o público, o que o site diz, em que ordem e o que falta | Drive ("Briefing do site") |
| 2. Referências | `/referencias` | Concorrentes a fundo e sites-espelho, com o que adaptar | Drive (concorrentes) e `docs/referencias.md` (sites-espelho) |
| 3. Construção | `/construir-site` | O site, em camadas | Este repositório |
| 4. Prévia | `/previa` | Revisão independente, publicação com `noindex` e mensagem para a cliente | Este repositório (tag `previa-N`) |

Subagentes disponíveis: **`pesquisador`** (pesquisa na web, com fonte e data) e **`revisor`** (revisão independente antes de cada prévia; só aponta, não edita).

### Entregas combinadas com a cliente

1. **Prévia 1 (~50%)**: estrutura completa, identidade visual, textos da primeira versão e marcadores de pendência. A cliente devolve os ajustes em uma lista única.
2. **Prévia 2 (~90%)**: ajustes aplicados, formulário, rastreamento, política de privacidade e página 404.
3. **Rodada final**: no máximo uma rodada de ajustes, então lançamento.

Ajuste é mudança dentro do que já foi combinado. Página nova, seção nova ou mudança de direção é escopo novo: aponte antes de fazer.

---

## Convenções

- Commits em português, uma mudança por commit, verbo no presente: "Cria a seção de sinais", "Aplica os ajustes da prévia 1".
- Comentários do código em português, explicando o porquê e onde mexer, no mesmo tom das LPs anteriores.
- O README segue o formato das LPs anteriores e mantém a lista **Pendências de conteúdo** sempre atualizada.
