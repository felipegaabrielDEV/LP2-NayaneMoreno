# 🦷 Dra. Nayane Moreno — Landing Page | Ortodontia em Aracaju

> 🚧 **Prévia 1.** Estrutura, identidade visual e textos da primeira versão. Os pontos que dependem da cliente aparecem na página como marcadores amarelos **PENDENTE** (o botão "Prévia" no canto inferior esquerdo esconde ou mostra os marcadores). A página está com `noindex, nofollow` até a aprovação final.

Landing page da **Dra. Nayane Moreno**, Cirurgiã-Dentista (CRO-SE 2301) em Aracaju/SE, focada em **Ortodontia**: captar pessoas interessadas em colocar aparelho e levá-las a agendar a avaliação pelo WhatsApp.

---

## 📋 Sobre o projeto

- **Posicionamento:** "Dra. Nayane Moreno — Ortodontia em Aracaju".
- **Tratamentos:** aparelho metálico e aparelho de porcelana. **Alinhador: a Dra. informou em 12/11/2026 que não trabalha com alinhadores** (removido do site).
- **Formas de atendimento:** convênio (SulAmérica e Amil) e particular.
- **Conversão:** todos os botões levam ao WhatsApp, com mensagem pronta por origem.
- **Referências internas:** a estrutura e a engenharia seguem as LPs da Nutri Anna Waleska e da VALLENCI Salas; identidade, textos e imagens são próprios.

---

## ✨ Seções

| Seção | Destaques |
|---|---|
| **Menu** | Fixo, com nome e CRO sempre visíveis; menu de tela cheia no celular (fecha com `Esc` ou ao tocar num link) |
| **Topo** | Título, foto em moldura de arco, cartão com CRO, três números de destaque e faixa com quatro diferenciais |
| **Para quem é** | Seis situações em cartões com foto no topo (referência: site de salas da Vallenci), título e frase. Fotos ilustrativas geradas por IA, com pessoas diferentes em cada cartão (gênero, idade e tom de pele variados, aparência brasileira), em `assets/situacoes/` (WebP 900x822 e 520x475), com a nota "Imagens ilustrativas" |
| **Aparelhos** | Dois cartões (metálico e porcelana) com foto no topo (`assets/aparelhos/`, WebP 900x640 e 520x365, ilustrativas, geradas por IA), características e botão próprio |
| **Convênios e particular** | Lado a lado: planos atendidos e atendimento particular |
| **Como funciona** | Cinco etapas, do WhatsApp ao acompanhamento, e citação da Dra. Nayane |
| **Sobre** | Formação, trajetória e história pessoal ligada à ortodontia, com cartões de credenciais |
| **Atendimento** | Três quadros para fotos da Dra. atendendo (grade no computador, carrossel no celular). Hoje com marcadores de pendência e escondida no modo "ocultar pendências" |
| **Consultório** | Galeria com as fotos do consultório (setas, deslize e teclado), horário e endereço |
| **Avaliações do Google** | Bloco reservado; só vai ao ar depois da liberação |
| **Perguntas frequentes** | Oito perguntas em acordeão acessível |
| **Chamada final e rodapé** | Contato, localização, horário e identificação profissional |

---

## 🎨 Identidade visual

Segue o **Manual de Identidade Visual** da marca (nov/2026). As cores foram conferidas nos pixels da logomarca enviada.

| Cor | Hex | Uso |
|---|---|---|
| Verde da marca | `#16AD8E` | Logo, destaques, ícones e detalhes |
| Cinza da marca | `#8C8C8C` | "MORENO", fio do aparelho e textos de apoio |
| Verde dos botões | `#0F7A64` | Botões (contraste AA com texto branco) |
| Verde escuro | `#0F3F36` | Faixa do topo, seção "Como funciona" e chamada final |
| Verde claro | `#E8F6F1` | Fundos de detalhe |
| Fundo suave | `#F7F9F8` | Seções alternadas com o branco |
| Texto | `#303B39` | Títulos e textos |

Tipografia: **Montserrat** em todo o site, com o contraste de pesos da logo (forte em "NAYANE", leve em "MORENO"): títulos em 600 e o trecho em destaque em 300, no verde da marca.

Detalhe próprio do site: o **fio do aparelho com o bráquete verde**, tirado da logo, passa sobre a foto do topo. Logomarca em `assets/marca/` (ícone, versão completa e favicon, com fundo transparente).

---|---|---|
| Verde-profundo | `#0F3D3A` | Títulos, faixas e fundos escuros |
| Menta | `#E6F2EF` | Fundos claros |
| Creme | `#FBF8F4` | Fundo da página |
| Areia | `#F4ECE4` | Fundo da seção Sobre |
| Rosa | `#EED5CE` | Detalhes e acentos |
| Rosa-escuro | `#A9473E` | Botões de agendamento |

Tipografia (Google Fonts): **Fraunces** nos títulos e **Plus Jakarta Sans** nos textos. Visual: estrutura moderna e objetiva do Modelo 2 com as cores suaves do Modelo 4 (a validar com a cliente).

---

## 🛠️ Tecnologias e estrutura

HTML, CSS e JavaScript puros, sem framework nem build, prontos para o GitHub Pages.

```
├── index.html          # Estrutura e conteúdo de todas as seções
├── styles.css          # Identidade, layout responsivo e animações (tokens no :root)
├── script.js           # Menu, WhatsApp, FAQ, galeria, revelar ao rolar e botão da prévia
└── assets/
    ├── marca/          # Logomarca (ícone, completa e favicon)
    ├── profissional/   # Fotos da Dra. Nayane (WebP)
    └── consultorio/    # Fotos do consultório (WebP)
```

**Onde mexer:**
- Número do WhatsApp: `<meta name="whatsapp-number">` no `<head>` (só dígitos, com 55 e DDD).
- Mensagem de cada botão: objeto `mensagens` em `script.js`, pela origem (`data-wa-origin`).
- Cores e fontes: tokens no início de `styles.css`.

---

## 📱 Responsividade, acessibilidade e performance

- Testado em `320` · `375` · `390` · `430` · `768` · `1024` · `1366` · `1920` px, sem rolagem horizontal.
- Foco visível, link "Pular para o conteúdo", FAQ com `aria-expanded`, áreas de toque de 44 px ou mais.
- Animações desligadas com `prefers-reduced-motion`.
- Imagens em WebP com dimensões declaradas e `loading="lazy"` fora do topo; foto do topo com `preload`.

---

## 🚀 Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 🗺️ Próximas etapas (prévia 2)

- Formulário curto antes do WhatsApp.
- Links da Tintim por origem (UTM), Google Tag Manager com Modo de Consentimento e aviso de cookies.
- Política de privacidade, página 404, imagem de compartilhamento 1200 × 630 e dados para o Google (`Dentist`).
- Mapa do Google no bloco do consultório.

---

## ✅ Pendências de conteúdo

Conferência feita em 13/11/2026 contra os quatro documentos da cliente no Drive (Profissional, Persona, Mercado e Concorrentes), já respondidos pela Dra. Nayane. Cada item resolvido traz o documento e a pergunta de origem.

**Resolvidas pelas respostas da Dra.**
- [x] Tipos de aparelho (metálico e porcelana; sem alinhador), manutenções mensais, duração média de um ano e meio e fim do tratamento (Mercado, P02, P09 e P11)
- [x] Citação, endereço, horário, equipe, formação e números do topo (Profissional P01, P02, P13; Mercado P27)
- [x] Convênios: 4 logos mantidas por decisão da Dra., que tem parceria com as empresas (Petrobras e Porto Seguro são só de clínica geral, Mercado P19; o texto pede para confirmar a cobertura no WhatsApp)
- [x] **Autorizações de imagem** (fotos de atendimento, caso clínico e vídeo da mãe): a Dra. informou em nov/2026 que estão todas feitas; os documentos ficam com a clínica, fora deste repositório
- [x] **Antes e depois e depoimentos:** a Dra. respondeu que pode publicar; só preço é proibido (Mercado, P30)
- [x] Texto "Quem cuida do seu sorriso" e fotos ilustrativas dos aparelhos e de "Para quem é": aprovados pela Dra.
- [x] Faixa do topo com 6 cartões, aprovada em 12/11/2026; Evolução e Depoimento agora aparecem também no modo "ocultar pendências"

**Ainda abertas**
- [ ] **Avaliações do Google** (bloco continua oculto): link do perfil e liberação do uso das avaliações (norma do CFO)
- [ ] Idade mínima da ortodontia: o site diz 11 anos (Profissional, P10), mas o Persona diz "acima de 12" (P02). Confirmar com a Dra.
- [ ] Foto do diploma e dos certificados (a Dra. perguntou o que é preciso e ainda não enviou)
- [ ] Autorização escrita das operadoras para as logos, se a Dra. tiver
- [ ] Conferir a norma do CRO-SE por escrito, se o Felipe preferir não depender só da resposta da Dra.
- [ ] Copy do topo: "sorriso dos sonhos, sem passar anos usando aparelho?" (risco de ser lido como promessa)
- [ ] Domínio e acesso ao Google Tag Manager

**Fora do site, por decisão registrada**
- Alinhador transparente: a Dra. não trabalha com ele (Mercado, P09)
- Mentoria: tem site próprio e não entra (Profissional, P25; Persona, P26)
- Preços, bônus de aparelho e condições de pagamento: informação interna, não vai ao site (Mercado, P15 e P30; Persona, P15 e P18)
- Estacionamento: a reclamação mais comum dos pacientes é não ter onde estacionar (Persona, P24), então o site não promete vaga

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem à **Dra. Nayane Moreno** e não devem ser reutilizados sem autorização.
